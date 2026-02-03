
import React, { useState, useEffect, useCallback } from 'react';
import { SearchFilters, VideoResult } from './types.ts';
import { VideoCard } from './components/VideoCard.tsx';
import { Filters } from './components/Filters.tsx';
import { searchVideos } from './services/geminiService.ts';

const LOADING_MESSAGES = [
  "Consultation des Archives de Dalaran...",
  "Ouverture d'un portail vers YouTube...",
  "Analyse des flux de mana...",
  "Invoquer l'intelligence de l'Archimage...",
  "Localisation des guides légendaires..."
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
    }, 2500);

    try {
      const results = await searchVideos(filters);
      setVideos(results);
    } catch (err: any) {
      setError(err.message || "Une erreur arcanique est survenue.");
    } finally {
      clearInterval(msgInterval);
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 selection:bg-yellow-500/30 selection:text-yellow-200">
      {/* Header Epic */}
      <header className="sticky top-0 z-[100] border-b border-yellow-900/20 bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse"></div>
              <svg className="w-10 h-10 text-yellow-500 relative" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
            <div>
              <h1 className="wow-font text-2xl font-bold tracking-tighter text-white leading-none">
                GUIDE <span className="text-yellow-500">NEXUS</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-500/60 font-bold">Archives d'Azeroth</p>
            </div>
          </div>
          
          <button 
            onClick={fetchResults}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoading ? "Synchronisation..." : "Rafraîchir"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <Filters 
              filters={filters} 
              setFilters={setFilters} 
              onSearch={fetchResults}
              isLoading={isLoading}
            />
          </aside>

          {/* Results Area */}
          <section className="flex-grow">
            <div className="mb-10 flex items-end justify-between border-b border-white/5 pb-6">
              <div>
                <h2 className="text-4xl font-black wow-font text-white mb-2 italic">
                  Guides <span className="text-yellow-500">Découverts</span>
                </h2>
                <p className="text-slate-500 font-medium">Affichage des meilleurs résultats pour {filters.expansion}</p>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-[10px] font-bold text-yellow-500/40 uppercase tracking-widest">Oracle Gemini Flash 3</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="relative h-24 w-24 mb-10">
                  <div className="absolute inset-0 border-2 border-yellow-500/10 rounded-full scale-150"></div>
                  <div className="absolute inset-0 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full blur-md animate-pulse"></div>
                  </div>
                </div>
                <h3 className="wow-font text-2xl font-bold text-yellow-500 animate-pulse tracking-widest uppercase">
                  {loadingMsg}
                </h3>
              </div>
            ) : error ? (
              <div className="p-16 text-center rounded-3xl border border-red-500/20 bg-red-500/5">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="wow-font text-2xl font-bold text-red-400 mb-4">Erreur de Phase</h3>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto">{error}</p>
                <button onClick={fetchResults} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700">Réessayer l'Invocation</button>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-slate-500 wow-font text-xl">Aucun manuscrit trouvé dans cette section des archives.</p>
                <button onClick={() => setFilters(f => ({...f, query: ''}))} className="mt-4 text-yellow-500 underline underline-offset-4 font-bold text-sm">Réinitialiser les filtres</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {videos.map((video, idx) => (
                  <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{animationDelay: `${idx * 100}ms`}}>
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="mt-32 border-t border-white/5 py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="wow-font text-xl font-bold text-white/20 mb-4 tracking-[0.5em]">AZEROTH • NEXUS</div>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Propulsé par Gemini AI • World of Warcraft fan project</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
