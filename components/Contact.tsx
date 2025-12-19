import React, { useState } from 'react';
import { PortfolioData } from '../types';

interface ContactProps {
  data: PortfolioData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      alert("System Error. Try again.");
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-20 text-center text-white reveal">Contact</h2>
        <div className="bg-white/5 backdrop-blur-md p-8 md:p-16 border border-white/10 rounded-3xl reveal">
            <p className="text-xl mb-12 font-mono text-neutral-400 text-center uppercase tracking-widest">
                Reach out to: <span className="text-white font-bold block mt-2">{data.contactEmail}</span>
            </p>
            <form className="space-y-8" onSubmit={handleSubmit}>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 text-white rounded-xl focus:border-white outline-none" placeholder="YOUR NAME" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 text-white rounded-xl focus:border-white outline-none" placeholder="YOUR EMAIL" />
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/50 border border-white/10 p-4 text-white rounded-xl focus:border-white outline-none" placeholder="MESSAGE"></textarea>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-white text-black font-bold uppercase py-5 hover:bg-neutral-300 transition-all rounded-full">
                    {status === 'sending' ? 'PROCESSING...' : status === 'success' ? 'SENT SUCCESSFULLY ✅' : 'SEND MESSAGE'}
                </button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;