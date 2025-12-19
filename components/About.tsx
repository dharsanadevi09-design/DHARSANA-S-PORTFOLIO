
import React from 'react';
import { PortfolioData } from '../types';

interface AboutProps {
  data: PortfolioData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const handleResumeClick = () => {
    if (data.resumeLink && data.resumeLink !== '#') {
      window.open(data.resumeLink, '_blank');
    } else {
      alert("Resume link has not been set in the Admin Panel yet.");
    }
  };

  return (
    <section id="about" className="py-24 bg-black relative">
       {/* Background Decoration */}
       <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 reveal">
            
            {/* Text Content */}
            <div className={`${!data.aboutImage ? 'lg:col-span-2 text-center' : ''} order-2 lg:order-1`}>
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white">About</h2>
                <div className="w-20 h-1 bg-white mb-8 rounded-full"></div>
                <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light text-justify font-mono mb-8">
                    {data.aboutMe}
                </p>
                {/* View Resume Button */}
                <button 
                    onClick={handleResumeClick}
                    className="inline-block bg-white text-black border border-white px-10 py-4 font-bold uppercase tracking-[0.2em] hover:bg-neutral-300 hover:text-black transition-all duration-300 rounded-full shadow-lg hover:shadow-white/20"
                >
                    View Resume
                </button>
            </div>

             {/* Side Image - Height set to 400px */}
             {data.aboutImage && (
                <div className="w-full max-w-md mx-auto order-1 lg:order-2 relative group">
                    {/* Creative Offset Borders */}
                    <div className="absolute inset-0 border-2 border-white rounded-3xl translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                    
                    {/* Main Image Container - Specific Height 400px */}
                    <div className="relative z-10 overflow-hidden bg-neutral-900 border border-white/20 rounded-3xl shadow-2xl h-[400px]">
                        <img 
                            src={data.aboutImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                </div>
             )}
        </div>

        <div className="mt-24">
          <h3 className="text-xl font-bold uppercase text-white mb-12 inline-block tracking-[0.2em] border-b border-white pb-2 reveal">Education</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:bg-white/10 transition-all group reveal delay-100 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors"></div>
                
                <div className="text-4xl font-black text-white/10 group-hover:text-white/30 transition-colors mb-6 font-sans">
                    0{index + 1}
                </div>
                <h4 className="text-lg font-bold uppercase mb-2 text-white">{edu.degree}</h4>
                <p className="text-neutral-400 mb-1 font-mono text-xs uppercase">{edu.institution}</p>
                <div className="flex justify-between items-end mt-8">
                    <span className="text-xs bg-white/10 text-white px-3 py-1 font-bold font-mono rounded-full border border-white/10">{edu.year}</span>
                    <span className="text-sm font-bold text-neutral-500">Score: <span className="text-white">{edu.score}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
