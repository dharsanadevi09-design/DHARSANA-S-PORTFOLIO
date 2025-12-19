import React, { useState } from 'react';
import { PortfolioData, Certificate } from '../types';

interface ExperienceProps {
  data: PortfolioData;
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="experience" className="py-24 bg-black relative">
       {/* Background Decoration */}
       <div className="absolute right-10 bottom-1/4 w-[200px] h-[200px] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-20">
            {/* Experience Column */}
            <div className="reveal">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-white">
                    Experience
                </h2>
                <div className="space-y-16 border-l border-white/20 ml-3 pl-10 relative">
                    {data.experience.map((exp, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute -left-[45px] top-1 w-2 h-2 bg-black border border-white rounded-full group-hover:bg-white transition-colors"></div>
                            <h3 className="text-2xl font-bold uppercase text-white mb-1">{exp.role}</h3>
                            <h4 className="text-lg text-neutral-400 mb-4 font-mono">{exp.company}</h4>
                            <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 uppercase inline-block mb-6 rounded-full border border-white/10">{exp.duration}</span>
                            <p className="text-neutral-400 font-light text-sm leading-relaxed font-mono text-justify">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificates Column */}
            <div id="certificates" className="reveal delay-200 pt-12 lg:pt-0">
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 lg:text-right text-white">
                    Certificates
                </h2>
                <div className="grid gap-6">
                    {data.certificates.map((cert, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col md:flex-row items-center gap-6 bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:bg-white/10 transition-all group rounded-3xl shadow-lg"
                        >
                            {cert.issuerLogo ? (
                                <div className="bg-white p-2 rounded-2xl w-16 h-16 flex items-center justify-center">
                                     <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-contain transition-all" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-white/10 flex items-center justify-center text-white font-bold text-[10px] uppercase text-center rounded-2xl border border-white/10">
                                    {cert.issuer ? cert.issuer.substring(0, 3) : 'CERT'}
                                </div>
                            )}

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-base font-bold uppercase text-white leading-tight mb-2">{cert.title}</h3>
                                <p className="text-neutral-500 text-xs uppercase tracking-wider">{cert.issuer} • {cert.year}</p>
                            </div>
                            
                            <button 
                                onClick={() => {
                                    if(cert.certificateImage) setSelectedCert(cert);
                                }}
                                className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors rounded-full ${cert.certificateImage ? 'bg-transparent border-white text-white hover:bg-white hover:text-black cursor-pointer' : 'bg-transparent border-neutral-800 text-neutral-600 cursor-not-allowed'}`}
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setSelectedCert(null)}>
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center border border-white/20 bg-neutral-900/90 p-4 rounded-3xl shadow-2xl">
                <button className="absolute -top-12 right-0 text-white hover:text-neutral-400 font-bold uppercase tracking-widest text-xs" onClick={() => setSelectedCert(null)}>Close [X]</button>
                <img src={selectedCert.certificateImage} alt={selectedCert.title} className="max-w-full max-h-[80vh] object-contain rounded-xl" />
            </div>
        </div>
      )}
    </section>
  );
};

export default Experience;