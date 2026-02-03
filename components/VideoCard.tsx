
import React from 'react';
import { VideoResult } from '../types';

interface VideoCardProps {
  video: VideoResult;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const isYouTube = video.url.includes('youtube.com') || video.url.includes('youtu.be');
  
  return (
    <div className="group relative glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] flex flex-col h-full bg-slate-900/40">
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail || `https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=225&auto=format&fit=crop`} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Badges contextuels */}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-yellow-500 border border-yellow-500/20">
          {video.duration || '--:--'}
        </div>
        
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter shadow-lg ${
          isYouTube ? 'bg-red-600 text-white' : 'bg-purple-600 text-white'
        }`}>
          {video.platform}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-slate-100 line-clamp-2 leading-snug mb-2 group-hover:text-yellow-400 transition-colors duration-300">
          {video.title}
        </h3>
        
        <p className="text-slate-400 text-xs line-clamp-3 mb-4 leading-relaxed opacity-80">
          {video.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              {video.views} vues
            </span>
            <span>{video.date}</span>
          </div>

          <a 
            href={video.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group/btn relative w-full inline-flex items-center justify-center px-4 py-2.5 overflow-hidden font-bold text-white rounded-xl bg-slate-800 border border-slate-700 transition-all hover:bg-yellow-600 hover:text-slate-950 hover:border-yellow-500"
          >
            <span className="relative flex items-center gap-2 uppercase text-xs tracking-widest">
              Lancer le Guide
              <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
