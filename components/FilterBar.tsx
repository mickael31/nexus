import React from 'react';
import { FilterState } from '../types';
import { WOW_CLASSES, WOW_EXPANSIONS, CONTENT_TYPES } from '../constants';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onSearch, isLoading }) => {
  
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div id="recherche" className="bg-wow-panel border-y border-gray-800 shadow-inner py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un guide (ex: Tanking Paladin mm+)..."
            value={filters.query}
            onChange={(e) => handleChange('query', e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-900/50 text-gray-100 border border-gray-700 rounded-lg pl-4 pr-32 py-4 focus:ring-2 focus:ring-wow-goldDim focus:border-transparent outline-none transition-all placeholder-gray-500 font-sans text-lg"
            aria-label="Recherche"
          />
          <button
            onClick={onSearch}
            disabled={isLoading}
            className="absolute right-2 top-2 bottom-2 bg-wow-gold hover:bg-yellow-400 text-wow-dark font-bold py-2 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
            aria-label="Lancer la recherche"
          >
            {isLoading ? '...' : 'Chercher'}
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Class Filter */}
          <div className="relative group">
            <select
              value={filters.class}
              onChange={(e) => handleChange('class', e.target.value)}
              className="w-full appearance-none bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-500 rounded px-4 py-2.5 focus:outline-none focus:border-wow-gold transition-colors cursor-pointer"
            >
              <option value="">Toutes les classes</option>
              {WOW_CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Expansion Filter */}
          <div className="relative">
             <select
              value={filters.expansion}
              onChange={(e) => handleChange('expansion', e.target.value)}
              className="w-full appearance-none bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-500 rounded px-4 py-2.5 focus:outline-none focus:border-wow-gold transition-colors cursor-pointer"
            >
              <option value="">Toutes extensions</option>
              {WOW_EXPANSIONS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Content Type Filter */}
          <div className="relative">
             <select
              value={filters.contentType}
              onChange={(e) => handleChange('contentType', e.target.value)}
              className="w-full appearance-none bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-500 rounded px-4 py-2.5 focus:outline-none focus:border-wow-gold transition-colors cursor-pointer"
            >
              <option value="">Tous les types</option>
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

           {/* Sort Filter */}
           <div className="relative">
             <select
              value={filters.sortBy}
              onChange={(e) => handleChange('sortBy', e.target.value)}
              className="w-full appearance-none bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-500 rounded px-4 py-2.5 focus:outline-none focus:border-wow-gold transition-colors cursor-pointer"
            >
              <option value="relevance">Pertinence</option>
              <option value="date">Date de publication</option>
              <option value="views">Nombre de vues</option>
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterBar;
