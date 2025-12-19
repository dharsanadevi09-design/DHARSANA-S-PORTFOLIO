import 'dotenv/config'; 
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_FILE = join(__dirname, '..', 'db.json'); 

// NODEMAILER SETUP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

// Helper: Secure Database Read
const readDB = () => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            const initial = { portfolioData: {}, messages: [], bookings: [] };
            fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
            return initial;
        }
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        const json = JSON.parse(data);
        // Ensure arrays exist so it doesn't crash during .push()
        if (!json.messages) json.messages = [];
        if (!json.bookings) json.bookings = [];
        return json;
    } catch (e) {
        console.error("DB Read Error:", e);
        return { portfolioData: {}, messages: [], bookings: [] };
    }
};

const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error("DB Write Error:", e);
    }
};

app.use(cors()); 
app.use(express.json({ limit: '50mb' })); 

// 1. Portfolio Data
app.get('/api/portfolio', (req, res) => {
    const db = readDB();
    res.json(db.portfolioData);
});

app.post('/api/portfolio', (req, res) => {
    try {
        const db = readDB();
        db.portfolioData = req.body;
        writeDB(db);
        res.status(200).json({ message: 'Success' });
    } catch (err) {
        res.status(500).json({ error: "Failed to save portfolio data" });
    }
});

// 2. Contact Endpoint (FIXED)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const db = readDB();
        
        // Save to DB first
        const msgEntry = { id: Date.now(), name, email, message, date: new Date().toLocaleString() };
        db.messages.push(msgEntry);
        writeDB(db);

        // Send Email
        const emailBody = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #333;">New Portfolio Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p style="background: #f4f4f4; padding: 15px;">${message}</p>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: process.env.RECIPIENT_EMAIL || process.env.ADMIN_EMAIL,
            subject: `Contact Form: ${name}`,
            html: emailBody
        });

        res.status(200).json({ message: 'Stored and Email Sent' });
    } catch (error) {
        console.error("Contact API Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// 3. Booking Endpoint (FIXED)
app.post('/api/booking', async (req, res) => {
    try {
        const { type, title, name, email, date, price } = req.body;
        const db = readDB();
        
        const bookingEntry = { id: Date.now(), type, title, name, email, date, price, createdAt: new Date().toLocaleString() };
        db.bookings.push(bookingEntry);
        writeDB(db);

        const emailBody = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #000;">New Booking Alert</h2>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Service:</strong> ${title}</p>
                <p><strong>Client:</strong> ${name} (${email})</p>
                <p><strong>Date:</strong> ${date}</p>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: process.env.RECIPIENT_EMAIL || process.env.ADMIN_EMAIL,
            subject: `New ${type} Booking: ${title}`,
            html: emailBody
        });

        res.status(200).json({ message: 'Booking Logged and Email Sent' });
    } catch (error) {
        console.error("Booking API Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));