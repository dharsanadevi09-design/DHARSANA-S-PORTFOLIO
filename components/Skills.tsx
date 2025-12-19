import React from 'react';
import { PortfolioData } from '../types';

interface SkillsProps {
  data: PortfolioData;
}

const Skills: React.FC<SkillsProps> = ({ data }) => {
  return (
    <section id="skills" className="py-24 bg-black relative">
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Tech Stack */}
        <div className="mb-32 reveal">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-white text-center">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {data.skills.map((skill, index) => (
                    <div 
                        key={index} 
                        className="bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-6 flex flex-col items-center gap-3 hover:bg-white/10 hover:scale-105 transition-all group min-w-[140px] justify-center rounded-3xl shadow-lg"
                    >
                        {skill.icon ? (
                             <img src={skill.icon} alt={skill.name} className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-all" />
                        ) : (
                            <span className="font-mono font-bold text-2xl">•</span>
                        )}
                        <span className="text-xs font-bold uppercase tracking-wider text-white">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Selected Projects - ID: projects */}
        <div id="projects" className="reveal pt-24 -mt-24"> 
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-white">Selected Projects</h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {data.projects.map((project, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all group flex flex-col reveal delay-100 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-white/5">
                        
                        <div className="h-56 overflow-hidden bg-black/50 relative">
                             {project.image ? (
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                                />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-800 text-4xl font-black uppercase">IMG</div>
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                            <h3 className="text-2xl font-bold uppercase mb-4 text-white">{project.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="text-[10px] font-bold text-white bg-white/10 px-3 py-1 uppercase rounded-full border border-white/10">{tech}</span>
                                ))}
                            </div>
                            <p className="text-neutral-400 mb-8 font-light text-sm leading-relaxed flex-1 font-mono">{project.description}</p>
                            <a href={project.link || project.image || '#'} target="_blank" rel="noreferrer" className="block w-full text-center bg-white text-black py-4 font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors rounded-full shadow-lg">View Project</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;