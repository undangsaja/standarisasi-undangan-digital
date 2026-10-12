import React from 'react';
import { Quote } from 'lucide-react';

export default function QuotesSection({ data }) {
  const { source, content } = data.quotes;

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-6 pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 flex flex-col items-center justify-center text-center relative select-none">
      {/* Subtle monochrome background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-sm flex flex-col items-center my-auto">
        <div 
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-5 shadow-sm"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <Quote size={22} className="rotate-180" />
        </div>

        <span 
          className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400 mb-3"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          Untaian Doa & Harapan
        </span>

        <blockquote 
          className="font-serif italic text-sm sm:text-base text-neutral-200 leading-relaxed mb-5 px-3"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          "{content}"
        </blockquote>

        <div className="w-14 h-0.5 bg-white/30 mb-3" data-aos="zoom-in" data-aos-duration="500" />

        <cite 
          className="not-italic text-[11px] tracking-widest font-semibold uppercase text-white"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          — {source}
        </cite>
      </div>
    </div>
  );
}
