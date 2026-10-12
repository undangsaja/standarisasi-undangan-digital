import React, { useState, useRef, useEffect } from 'react';
import { Disc3, VolumeX } from 'lucide-react';

export default function AudioPlayer({ audioUrl, autoPlayRequested }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlayRequested && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented by browser:', err);
        });
    }
  }, [autoPlayRequested]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  if (!autoPlayRequested) return null;

  return (
    <div className="absolute bottom-20 right-4 z-40 pointer-events-auto">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-white/25 ${
          isPlaying 
            ? 'bg-neutral-950/90 text-white shadow-black/40' 
            : 'bg-neutral-800/85 text-neutral-400'
        } backdrop-blur-md`}
      >
        {isPlaying ? (
          <Disc3 size={20} className="animate-spin-slow text-white" />
        ) : (
          <VolumeX size={16} className="text-neutral-400" />
        )}
      </button>
    </div>
  );
}
