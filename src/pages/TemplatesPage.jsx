import React from 'react';
import { SiteHeader, SectionHead, useReveal } from '../components/layout/SiteChrome';
import RedElegantDefs from '../components/ornaments/RedElegantDefs';
import CherryBlossomDefs from '../components/ornaments/CherryBlossomDefs';
import { TEMPLATES, isRedElegants, isCherryBlossom } from '../data/templates';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'templates', label: 'Templates' },
  { id: 'create', label: 'Create' },
];

export default function TemplatesPage({ onNavigate, selectedTemplate, onSelectTemplate }) {
  const rootRef = useReveal([]);
  const active = selectedTemplate || TEMPLATES[0]?.id;

  return (
    <div ref={rootRef} className="relative min-h-dvh">
      <SiteHeader
        nav={NAV}
        active="templates"
        onNavigate={onNavigate}
        right={
          <button type="button" className="btn-outline" onClick={() => onNavigate('create')}>
            Lanjut Buat
          </button>
        }
      />

      <section className="px-6 pt-14 pb-28">
        <div className="mx-auto max-w-[1120px]">
          <SectionHead
            eyebrow="01 — Koleksi"
            title={
              <>
                Pilih <em>template</em> undangan
              </>
            }
            lead="Koleksi template berbasis SVG murni — tajam dari layar ponsel hingga spanduk cetak. Tiga template siap pakai, sisanya menyusul."
          />

          <RedElegantDefs />
          <CherryBlossomDefs />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {TEMPLATES.map((t, i) => {
              const selected = active === t.id;
              const isLive = t.status === 'active';
              const isRed = isRedElegants(t.id);
              const isCherry = isCherryBlossom(t.id);
              return (
                <article
                  key={t.id}
                  className={`card-ivory reveal p-6 md:p-7 flex flex-col ${isLive ? 'cursor-pointer' : 'opacity-85'} ${selected && isLive ? 'border-gold shadow-[0_0_0_1px_#B08B4E,0_26px_48px_rgba(126,94,44,.18)]' : ''}`}
                  style={{ '--d': `${i * 0.08}s` }}
                  onClick={() => isLive && onSelectTemplate?.(t.id)}
                  role={isLive ? 'button' : undefined}
                  tabIndex={isLive ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isLive && (e.key === 'Enter' || e.key === ' ') ) {
                      e.preventDefault();
                      onSelectTemplate?.(t.id);
                    }
                  }}
                >
                  {/* Mini preview */}
                  <div
                    className="relative rounded-sm overflow-hidden border h-[240px] md:h-[280px] flex items-center justify-center"
                    style={{
                      background: isRed
                        ? 'linear-gradient(160deg,#7c1220,#4a0a12)'
                        : isCherry
                          ? 'linear-gradient(165deg,#FFF8FA,#FDEDF2)'
                          : isLive
                            ? 'linear-gradient(to bottom, #FBF4E8, #E9D9BD)'
                            : `linear-gradient(135deg, ${t.palette[0]}, ${t.palette[3] || t.palette[1]})`,
                      borderColor: isRed
                        ? 'rgba(185,138,53,.45)'
                        : isCherry
                          ? 'rgba(208,105,130,.4)'
                          : undefined,
                    }}
                  >
                    {isCherry ? (
                      <>
                        <img
                          src="/ornaments/cherry-branch.svg"
                          alt=""
                          aria-hidden="true"
                          className="absolute -top-4 -left-10 w-[64%] max-w-none pointer-events-none select-none opacity-95"
                        />
                        <img
                          src="/ornaments/cherry-branch.svg"
                          alt=""
                          aria-hidden="true"
                          className="absolute -bottom-5 -right-10 w-[58%] max-w-none pointer-events-none select-none opacity-90 scale-[-1,-1]"
                        />
                        <div className="relative z-10 flex flex-col items-center text-center px-8">
                          <div className="relative w-16 h-16 animate-floaty">
                            <svg className="w-16 h-16" viewBox="0 0 160 160">
                              <use href="#cb-monogram" />
                            </svg>
                            <span
                              className="absolute inset-0 grid place-items-center text-[26px] leading-none text-[#A84A66] pb-1"
                              style={{ fontFamily: "'Parisienne', cursive" }}
                            >
                              &amp;
                            </span>
                          </div>
                          <div
                            className="text-[10px] tracking-[.45em] uppercase text-[#A84A66] mt-3"
                            style={{ fontFamily: 'Jost, sans-serif' }}
                          >
                            The Wedding Of
                          </div>
                          <div
                            className="text-2xl md:text-3xl text-[#4A3038] mt-2 leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                          >
                            {t.name.split(' ')[0]}
                          </div>
                          <div
                            className="text-xl text-[#D06982] my-0.5"
                            style={{ fontFamily: "'Parisienne', cursive" }}
                          >
                            &amp;
                          </div>
                          <div
                            className="text-2xl md:text-3xl text-[#4A3038] leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                          >
                            {t.name.split(' ').slice(1).join(' ') || 'Template'}
                          </div>
                          <div className="flex gap-2 mt-4">
                            {t.palette.map((c) => (
                              <span
                                key={c}
                                className="w-3.5 h-3.5 rounded-full border border-[#D06982]/35"
                                style={{ background: c }}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    ) : isRed ? (
                      <div className="relative z-10 flex flex-col items-center text-center px-6 text-[#f6e8ce]">
                        <svg className="w-14 h-14 mb-3" viewBox="0 0 160 160">
                          <use href="#re-monogram" />
                        </svg>
                        <p className="font-mono text-[9px] tracking-[.4em] uppercase text-[#e9cb8c]">
                          Velvet &amp; Gold
                        </p>
                        <p className="text-xl mt-2 tracking-[.12em] font-semibold text-[#f2e3c8]" style={{ fontFamily: 'Cinzel, serif' }}>
                          Red Elegants
                        </p>
                        <div className="flex gap-2 mt-4">
                          {t.palette.map((c) => (
                            <span key={c} className="w-3.5 h-3.5 rounded-full border border-[#e9cb8c]/40" style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                    ) : isLive ? (
                      <>
                        <svg className="corner absolute -top-4 -left-6 w-[55%] pointer-events-none opacity-95" viewBox="0 0 480 360">
                          <use href="#cluster-a" />
                        </svg>
                        <svg className="corner absolute -bottom-5 -right-5 w-[50%] pointer-events-none opacity-95 scale-[-1,-1]" viewBox="0 0 480 360">
                          <use href="#cluster-a" />
                        </svg>
                        <div className="relative z-10 flex flex-col items-center text-center px-8">
                          <svg className="w-16 h-16 animate-floaty" viewBox="0 0 160 160">
                            <use href="#monogram" />
                          </svg>
                          <div className="font-label text-[10px] tracking-[.45em] uppercase text-gold-deep mt-3">
                            The Wedding Of
                          </div>
                          <div className="font-display text-2xl md:text-3xl text-ink-deep mt-2 leading-tight">
                            {t.name.split(' ')[0]}
                          </div>
                          <div className="font-display italic text-gold text-xl">&amp;</div>
                          <div className="font-display text-2xl md:text-3xl text-ink-deep leading-tight">
                            {t.name.split(' ').slice(1).join(' ') || 'Template'}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center text-center px-6">
                        <div className="w-14 h-14 rounded-full border-2 border-ink/20 grid place-items-center font-display italic text-2xl text-ink/50">
                          ?
                        </div>
                        <p className="font-label text-[11px] tracking-[.28em] uppercase mt-4 text-ink/70">
                          Coming Soon
                        </p>
                        <p className="font-display text-xl mt-2 text-ink/80">{t.name}</p>
                        <div className="flex gap-2 mt-4">
                          {t.palette.map((c) => (
                            <span key={c} className="w-3.5 h-3.5 rounded-full border border-white/50" style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                    )}
                    {selected && isLive && (
                      <span className="absolute top-3 right-3 z-20 bg-gold-deep text-cream text-[9px] tracking-[.28em] uppercase px-3 py-1.5 rounded-full">
                        Terpilih
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-label text-[13px] tracking-[.2em] uppercase text-ink">
                          {t.name}
                        </h3>
                        <p className="text-[11px] tracking-[.18em] uppercase text-ink-soft mt-1.5">
                          {t.tagline}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] tracking-[.24em] uppercase px-2.5 py-1 border ${
                          t.status === 'active'
                            ? 'border-sage text-sage-deep'
                            : 'border-line text-ink-soft'
                        }`}
                      >
                        {t.status === 'active' ? 'Live' : 'Soon'}
                      </span>
                    </div>

                    <p className="font-display text-[16.5px] leading-[1.75] text-ink-soft mt-3">
                      {t.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {t.features.map((f) => (
                        <li
                          key={f}
                          className="text-[10px] tracking-[.16em] uppercase text-gold-deep border border-line px-2.5 py-1"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex gap-3">
                      {isLive ? (
                        <>
                          <button
                            type="button"
                            className="btn-gold flex-1 !py-3.5 !text-[10px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTemplate?.(t.id);
                              onNavigate('create');
                            }}
                          >
                            Gunakan Template
                          </button>
                          <button
                            type="button"
                            className="btn-outline !py-3.5 !text-[10px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTemplate?.(t.id);
                              onNavigate('invitation');
                            }}
                          >
                            Preview
                          </button>
                        </>
                      ) : (
                        <span className="flex-1 text-center py-3.5 px-3 border border-line text-[10px] tracking-[.24em] uppercase text-ink-soft">
                          Segera Hadir
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 text-center reveal">
            <p className="font-display italic text-lg text-ink-soft">
              Tiga template live hari ini — yang lain menyusul dengan gaya berbeda.
            </p>
            <div className="divider-diamond mt-6">
              <span className="line" />
              <span className="dia sm" />
              <span className="dia" />
              <span className="dia sm" />
              <span className="line" />
            </div>
            <button type="button" className="btn-outline mt-8" onClick={() => onNavigate('home')}>
              Kembali ke Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
