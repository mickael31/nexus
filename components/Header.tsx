import React, { useState } from 'react';
import { clearStoredApiKey, getStoredApiKey, hasApiKey, setStoredApiKey } from '../services/apiKey';

const Header: React.FC = () => {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [draftKey, setDraftKey] = useState('');

  const isDemoMode = !hasApiKey();

  const openKeyModal = () => {
    setDraftKey(getStoredApiKey());
    setIsKeyModalOpen(true);
  };

  const closeKeyModal = () => {
    setIsKeyModalOpen(false);
  };

  const saveKey = () => {
    setStoredApiKey(draftKey);
    setIsKeyModalOpen(false);
  };

  const clearKey = () => {
    clearStoredApiKey();
    setDraftKey('');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-wow-dark/95 backdrop-blur-md border-b border-wow-goldDim shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center flex-shrink-0 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wow-gold to-yellow-800 flex items-center justify-center mr-3 border-2 border-white/20">
                <span className="font-serif text-wow-dark font-bold text-xl">W</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl text-wow-gold tracking-wider font-bold leading-none">
                    WoW <span className="text-gray-300">CODEX</span>
                  </h1>
                  {isDemoMode && (
                    <span className="hidden sm:inline-flex text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-full bg-wow-gold/10 text-wow-gold border border-wow-gold/25">
                      Mode démo
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-none mt-1">
                  Bibliothèque de tutoriels
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#recherche"
                className="hidden md:inline-flex text-gray-300 hover:text-wow-gold transition-colors text-sm font-medium"
              >
                Rechercher
              </a>
              <button
                onClick={openKeyModal}
                className="px-3 py-1.5 rounded border border-gray-700 text-gray-200 hover:border-wow-gold hover:text-wow-gold transition-colors text-sm font-semibold"
              >
                Clé API
              </button>
            </div>
          </div>
        </div>
      </header>

      {isKeyModalOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/70" onClick={closeKeyModal} aria-hidden="true"></div>
          <div className="relative max-w-lg mx-auto mt-20 px-4">
            <div className="bg-wow-panel border border-gray-700 rounded-xl shadow-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif text-gray-100">Clé API Gemini (optionnel)</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    La clé est enregistrée uniquement dans ce navigateur (localStorage). Cette app est 100% front-end :
                    n'utilisez pas une clé sensible.
                  </p>
                </div>
                <button
                  onClick={closeKeyModal}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              <textarea
                value={draftKey}
                onChange={(e) => setDraftKey(e.target.value)}
                placeholder="Collez votre clé API ici…"
                rows={3}
                className="mt-4 w-full bg-gray-900/50 text-gray-100 border border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-wow-goldDim focus:border-transparent outline-none transition-all placeholder-gray-500 font-mono text-sm"
              />

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs text-gray-500">
                  Astuce : laissez vide pour rester en mode démo (données fictives).
                </div>
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={clearKey}
                    className="px-3 py-2 rounded border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-gray-100 transition-colors text-sm font-semibold"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={saveKey}
                    className="px-4 py-2 rounded border border-wow-gold text-wow-gold hover:bg-wow-gold hover:text-wow-dark transition-all duration-300 text-sm font-semibold uppercase tracking-wide"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
