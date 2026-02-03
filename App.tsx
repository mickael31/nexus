
import React, { useState, useEffect, useCallback } from 'react';
import { SearchFilters, VideoResult } from './types.ts';
import { VideoCard } from './components/VideoCard.tsx';
import { Filters } from './components/Filters.tsx';
import { searchVideos } from './services/geminiService.ts';

const LOADING_MESSAGES = [
  "Invoquer des grimoires de connaissances...",
  "Appel de la monture vers YouTube...",
  "Extraction des loot de données...",
  "Consultation de l'archimage Gemini...",
  "Synchronisation avec les serveurs d'Azeroth...",
  "Préparation des potions de savoir..."
];

const App: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    wowClass: 'Tous',
    expansion: 'The War Within',
    content: 'Tous',
    sortBy: 'relevance'
  });

  const [videos, setVideos] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  const fetchResults = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const msgInterval = setInterval(() => {
      setLoadingMsg(prev => {
        const idx = LOADING_MESSAGES.indexOf(prev);
        return LOADING_MESSAGES[(idx + 1) % LOADING_MESSAGES.length];
      });
    }, 2000);

    try {
      const results = await searchVideos(filters);
      setVideos(results);
      if (results.length === 0) {
        setError("Aucun guide trouvé. L'éclaireur n'a rien ramené des Terres de l'Ombre.");
      }
    } catch (err) {
      console.error(err);
      setError("Une erreur de phase s'est produite. Rechargez l'instance.");
    } finally {
      clearInterval(msgInterval);
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-[#06080c] text-slate-300 selection:bg-yellow-500/30 selection:text-yellow-200">
      <nav className="sticky top-0 z-[60] bg-[#0b0e14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative px-3 py-1 bg-slate-900 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="wow-font text-xl font-black text-yellow-500">W</span>
                <span className="wow-font hidden sm:inline font-bold tracking-widest text-sm bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">GUIDE NEXUS</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:block">Region: FR/EU</span>
            <div className="h-4 w-px bg-white/10 hidden md:block"></div>
            <button 
              onClick={fetchResults}
              disabled={isLoading}
              className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors"
              title="Synchroniser"
            >
              <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-1/4">
            <Filters 
              filters={filters} 
              setFilters={setFilters} 
              onSearch={fetchResults}
              isLoading={isLoading}
            />
          </aside>

          <section className="lg:w-3/4">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-black wow-font tracking-tight text-white italic">
                  Tutoriels <span className="text-yellow-500">Recents</span>
                </h2>
                <div className="h-px flex-grow bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
              </div>
              <p className="text-slate-500 text-sm italic">Exploration des meilleures stratégies pour {filters.expansion}</p>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-1000">
                <div className="w-20 h-20 relative mb-8">
                  <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-yellow-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-4 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.504 2.1-.504 3.044 0l4.092 2.182c.944.504.944 1.324 0 1.828l-4.092 2.182c-.944.504-2.1.504-3.044 0L1.848 9.51c-.944-.504-.944-1.324 0-1.828l4.092-2.182z" /></svg>
                  </div>
                </div>
                <p className="wow-font text-yellow-500/80 font-bold text-lg tracking-widest animate-pulse uppercase">{loadingMsg}</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center bg-red-900/5 rounded-3xl border border-red-500/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-red-400 mb-2 wow-font">Échec de l'exploration</h3>
                <p className="text-slate-500 mb-6">{error}</p>
                <button onClick={fetchResults} className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">Réessayer</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={`${video.url}-${index}`} video={video} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 opacity-50 grayscale hover:grayscale-0 transition-all text-center">
          <div className="text-[10px] font-bold tracking-[0.5em] uppercase">Built with Gemini 3 Pro & React</div>
          <div className="flex gap-4 text-xs">
            <span>© {new Date().getFullYear()} WoW Guide Nexus</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
