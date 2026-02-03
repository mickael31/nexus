
import React from 'react';
import { SearchFilters } from '../types.ts';
import { CLASSES, EXPANSIONS, CONTENTS } from '../constants.tsx';

interface FiltersProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearch: () => void;
  isLoading: boolean;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, onSearch, isLoading }) => {
  const handleChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6 sticky top-24 shadow-2xl border-yellow-900/20">
      <h2 className="text-xl font-bold wow-font text-yellow-500 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtres de quête
      </h2>
      
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Mots-clés libres</label>
        <input 
          type="text"
          placeholder="ex: raid, donjon, rotations..."
          className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-yellow-600 transition-all focus:ring-1 focus:ring-yellow-600"
          value={filters.query}
          onChange={(e) => handleChange('query', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Classe</label>
          <select 
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-yellow-600 transition-colors cursor-pointer"
            value={filters.wowClass}
            onChange={(e) => handleChange('wowClass', e.target.value)}
          >
            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Extension</label>
          <select 
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-yellow-600 transition-colors cursor-pointer"
            value={filters.expansion}
            onChange={(e) => handleChange('expansion', e.target.value)}
          >
            {EXPANSIONS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Catégorie</label>
        <div className="grid grid-cols-2 gap-2">
          {CONTENTS.map(c => (
            <button
              key={c}
              onClick={() => handleChange('content', c)}
              className={`text-[10px] font-bold py-2 px-1 rounded border transition-all uppercase tracking-wider ${
                filters.content === c 
                  ? 'bg-yellow-600 border-yellow-500 text-slate-900 shadow-lg shadow-yellow-600/20' 
                  : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSearch}
        disabled={isLoading}
        className="mt-2 w-full bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 text-white font-bold py-3 rounded-xl transition-all shadow-xl shadow-amber-900/20 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Lancer la Recherche
          </>
        )}
      </button>
    </div>
  );
};
