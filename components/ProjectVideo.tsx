"use client";

import React, { useState } from "react";

interface ProjectVideoProps {
  youtubeId: string;
}

export default function ProjectVideo({ youtubeId }: ProjectVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mt-4 border border-border-subtle bg-obsidian-deep rounded-sm overflow-hidden aspect-video relative group">
      {!isPlaying ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian-black/80 transition-colors group-hover:bg-obsidian-black/70 cursor-pointer" onClick={() => setIsPlaying(true)}>
          {/* Play Button Icon */}
          <div className="w-16 h-16 rounded-pill border border-steel-silver flex items-center justify-center text-mint-patina bg-obsidian-raised/60 group-hover:scale-105 group-hover:border-mint-patina group-hover:text-steel-silver transition-all duration-300 shadow-lg">
            <svg
              className="w-6 h-6 fill-current ml-1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          
          <span className="mt-3 text-xs font-mono text-text-muted tracking-wider uppercase group-hover:text-text-primary transition-colors">
            Watch FYP Project Demo (2 mins)
          </span>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&start=36`}
          title="FYP Project Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
