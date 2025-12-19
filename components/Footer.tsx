import React from 'react';
import { PortfolioData } from '../types';

interface FooterProps {
  data: PortfolioData; 
  onOpenAdmin: () => void;
  onNavigate: (view: 'portfolio' | 'login', sectionId?: string) => void;
}

const getSocialIconAndColor = (platform: string) => {
    const p = platform.toLowerCase();
    const commonClasses = "w-5 h-5 transition-all duration-300 transform group-hover:scale-110";
    
    // Detailed Social Colors Map for the "Real Color" effect on hover
    if (p.includes('linkedin')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>,
        hoverColor: "group-hover:text-[#0077B5]"
    };
    if (p.includes('github')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
        hoverColor: "group-hover:text-[#ffffff] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
    };
    if (p.includes('twitter') || p.includes('x')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>,
        hoverColor: "group-hover:text-[#1DA1F2]"
    };
    if (p.includes('instagram')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
        hoverColor: "group-hover:text-[#E4405F]"
    };
    if (p.includes('facebook')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
        hoverColor: "group-hover:text-[#1877F2]"
    };
    if (p.includes('youtube')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
        hoverColor: "group-hover:text-[#FF0000]"
    };
    if (p.includes('whatsapp')) return {
        icon: <svg fill="currentColor" viewBox="0 0 24 24" className={commonClasses}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
        hoverColor: "group-hover:text-[#25D366]"
    };

    return {
        icon: <span className="w-2 h-2 bg-white rounded-full"></span>,
        hoverColor: "group-hover:text-white"
    };
}

const Footer: React.FC<FooterProps> = ({ data, onOpenAdmin, onNavigate }) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white">
              {data.footerTitle || "Future."}
            </h2>
            <p className="text-neutral-400 max-w-md text-sm font-mono leading-relaxed">
              {data.footerText || "Crafting digital experiences with precision."}
            </p>
          </div>

          {/* Navigation Menu */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white pb-2 inline-block text-white">Menu</h3>
            <ul className="space-y-4 text-neutral-400 font-mono text-xs">
              <li><button onClick={() => onNavigate('portfolio', 'home')} className="hover:text-white transition-colors text-left uppercase">HOME</button></li>
              <li><button onClick={() => onNavigate('portfolio', 'about')} className="hover:text-white transition-colors text-left uppercase">ABOUT</button></li>
              <li><button onClick={() => onNavigate('portfolio', 'skills')} className="hover:text-white transition-colors text-left uppercase">SKILLS</button></li>
              <li><button onClick={() => onNavigate('portfolio', 'experience')} className="hover:text-white transition-colors text-left uppercase">EXPERIENCE</button></li>
              <li><button onClick={() => onNavigate('portfolio', 'projects')} className="hover:text-white transition-colors text-left uppercase">PROJECTS</button></li>
              <li><button onClick={() => onNavigate('portfolio', 'contact')} className="hover:text-white transition-colors text-left uppercase">CONTACT</button></li>
            </ul>
          </div>

          {/* Social Links with Real Brand Colors */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 border-b border-white pb-2 inline-block text-white">Socials</h3>
            <ul className="space-y-4 text-neutral-400 font-mono text-xs">
              {data.socialLinks && data.socialLinks.length > 0 ? (
                  data.socialLinks.map((social, index) => {
                      const { icon, hoverColor } = getSocialIconAndColor(social.platform);
                      return (
                        <li key={index}>
                            <a 
                                href={social.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className={`group flex items-center gap-3 transition-all duration-300 ${hoverColor}`}
                            >
                                <span className="text-neutral-500 group-hover:inherit transition-colors">{icon}</span>
                                <span className="uppercase text-neutral-400 group-hover:inherit transition-colors font-bold tracking-wider">{social.platform}</span>
                            </a>
                        </li>
                      );
                  })
              ) : (
                  <li className="text-neutral-600">No links set</li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
          <p className="text-neutral-600 text-[10px] font-mono uppercase mb-4 md:mb-0">
            © {new Date().getFullYear()} {data.name}
          </p>
          
          <button 
            onClick={onOpenAdmin}
            className="text-neutral-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors"
          >
            Admin Access
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;