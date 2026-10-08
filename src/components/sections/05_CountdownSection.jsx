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
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-5 pb-24 bg-slate-900 text-white flex flex-col items-center justify-center text-center relative animate-fade-in select-none">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center my-auto">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-amber-300 mb-1.5">
          Save The Date
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
          {title}
        </h2>

        {isExpired ? (
          <div className="px-5 py-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-medium animate-pulse">
            Alhamdulillah, Acara Telah Berlangsung
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 w-full max-w-xs mb-6">
            {timeBoxes.map((box, i) => (
              <div 
                key={i}
                className="flex flex-col items-center justify-center py-3 px-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg"
              >
                <span className="font-serif text-2xl font-bold text-amber-300 leading-tight">
                  {String(box.value).padStart(2, '0')}
                </span>
                <span className="text-[9.5px] uppercase font-medium text-stone-300 tracking-wider mt-1">
                  {box.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="w-14 h-px bg-stone-700 mb-3" />

        <p className="text-[11.5px] text-stone-300 max-w-xs font-light leading-relaxed">
          Kami menantikan kehadiran dan doa restu Anda di hari penuh keberkahan ini.
        </p>
      </div>
    </div>
  );
}
