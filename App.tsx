import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import VideoGrid from './components/VideoGrid';
import Footer from './components/Footer';
import { FilterState, Video } from './types';
import { searchVideos } from './services/geminiService';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    class: '',
    expansion: '',
    contentType: '',
    sortBy: 'relevance'
  });

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    setErrorMessage(null);
    try {
      const results = await searchVideos(filters);
      setVideos(results);
    } catch (error) {
      console.error("Failed to fetch videos", error);
      setErrorMessage("La recherche a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load for demo purposes (optional, could be removed if we want empty state first)
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const initialResults = await searchVideos({
          ...filters,
          expansion: 'The War Within',
          query: 'guide'
        });
        setVideos(initialResults);
      } catch (error) {
        console.error("Initial load failed", error);
        setErrorMessage("Impossible de charger les vidéos pour le moment.");
      } finally {
        setIsLoading(false);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="min-h-screen flex flex-col font-sans bg-wow-dark text-gray-100 selection:bg-wow-gold selection:text-wow-dark">
      <Header />

      <main className="flex-grow">
        <div className="bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center h-64 md:h-80 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-wow-dark/30 via-wow-dark/60 to-wow-dark"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-lg mb-4">
                Maîtrisez votre classe
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                Les meilleurs guides, tutoriels et astuces pour World of Warcraft, rassemblés en un seul endroit.
              </p>
            </div>
          </div>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <VideoGrid
          videos={videos}
          isLoading={isLoading}
          hasSearched={hasSearched}
          errorMessage={errorMessage}
          onRetry={handleSearch}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
