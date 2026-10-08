import React, { useState } from 'react';

const InstagramIcon = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function CoupleSection({ data }) {
  const { groom, bride } = data.couple;
  const [selectedPerson, setSelectedPerson] = useState('groom');

  const currentPerson = selectedPerson === 'groom' ? groom : bride;
  const isGroom = selectedPerson === 'groom';

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-4 pb-24 text-stone-800 flex flex-col justify-between items-center text-center select-none">
      {/* Top Header */}
      <div className="pt-2" data-aos="fade-down" data-aos-duration="600">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-amber-700/80 mb-0.5 block">
          Pasangan Mempelai
        </span>
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Mempelai Bahagia
        </h2>
      </div>

      {/* Profile Card (Strictly fits screen) */}
      <div 
        className="w-full max-w-xs bg-white rounded-3xl p-4 shadow-sm border border-stone-200/90 flex flex-col items-center my-auto"
        data-aos="zoom-in"
        data-aos-duration="750"
      >
        {/* Toggle Switch between Groom and Bride */}
        <div className="grid grid-cols-2 gap-1 w-full bg-stone-100 p-1 rounded-2xl mb-3">
          <button
            onClick={() => setSelectedPerson('groom')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              isGroom 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Mempelai Pria
          </button>
          <button
            onClick={() => setSelectedPerson('bride')}
            className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
              !isGroom 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Mempelai Wanita
          </button>
        </div>

        {/* Portrait Photo */}
        <div className="relative w-28 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-stone-100 mb-2.5 bg-stone-200">
          <img 
            src={currentPerson.photo} 
            alt={currentPerson.fullName} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Full Name & Titles */}
        <h3 className="font-serif text-base font-bold text-stone-900 leading-tight">
          {currentPerson.fullName}
        </h3>
        <p className="text-xs text-amber-700 font-semibold mb-1">
          ({currentPerson.nickName})
        </p>

        {/* Parent Names */}
        <p className="text-[11px] text-stone-600 leading-relaxed max-w-xs mb-2">
          {currentPerson.order} <br />
          <strong className="text-stone-800">{currentPerson.father}</strong> & <strong className="text-stone-800">{currentPerson.mother}</strong>
        </p>

        {/* Instagram Link */}
        {currentPerson.instagram && (
          <a
            href={currentPerson.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors border border-stone-200"
          >
            <InstagramIcon size={12} className="text-pink-600" />
            <span>@{currentPerson.instagram.split('/').pop()}</span>
          </a>
        )}
      </div>

      {/* Bottom Hint */}
      <p className="text-[10px] text-stone-400 italic" data-aos="fade-up" data-aos-duration="600">
        Sentuh tombol di atas untuk melihat profil mempelai lainnya
      </p>
    </div>
  );
}
