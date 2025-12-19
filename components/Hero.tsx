import React, { useEffect, useState } from 'react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
  onServicesClick: () => void;
  onConsultationClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ data, onServicesClick, onConsultationClick }) => {
  const [particles, setParticles] = useState<Array<{ iconUrl: string, left: string, duration: string, delay: string, size: string, opacity: number }>>([]);

  useEffect(() => {
    // MERN Stack Icons
    const techStack = [
      { slug: "react" },
      { slug: "mongodb" },
      { slug: "nodedotjs" },
      { slug: "express" },
      { slug: "javascript" },
      { slug: "typescript" },
      { slug: "tailwindcss" },
      { slug: "nextdotjs" },
      { slug: "redux" },
      { slug: "git" },
      { slug: "firebase" },
      { slug: "docker" },
      { slug: "graphql" }
    ];

    const newParticles = Array.from({ length: 18 }).map((_, i) => {
      const tech = techStack[i % techStack.length];
      const isLeft = Math.random() > 0.5;
      const position = isLeft ? Math.random() * 25 : 75 + (Math.random() * 25);

      return {
        iconUrl: `https://cdn.simpleicons.org/${tech.slug}`,
        left: `${position}%`, 
        duration: `${15 + Math.random() * 25}s`,
        delay: `-${Math.random() * 20}s`,
        size: `${25 + Math.random() * 15}px`,
        opacity: 0.9
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${data.heroBackgroundImage || 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2069&auto=format&fit=crop'})` }}
      ></div>

      {/* Animation Container */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80 z-0"></div>
        {particles.map((p, i) => (
          <img 
            key={i}
            src={p.iconUrl}
            alt="tech"
            className="mern-particle absolute z-10"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
              filter: `drop-shadow(0 0 5px rgba(0,0,0,0.5))`
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="container mx-auto px-6 relative z-20 text-center pt-20">
          <div className="inline-block mb-8 reveal delay-100">
            <span className="text-xs font-mono text-white border border-white/50 px-6 py-2 tracking-[0.3em] uppercase rounded-full bg-black/60 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              {data.role}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-8 text-white reveal delay-200 drop-shadow-2xl">
            {data.name}
          </h1>
          
          <p className="text-lg md:text-xl text-white font-light max-w-2xl mx-auto mb-16 leading-relaxed reveal delay-300 font-mono p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
            {data.intro}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 reveal delay-300">
            {/* Rule Update: Direct scroll to Services section */}
            <button 
              onClick={onServicesClick}
              className="w-full md:w-auto bg-black/50 backdrop-blur-sm text-white border border-white px-16 py-5 font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm"
            >
              Services
            </button>

            <button 
              onClick={onConsultationClick}
              className="w-full md:w-auto bg-white text-black border border-white px-16 py-5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-300 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm"
            >
              Let's Talk
            </button>
          </div>
      </div>
    </section>
  );
};

export default Hero;