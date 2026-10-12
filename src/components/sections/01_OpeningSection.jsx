import React from 'react';
import { MailOpen } from 'lucide-react';

export default function OpeningSection({ data, themeConfig, guestName, onOpenInvitation, isUnlocked }) {
  const { groom, bride } = data.couple;
  const coverImg = themeConfig?.ornaments?.coverImage ?? data.meta.coverImage;
  const topOrnamentImg = themeConfig?.ornaments?.openingHeaderImage ?? data.meta.openingHeaderImage;
  const tagline = themeConfig?.tagline || 'The Wedding Celebration';

  return (
    <section 
      id="opening"
      className="relative h-full max-h-[100dvh] w-full flex flex-col justify-between items-center text-center p-5 pb-24 bg-neutral-950 text-neutral-100 overflow-hidden select-none"
    >
      {/* Background: Image if template has coverImg, otherwise Rich Theme Gradient (Merah, Coklat & Cream Glow) */}
      {coverImg ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{ backgroundImage: `url(${coverImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-neutral-900/35" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgb(var(--theme-200)/0.22)_0%,_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgb(var(--theme-800)/0.45)_0%,_transparent_65%)] pointer-events-none" />
          {/* Bingkai Garis Klasik Tipis (Tanpa Gambar Ornamen) */}
          <div className="absolute inset-3.5 rounded-3xl border border-neutral-300/25 pointer-events-none" />
          <div className="absolute inset-5 rounded-2xl border border-neutral-200/15 pointer-events-none" />
        </>
      )}

      {/* Top Header: Image if template has topOrnamentImg, otherwise Typographic Badge */}
      <div className="relative z-10 pt-3 flex justify-center" data-aos="fade-down" data-aos-duration="800">
        {topOrnamentImg ? (
          <img
            src={topOrnamentImg}
            alt="Wedding Header Ornament"
            className="w-40 sm:w-48 h-auto object-contain drop-shadow-lg animate-ornament-bl"
          />
        ) : (
          <div className="px-4 py-1.5 rounded-full bg-neutral-900/70 border border-neutral-300/40 backdrop-blur-sm shadow-sm">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-neutral-100 font-semibold">
              {tagline}
            </span>
          </div>
        )}
      </div>

      {/* Main Couple Names */}
      <div className="relative z-10 my-auto py-1 flex flex-col items-center" data-aos="zoom-in" data-aos-duration="900">
        <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-200 mb-1.5 font-medium drop-shadow">
          We Are Getting Married
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-surface mb-1.5 leading-tight drop-shadow-md">
          {groom.nickName} <span className="font-script text-4xl text-neutral-200 font-normal">&amp;</span> {bride.nickName}
        </h1>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-neutral-200/80 to-transparent my-2" />
        <p className="text-xs font-light text-neutral-100 tracking-wider drop-shadow">
          Jumat, 25 Desember 2026
        </p>
      </div>

      {/* Personalized Guest Badge & Open Button */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-2.5" data-aos="fade-up" data-aos-duration="800">
        {/* Recipient Glass Card */}
        <div className="w-full rounded-2xl p-3 bg-neutral-900/55 backdrop-blur-md border border-neutral-200/30 shadow-xl text-center">
          <p className="text-[10.5px] uppercase tracking-wider text-neutral-200 font-medium mb-0.5">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2 className="text-lg font-bold text-surface tracking-wide break-words py-0.5">
            {guestName}
          </h2>
          <p className="text-[9.5px] text-neutral-300 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Action Button: Buka / Lihat Undangan */}
        <button
          onClick={onOpenInvitation}
          style={{ backgroundColor: 'rgb(var(--theme-surface))' }}
          className="w-full group flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-neutral-100 text-neutral-950 font-bold text-xs shadow-[0_6px_24px_rgba(0,0,0,0.4)] border border-neutral-200 hover:bg-neutral-200 active:scale-95 transition-all duration-300"
        >
          <MailOpen size={16} className="group-hover:rotate-6 transition-transform" />
          <span>{isUnlocked ? "Lihat Undangan" : "Buka Undangan"}</span>
        </button>
      </div>
    </section>
  );
}
