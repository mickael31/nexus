import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-wow-dark border-t border-gray-800 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm mb-2">
          WoW Codex n'est pas affilié à Blizzard Entertainment. World of Warcraft est une marque déposée de Blizzard Entertainment, Inc.
        </p>
        <p className="text-gray-600 text-xs">
          Propulsé par Gemini API & React. Développé pour la communauté.
        </p>
      </div>
    </footer>
  );
};

export default Footer;