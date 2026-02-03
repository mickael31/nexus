import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-wow-dark/95 backdrop-blur-md border-b border-wow-goldDim shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wow-gold to-yellow-800 flex items-center justify-center mr-3 border-2 border-white/20">
                <span className="font-serif text-wow-dark font-bold text-xl">W</span>
             </div>
             <div className="flex flex-col">
               <h1 className="font-serif text-2xl text-wow-gold tracking-wider font-bold leading-none">
                 WoW <span className="text-gray-300">CODEX</span>
               </h1>
               <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-none mt-1">
                 Bibliothèque de Tutoriels
               </span>
             </div>
          </div>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-wow-gold transition-colors text-sm font-medium">Accueil</a>
            <a href="#" className="text-gray-300 hover:text-wow-gold transition-colors text-sm font-medium">Favoris</a>
            <button className="px-4 py-1.5 rounded border border-wow-gold text-wow-gold hover:bg-wow-gold hover:text-wow-dark transition-all duration-300 text-sm font-semibold uppercase tracking-wide">
              Contribuer
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;