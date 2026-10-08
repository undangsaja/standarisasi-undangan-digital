import React from 'react';
import { Heart } from 'lucide-react';

export default function ThanksSection({ data }) {
  const { thanks, couple } = data;

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-6 pb-24 bg-slate-950 text-stone-200 flex flex-col items-center justify-center text-center relative select-none">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(245,158,11,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-xs flex flex-col items-center my-auto">
        <div 
          className="w-11 h-11 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4 shadow-sm"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <Heart size={18} fill="currentColor" />
        </div>

        <h2 
          className="font-serif text-2xl font-bold text-white mb-3"
          data-aos="fade-down"
          data-aos-duration="700"
        >
          Terima Kasih
        </h2>

        <p 
          className="text-[11.5px] text-stone-300 leading-relaxed font-light mb-4"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {thanks.message}
        </p>

        <p 
          className="font-serif italic text-xs text-amber-200/90 mb-3"
          data-aos="fade-up"
          data-aos-duration="850"
        >
          {thanks.closing}
        </p>

        <div className="w-14 h-px bg-stone-700 my-1.5" data-aos="zoom-in" data-aos-duration="500" />

        <p 
          className="text-[11px] font-semibold text-stone-200 mt-2 mb-0.5"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          Kami yang berbahagia,
        </p>
        <h3 
          className="font-serif text-xl font-bold text-amber-300 mb-1"
          data-aos="zoom-in"
          data-aos-duration="900"
        >
          {couple.groom.nickName} & {couple.bride.nickName}
        </h3>
        <p 
          className="text-[10px] text-stone-400 font-light"
          data-aos="fade-up"
          data-aos-duration="950"
        >
          Beserta {thanks.family}
        </p>

        {/* Branding Footer */}
        <div className="mt-8 text-[9.5px] text-stone-500">
          Template Standar Undangan Digital &copy; 2026
        </div>
      </div>
    </div>
  );
}
