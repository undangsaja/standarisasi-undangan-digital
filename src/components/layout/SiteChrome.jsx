import React from 'react';
import OrnamentDefs from '../ornaments/OrnamentDefs';
import { useReveal, useCountdown } from '../../hooks/useReveal';

export { useReveal, useCountdown };

/** Fixed botanical background pattern + paper grain. */
export function PageAtmosphere() {
  return (
    <>
      <div className="paper-grain" aria-hidden="true" />
      <svg className="botanical-bg" aria-hidden="true">
        <defs>
          <pattern id="pat" width="360" height="240" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <use href="#bg-leaf" x="10" y="20" width="180" height="108" />
            <use href="#bg-leaf" x="190" y="130" width="150" height="90" transform="rotate(180 265 175)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pat)" />
      </svg>
    </>
  );
}

/** Shared top bar for marketing / builder pages. */
export function SiteHeader({ nav = [], active, onNavigate, right }) {
  return (
    <header className="relative z-20 border-t-2 border-gold">
      <div className="mx-auto max-w-[1180px] px-6 pt-5 pb-4 flex items-center justify-between gap-5 flex-wrap">
        <button
          type="button"
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-3.5 text-left group"
        >
          <span className="w-11 h-11 rounded-full border border-gold grid place-items-center font-display italic text-gold-deep text-xl transition group-hover:bg-gold group-hover:text-cream">
            U
          </span>
          <span>
            <span className="block font-label text-[15px] tracking-[.34em] uppercase text-ink">
              Undangaja
            </span>
            <span className="block text-[11px] tracking-[.22em] uppercase text-ink-soft mt-1">
              Standarisasi Undangan Digital
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              className={`text-[11px] tracking-[.22em] uppercase pb-1 border-b transition ${
                active === item.id
                  ? 'text-gold-deep border-gold'
                  : 'text-ink-soft border-transparent hover:text-gold-deep hover:border-gold hover:tracking-[.28em]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {right}
      </div>
    </header>
  );
}

/** Section heading block (eyebrow + title + lead). */
export function SectionHead({ eyebrow, title, lead, className = '' }) {
  return (
    <div className={`text-center max-w-[680px] mx-auto ${className}`}>
      {eyebrow && <p className="sec-eyebrow reveal">{eyebrow}</p>}
      {title && (
        <h2 className="sec-title reveal" style={{ '--d': '.08s' }}>
          {title}
        </h2>
      )}
      {lead && (
        <p
          className="reveal mt-5 font-display text-[17px] md:text-[19px] leading-[1.85] font-light text-ink-soft"
          style={{ '--d': '.16s' }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Soft falling petals overlay. */
export function Petals({ count = 16 }) {
  const petals = React.useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 9 + Math.random() * 15,
      drift: Math.random() * 220 - 110,
      spin: Math.random() * 900 - 450,
      duration: 11 + Math.random() * 13,
      delay: -Math.random() * 18,
      radius: `${60 + Math.random() * 30}% ${10 + Math.random() * 20}% ${60 + Math.random() * 30}% ${10 + Math.random() * 20}%`,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size * 0.9,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            borderRadius: p.radius,
          }}
        />
      ))}
    </div>
  );
}

/** Simple toast. */
export function Toast({ show, children }) {
  if (!show) return null;
  return (
    <div className="fixed left-1/2 top-7 -translate-x-1/2 z-[100] bg-gold-deep text-cream px-7 py-3.5 rounded-full text-[11px] tracking-[.26em] uppercase shadow-[0_20px_44px_rgba(120,92,54,.34)]">
      {children}
    </div>
  );
}

export function OrnamentLayer() {
  return (
    <>
      <OrnamentDefs />
      <PageAtmosphere />
    </>
  );
}

export default SiteHeader;
