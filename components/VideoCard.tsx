import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <a 
      href={video.videoUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-wow-gold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-wow-gold/20 block"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
           <svg className="w-12 h-12 text-white fill-current drop-shadow-lg" viewBox="0 0 24 24">
             <path d="M8 5v14l11-7z"/>
           </svg>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-100 font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-wow-gold transition-colors">
          {video.title}
        </h3>
        
        <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
          <span className="font-semibold text-gray-300 hover:underline">{video.channelName}</span>
          <span>•</span>
          <span>{video.views}</span>
          <span>•</span>
          <span>{video.publishedDate}</span>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
          {video.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {video.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-600">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default VideoCard;