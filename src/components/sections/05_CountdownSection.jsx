import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

export default function CountdownSection({ data }) {
  const { targetDate, title } = data.countdown;
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  const timeBoxes = [
    { label: 'Hari', value: days },
    { label: 'Jam', value: hours },
    { label: 'Menit', value: minutes },
    { label: 'Detik', value: seconds },
  ];

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-5 pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-surface flex flex-col items-center justify-center text-center relative select-none">
      {/* Subtle monochrome background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center my-auto">
        <span 
          className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-1.5"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          Save The Date
        </span>
        <h2 
          className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6"
          data-aos="fade-down"
          data-aos-duration="700"
        >
          {title}
        </h2>

        {isExpired ? (
          <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/25 text-white text-xs font-medium animate-pulse">
            Alhamdulillah, Acara Telah Berlangsung
          </div>
        ) : (
          <div 
            className="grid grid-cols-4 gap-2 w-full max-w-xs mb-6"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            {timeBoxes.map((box, i) => (
              <div 
                key={i}
                className="flex flex-col items-center justify-center py-3 px-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg"
              >
                <span className="font-serif text-2xl font-bold text-white leading-tight">
                  {String(box.value).padStart(2, '0')}
                </span>
                <span className="text-[9.5px] uppercase font-medium text-neutral-300 tracking-wider mt-1">
                  {box.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="w-14 h-px bg-neutral-700 mb-3" data-aos="zoom-in" data-aos-duration="500" />

        <p 
          className="text-[11.5px] text-neutral-300 max-w-xs font-light leading-relaxed"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          Kami menantikan kehadiran dan doa restu Anda di hari penuh keberkahan ini.
        </p>
      </div>
    </div>
  );
}
