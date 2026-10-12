import React from 'react';
import { MailOpen } from 'lucide-react';

export default function OpeningSection({ data, guestName, onOpenInvitation, isUnlocked }) {
  const { groom, bride } = data.couple;
  const coverImg = data.meta.coverImage || '/ornaments/bg-opening.png';
  const topOrnamentImg = data.meta.openingHeaderImage || '/ornaments/opening-atas.png';

  return (
    <section 
      id="opening"
      className="relative h-full max-h-[100dvh] w-full flex flex-col justify-between items-center text-center p-5 pb-24 bg-neutral-950 text-neutral-100 overflow-hidden select-none"
    >
      {/* Background Image (bg-opening.png) with Monochrome Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${coverImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-neutral-900/35" />

      {/* Top Header Image (opening-atas.png) */}
      <div className="relative z-10 pt-2 flex justify-center" data-aos="fade-down" data-aos-duration="800">
        <img
          src={topOrnamentImg}
          alt="Wedding Doves Ornament"
          className="w-40 sm:w-48 h-auto object-contain drop-shadow-lg animate-ornament-bl"
        />
      </div>

      {/* Main Couple Names */}
      <div className="relative z-10 my-auto py-1 flex flex-col items-center" data-aos="zoom-in" data-aos-duration="900">
        <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-300 mb-1.5 font-medium drop-shadow">
          We Are Getting Married
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5 leading-tight drop-shadow-md">
          {groom.nickName} <span className="font-script text-4xl text-neutral-300 font-normal">&</span> {bride.nickName}
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent my-2" />
        <p className="text-xs font-light text-neutral-200 tracking-wider drop-shadow">
          Jumat, 25 Desember 2026
        </p>
      </div>

      {/* Personalized Guest Badge & Open Button */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-2.5" data-aos="fade-up" data-aos-duration="800">
        {/* Recipient Glass Card */}
        <div className="w-full rounded-2xl p-3 bg-white/10 backdrop-blur-md border border-white/25 shadow-xl text-center">
          <p className="text-[10.5px] uppercase tracking-wider text-neutral-300 font-medium mb-0.5">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-lg font-bold text-white tracking-wide break-words py-0.5">
            {guestName}
          </h2>
          <p className="text-[9.5px] text-neutral-400 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Action Button: Buka Undangan (Monochrome White Pill) */}
        <button
          onClick={onOpenInvitation}
          className="w-full group flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white text-neutral-950 font-semibold text-xs shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:bg-neutral-200 active:scale-95 transition-all duration-300"
        >
          <MailOpen size={16} className="group-hover:rotate-6 transition-transform" />
          <span>{isUnlocked ? "Lihat Undangan" : "Buka Undangan"}</span>
        </button>
      </div>
    </section>
  );
}
