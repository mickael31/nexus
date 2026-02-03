import React from 'react';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  isLoading: boolean;
  hasSearched: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, isLoading, hasSearched, errorMessage, onRetry }) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl overflow-hidden h-80 animate-pulse border border-gray-700">
              <div className="h-44 bg-gray-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                <div className="h-16 bg-gray-700 rounded w-full mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        {errorMessage ? (
          <div className="max-w-xl mx-auto bg-wow-panel border border-red-500/30 rounded-xl p-8 shadow-lg">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-serif text-gray-200 mb-2">Un problème est survenu</h2>
            <p className="text-gray-400 mb-6">{errorMessage}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded border border-wow-gold text-wow-gold hover:bg-wow-gold hover:text-wow-dark transition-all duration-300 font-semibold uppercase tracking-wide text-sm"
              >
                Réessayer
              </button>
            )}
          </div>
        ) : hasSearched ? (
          <>
            <div className="text-4xl mb-4">📜</div>
            <h2 className="text-2xl font-serif text-gray-300 mb-2">Aucun résultat trouvé</h2>
            <p className="text-gray-500">Essayez de modifier vos filtres ou vos termes de recherche.</p>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">🔎</div>
            <h2 className="text-2xl font-serif text-gray-300 mb-2">Prêt à apprendre ?</h2>
            <p className="text-gray-500">Utilisez la barre de recherche ou les filtres pour trouver un tutoriel.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {errorMessage && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-100 rounded-lg px-4 py-3 flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold">Recherche partielle</div>
            <div className="text-sm text-red-200/90">{errorMessage}</div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="shrink-0 px-3 py-1.5 rounded border border-red-300/40 hover:border-red-200 text-red-100 hover:bg-red-500/10 transition-colors text-sm font-semibold"
            >
              Réessayer
            </button>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-wow-gold border-b-2 border-wow-gold/30 pb-1">
          Résultats ({videos.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
