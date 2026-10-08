import React from 'react';
import { Quote } from 'lucide-react';

export default function QuotesSection({ data }) {
  const { source, content } = data.quotes;

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-6 pb-24 bg-stone-900 text-stone-100 flex flex-col items-center justify-center text-center relative select-none">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(203,176,126,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-sm flex flex-col items-center my-auto">
        <div 
          className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-300 mb-5 shadow-sm"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <Quote size={22} className="rotate-180" />
        </div>

        <span 
          className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80 mb-3"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          Untaian Doa & Harapan
        </span>

        <blockquote 
          className="font-serif italic text-sm sm:text-base text-stone-200 leading-relaxed mb-5 px-3"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          "{content}"
        </blockquote>

        <div className="w-14 h-0.5 bg-amber-400/30 mb-3" data-aos="zoom-in" data-aos-duration="500" />

        <cite 
          className="not-italic text-[11px] tracking-widest font-semibold uppercase text-amber-300"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          — {source}
        </cite>
      </div>
    </div>
  );
}
