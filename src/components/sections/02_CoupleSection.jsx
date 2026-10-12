import React from 'react';

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
  const profiles = [
    { key: 'groom', role: 'The Groom', person: groom, tilt: '-rotate-1', aos: 'fade-right' },
    { key: 'bride', role: 'The Bride', person: bride, tilt: 'rotate-1', aos: 'fade-left' },
  ];

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden px-3.5 pt-14 pb-24 bg-neutral-50 text-neutral-800 flex flex-col justify-center items-center text-center select-none">
      {/* Top Header (diturunkan agar tidak tertutup ornamen atas) */}
      <div className="relative z-30 mb-3 sm:mb-4" data-aos="fade-down" data-aos-duration="600">
        <span className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-0.5 block">
          Pasangan Mempelai
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
          Mempelai Bahagia
        </h2>
        <div className="w-10 h-0.5 bg-neutral-900 mx-auto mt-1.5 rounded-full" />
      </div>

      {/* Side-by-Side Polaroid & Content Grid */}
      <div className="relative z-30 w-full max-w-[390px] grid grid-cols-2 gap-2.5 sm:gap-3.5 items-stretch">
        {/* Badge '&' di tengah antara kedua foto polaroid */}
        <div 
          className="absolute left-1/2 top-[68px] sm:top-[76px] -translate-x-1/2 -translate-y-1/2 z-40 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-950 text-white font-serif italic text-xs sm:text-sm flex items-center justify-center shadow-md border-2 border-white pointer-events-none"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          &amp;
        </div>

        {profiles.map(({ key, role, person, tilt, aos }) => (
          <div
            key={key}
            className="flex flex-col items-center h-full"
            data-aos={aos}
            data-aos-duration="750"
          >
            {/* Polaroid Frame */}
            <div className={`w-full max-w-[155px] bg-white p-1.5 pb-3 sm:p-2 sm:pb-3.5 rounded-sm shadow-md border border-neutral-200/90 transition-transform duration-300 hover:rotate-0 ${tilt}`}>
              <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-neutral-200">
                <img
                  src={person.photo}
                  alt={person.fullName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 grayscale-[15%]"
                  loading="lazy"
                />
              </div>
              {/* Dagu Polaroid */}
              <p className="font-serif italic text-[10px] sm:text-[11px] text-neutral-500 tracking-wider mt-1.5 leading-none">
                {role}
              </p>
            </div>

            {/* Isi Konten Mempelai (Sama seperti sebelumnya) */}
            <div className="w-full mt-2.5 bg-white/95 rounded-2xl p-2.5 sm:p-3 shadow-sm border border-neutral-200 flex flex-col items-center justify-between flex-1">
              <div className="flex flex-col items-center">
                {/* Full Name & Titles */}
                <h3 className="font-serif text-xs sm:text-[13px] font-bold text-neutral-950 leading-snug">
                  {person.fullName}
                </h3>
                <p className="text-[10.5px] sm:text-[11px] text-neutral-500 font-semibold mt-0.5 mb-1.5">
                  ({person.nickName})
                </p>

                {/* Parent Names */}
                <p className="text-[10px] sm:text-[10.5px] text-neutral-600 leading-relaxed mb-2.5">
                  {person.order} <br />
                  <strong className="text-neutral-900">{person.father}</strong>
                  <br />
                  &amp; <strong className="text-neutral-900">{person.mother}</strong>
                </p>
              </div>

              {/* Instagram Link */}
              {person.instagram && (
                <a
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-950 text-neutral-800 hover:text-white text-[10px] font-medium transition-colors border border-neutral-300 mt-auto"
                >
                  <InstagramIcon size={11} className="shrink-0" />
                  <span className="truncate max-w-[105px]">@{person.instagram.split('/').pop()}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
