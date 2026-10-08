import React from 'react';
import { MailOpen, Sparkles } from 'lucide-react';

export default function OpeningSection({ data, guestName, onOpenInvitation, isUnlocked }) {
  const { groom, bride } = data.couple;
  const coverImg = data.meta.coverImage;

  return (
    <section 
      id="opening"
      className="relative h-full max-h-[100dvh] w-full flex flex-col justify-between items-center text-center p-5 pb-24 bg-slate-900 text-stone-100 overflow-hidden select-none"
    >
      {/* Background Image with Dark Romantic Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${coverImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60 backdrop-blur-[1px]" />

      {/* Top Header */}
      <div className="relative z-10 pt-4 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/25 text-amber-200 text-[11px] tracking-widest uppercase font-semibold">
          <Sparkles size={12} className="text-amber-300" />
          The Wedding Celebration
        </div>
      </div>

      {/* Main Couple Names */}
      <div className="relative z-10 my-auto py-2 flex flex-col items-center">
        <p className="text-[11px] tracking-[0.25em] uppercase text-stone-300 mb-1.5 font-medium">
          We Are Getting Married
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5 leading-tight">
          {groom.nickName} <span className="font-script text-4xl text-amber-300 font-normal">&</span> {bride.nickName}
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent my-2" />
        <p className="text-xs font-light text-stone-300 tracking-wider">
          Jumat, 25 Desember 2026
        </p>
      </div>

      {/* Personalized Guest Badge & Open Button */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-2.5">
        {/* Recipient Glass Card */}
        <div className="w-full rounded-2xl p-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-center">
          <p className="text-[10.5px] uppercase tracking-wider text-stone-300 font-medium mb-0.5">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-lg font-bold text-amber-200 tracking-wide break-words py-0.5">
            {guestName}
          </h2>
          <p className="text-[9.5px] text-stone-400 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Action Button: Buka Undangan */}
        <button
          onClick={onOpenInvitation}
          className="w-full group flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-semibold text-xs shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.6)] active:scale-95 transition-all duration-300"
        >
          <MailOpen size={16} className="group-hover:rotate-6 transition-transform" />
          <span>{isUnlocked ? "Lihat Undangan" : "Buka Undangan"}</span>
        </button>
      </div>
    </section>
  );
}
