import React, { useEffect, useState } from 'react';
import { PortfolioData } from './types';

// Standardized Lowercase Folder Path - Essential for Vercel (Linux)
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Consultation from './components/Consultation';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

type ViewState = 'portfolio' | 'login' | 'admin' | 'talk';

// Detect API Base URL: Local vs Production
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/api' 
  : '/api';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>('portfolio');

  // Load Content from Database
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio`);
        if (!response.ok) throw new Error("Database server not responding");
        const content = await response.json();
        setData(content);
      } catch (err) {
        console.error("Load Error:", err);
        setError("System Offline: Database connection failed.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Animation Observer for Scroll Effects
  useEffect(() => {
    if (!loading && view === 'portfolio') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      }, { threshold: 0.1 });

      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [loading, view]);

  // Update Data via CMS
  const handleUpdateData = async (newData: PortfolioData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        setData(newData);
        alert("Portfolio data synchronized successfully!");
      }
    } catch (err) {
      alert("Error: Changes could not be saved.");
    }
  };

  const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return (
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center font-mono">
        <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="tracking-[0.4em] uppercase text-[10px] animate-pulse">Establishing Connection...</p>
    </div>
  );

  if (error || !data) return (
    <div className="bg-black text-white h-screen flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-2xl font-black mb-4 uppercase tracking-tighter border-b border-white pb-2">Database Error</h1>
        <p className="text-neutral-500 mb-8 text-xs font-mono max-w-sm">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-white text-black px-10 py-3 rounded-full font-bold uppercase text-[10px] hover:bg-neutral-200 transition-colors">Re-Initialize</button>
    </div>
  );

  // Layout Routing
  if (view === 'admin') return <AdminPanel data={data} onSave={handleUpdateData} onLogout={() => setView('portfolio')} />;
  if (view === 'talk') return <div className="bg-neutral-950"><Consultation data={data} onBack={() => setView('portfolio')} /></div>;

  return (
    <div className="bg-black text-slate-300 min-h-screen relative overflow-x-hidden selection:bg-white/20 selection:text-white">
      {view === 'login' && <Login onLogin={(success) => success && setView('admin')} onCancel={() => setView('portfolio')} />}
      
      <Navigation logoUrl={data.headerLogo} onNavigate={(v, s) => {
          setView(v);
          if (s) setTimeout(() => scrollToSection(s), 100);
      }} />

      <main>
        <Hero data={data} onServicesClick={() => scrollToSection('services')} onConsultationClick={() => setView('talk')} />
        <About data={data} />
        <Services data={data} />
        <Skills data={data} />
        <Experience data={data} />
        <Contact data={data} />
      </main>

      <Footer data={data} onOpenAdmin={() => setView('login')} onNavigate={(v, s) => {
          if (s) scrollToSection(s);
      }} />
    </div>
  );
};

export default App;