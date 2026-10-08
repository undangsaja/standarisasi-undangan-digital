import React, { useState, useRef, useEffect } from 'react';
import { Music, Disc3, VolumeX } from 'lucide-react';

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
    <div className="fixed top-5 right-5 z-40 pointer-events-auto">
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-amber-300/40 ${
          isPlaying 
            ? 'bg-slate-900/85 text-amber-300 shadow-amber-500/20' 
            : 'bg-slate-800/85 text-slate-400'
        } backdrop-blur-md`}
      >
        {isPlaying ? (
          <Disc3 size={22} className="animate-spin-slow text-amber-300" />
        ) : (
          <VolumeX size={18} className="text-slate-400" />
        )}
      </button>
    </div>
  );
}

