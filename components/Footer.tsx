import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wow-dark border-t border-gray-800 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p className="text-gray-500 text-sm">
          WoW Codex n&apos;est pas affilié à Blizzard Entertainment. World of Warcraft est une marque déposée de Blizzard
          Entertainment, Inc.
        </p>
        <p className="text-gray-600 text-xs">
          Propulsé par React. Recherche IA via Gemini API (optionnel). Développé pour la communauté.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
