import React, { useState, useEffect } from 'react';

interface NavigationProps {
    logoUrl?: string;
    onNavigate: (view: 'portfolio' | 'login', sectionId?: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ logoUrl, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: string) => {
    // Section IDs mapping
    let sectionId = item.toLowerCase();
    onNavigate('portfolio', sectionId);
  };

  // Rule: About, Skills, Experience, Projects, Contact irukkanum
  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 relative flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="cursor-pointer group z-20 relative" 
          onClick={() => onNavigate('portfolio', 'home')}
        >
          {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
          ) : (
            <div className={`flex items-center gap-2 transition-colors text-white`}>
                <span className={`font-black uppercase tracking-[0.3em] text-sm block border border-white px-2 py-1 rounded-sm hover:bg-white hover:text-black transition-colors`}>PORTFOLIO</span>
            </div>
          )}
        </div>
        
        {/* Desktop Menu - Absolute Center */}
        <div className="hidden lg:flex space-x-12 absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors relative group text-white hover:text-white`}
            >
              <span className="relative z-10">{item}</span>
              <span className={`absolute -bottom-2 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full`}></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden ml-auto z-20">
            <button 
                onClick={() => handleNavClick('Contact')} 
                className={`text-[10px] border px-4 py-2 uppercase font-bold tracking-wider transition-colors bg-black text-white hover:bg-white hover:text-black border-white rounded-full`}
            >
                Menu
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;