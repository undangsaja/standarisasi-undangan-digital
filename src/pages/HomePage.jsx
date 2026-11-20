import React from 'react';
import { SiteHeader, SectionHead, useReveal } from '../components/layout/SiteChrome';
import RedElegantDefs from '../components/ornaments/RedElegantDefs';
import { TEMPLATES } from '../data/templates';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'templates', label: 'Templates' },
  { id: 'create', label: 'Create' },
];

const FEATURES = [
  {
    n: '01',
    title: 'Katalog Template',
    text: 'Pilih dari koleksi template yang terus bertambah — setiap desain punya karakter dan palet sendiri.',
  },
  {
    n: '02',
    title: 'Editor Cepat',
    text: 'Isi data mempelai, tanggal, dan acara lewat form ringan. Tidak perlu skill desain.',
  },
  {
    n: '03',
    title: 'Kartu Beranimasi',
    text: 'Opening veil, reveal on scroll, countdown, galeri, RSVP — pengalaman undangan yang hidup.',
  },
  {
    n: '04',
    title: 'Mobile-First',
    text: 'Dibuat untuk dibuka lewat WhatsApp di ponsel, tetap nyaman di desktop.',
  },
];

const ROADMAP = [
  { label: 'Red Elegants', status: 'live', note: 'Sudah tersedia' },
  { label: 'Ivory Gold Botanical', status: 'live', note: 'Sudah tersedia' },
  { label: 'Minimal Monochrome', status: 'soon', note: 'Segera hadir' },
  { label: 'Nusantara Klasik', status: 'soon', note: 'Segera hadir' },
  { label: 'Floral Soft Pastel', status: 'soon', note: 'Segera hadir' },
  { label: 'Night Luxe', status: 'soon', note: 'Segera hadir' },
];

export default function HomePage({ onNavigate }) {
  const rootRef = useReveal([]);

  return (
    <div ref={rootRef} className="relative min-h-dvh">
      <RedElegantDefs />
      <SiteHeader
        nav={NAV}
        active="home"
        onNavigate={onNavigate}
        right={
          <button type="button" className="btn-outline" onClick={() => onNavigate('templates')}>
            Lihat Template
          </button>
        }
      />

      {/* Hero — product pitch, not a single template showcase */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="reveal inline-flex items-center gap-3 border border-line px-4 py-2 rounded-full bg-cream/70">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse-soft" />
                <span className="text-[10px] tracking-[.28em] uppercase text-gold-deep">
                  Platform Undangan Digital
                </span>
              </div>

              <h1
                className="reveal font-display font-normal text-[clamp(40px,7vw,72px)] leading-[1.05] text-ink-deep mt-7"
                style={{ '--d': '.08s' }}
              >
                Standarisasi undangan
                <br />
                <span className="shimmer-text">digital</span> yang{' '}
                <em className="font-script text-gold not-italic text-[1.15em]">berkelas</em>
              </h1>

              <p
                className="reveal font-display text-[clamp(17px,2.2vw,21px)] leading-[1.85] font-light text-ink-soft mt-6 max-w-[36ch] mx-auto lg:mx-0"
                style={{ '--d': '.16s' }}
              >
                Satu tempat untuk memilih template, mengisi data pernikahan, dan membagikan
                kartu undangan beranimasi — siap pakai, konsisten, dan elegan.
              </p>

              <div
                className="reveal flex flex-wrap gap-3 justify-center lg:justify-start mt-9"
                style={{ '--d': '.24s' }}
              >
                <button type="button" className="btn-gold" onClick={() => onNavigate('create')}>
                  Buat Undangan
                </button>
                <button type="button" className="btn-outline" onClick={() => onNavigate('templates')}>
                  Jelajahi Template
                </button>
              </div>

              <div
                className="reveal flex flex-wrap gap-8 justify-center lg:justify-start mt-10 pt-8 border-t border-line"
                style={{ '--d': '.32s' }}
              >
                {[
                  ['2', 'Template live'],
                  ['4+', 'Di roadmap'],
                  ['9', 'Seksi standar'],
                ].map(([num, lab]) => (
                  <div key={lab} className="text-center lg:text-left">
                    <div className="font-display text-3xl md:text-4xl text-ink-deep">{num}</div>
                    <div className="text-[10px] tracking-[.24em] uppercase text-ink-soft mt-1.5">
                      {lab}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product preview — stacked template cards, not one arch hero */}
            <div className="relative reveal" style={{ '--d': '.18s' }}>
              <div className="relative mx-auto max-w-[480px]">
                {/* Back card */}
                <div className="absolute -top-6 left-6 right-6 h-[420px] md:h-[460px] bg-ivory-300 border border-line rotate-[-4deg] shadow-[0_18px_40px_rgba(120,92,48,.12)]" />
                <div className="absolute -top-3 left-3 right-3 h-[420px] md:h-[460px] bg-ivory-100 border border-gold/25 rotate-[-1.5deg] shadow-[0_18px_40px_rgba(120,92,48,.12)]" />

                {/* Front product card */}
                <div className="relative bg-gradient-to-b from-ivory-50 to-ivory-300 border border-gold/45 shadow-[0_30px_70px_rgba(120,92,48,.18)] overflow-hidden">
                  <div className="absolute inset-3 border border-gold/25 pointer-events-none z-10" />

                  {/* Mini template strip */}
                  <div className="relative h-[280px] md:h-[300px] overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="relative border-r border-gold/20 bg-gradient-to-br from-ivory-50 to-ivory-400">
                        <svg className="absolute -top-3 -left-4 w-[90%] opacity-90" viewBox="0 0 480 360">
                          <use href="#cluster-a" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-6">
                          <svg className="w-12 h-12 animate-floaty" viewBox="0 0 160 160">
                            <use href="#monogram" />
                          </svg>
                          <p className="font-label text-[8px] tracking-[.4em] uppercase text-gold-deep mt-2">
                            Ivory Gold
                          </p>
                          <p className="font-display text-lg text-ink-deep mt-1">Botanical</p>
                        </div>
                      </div>
                      <div className="relative bg-gradient-to-br from-[#F7F7F7] to-[#E8E8E8]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                          <div className="w-12 h-12 rounded-full border-2 border-[#222] grid place-items-center font-display italic text-xl">
                            M
                          </div>
                          <p className="font-label text-[8px] tracking-[.4em] uppercase text-[#555] mt-2">
                            Monochrome
                          </p>
                          <p className="font-display text-lg text-[#1a1a1a] mt-1">Elegance</p>
                          <span className="mt-3 text-[8px] tracking-[.2em] uppercase border border-[#999] px-2 py-1 text-[#555]">
                            Soon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative px-6 py-5 bg-cream/90 border-t border-gold/25">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-label text-[11px] tracking-[.22em] uppercase text-ink">
                          Template Gallery
                        </p>
                        <p className="text-[11px] text-ink-soft mt-1">
                          Koleksi yang terus bertambah
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-[9px] tracking-[.22em] uppercase border border-gold text-gold-deep px-3 py-2 hover:bg-gold hover:text-cream transition"
                        onClick={() => onNavigate('templates')}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating tags */}
              <span className="hidden md:block absolute -left-4 top-24 bg-cream border border-line px-3 py-2 text-[9px] tracking-[.2em] uppercase text-gold-deep shadow-sm">
                9 seksi
              </span>
              <span className="hidden md:block absolute -right-3 bottom-28 bg-cream border border-line px-3 py-2 text-[9px] tracking-[.2em] uppercase text-gold-deep shadow-sm">
                Animasi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — product flow */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="mx-auto max-w-[1120px]">
          <SectionHead
            eyebrow="Alur Produk"
            title={
              <>
                Dari template ke <em>hari bahagia</em>
              </>
            }
            lead="Alur standar yang sama untuk semua template — cukup ganti gaya, isi data, lalu bagikan."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[
              {
                step: '1',
                title: 'Pilih Template',
                text: 'Buka katalog. Mulai dari yang sudah live, atau tunggu koleksi berikutnya.',
                action: 'templates',
                label: 'Buka Katalog',
              },
              {
                step: '2',
                title: 'Isi & Sesuaikan',
                text: 'Form ringan untuk nama, tanggal, venue, dan rundown acara.',
                action: 'create',
                label: 'Mulai Isi',
              },
              {
                step: '3',
                title: 'Bagikan Kartu',
                text: 'Pratinjau animasi penuh, lalu kirim tautan ke tamu undangan.',
                action: 'invitation',
                label: 'Lihat Contoh',
              },
            ].map((s, i) => (
              <article
                key={s.step}
                className="card-ivory reveal p-8 flex flex-col"
                style={{ '--d': `${i * 0.1}s` }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl text-gold/40">0{s.step}</span>
                  <svg width="48" height="16" viewBox="0 0 340 20" className="opacity-70">
                    <use href="#div-line" />
                  </svg>
                </div>
                <h3 className="font-display text-[28px] mt-5 text-ink-deep">{s.title}</h3>
                <p className="font-display text-[17px] leading-[1.8] text-ink-soft mt-3 flex-1">
                  {s.text}
                </p>
                <button
                  type="button"
                  className="mt-6 self-start text-[10.5px] tracking-[.3em] uppercase text-gold-deep border border-gold px-5 py-3 rounded-full hover:bg-gold hover:text-cream transition"
                  onClick={() => onNavigate(s.action)}
                >
                  {s.label}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Template roadmap — multi-template future */}
      <section className="px-6 py-20 md:py-28 border-t border-line bg-gradient-to-b from-ivory-50/80 to-ivory-200/40">
        <div className="mx-auto max-w-[1120px]">
          <SectionHead
            eyebrow="Koleksi"
            title={
              <>
                Banyak template, <em>satu</em> alur
              </>
            }
            lead="Home ini netral — setiap template akan punya gaya visualnya sendiri di halaman katalog."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {ROADMAP.map((t, i) => (
              <div
                key={t.label}
                className={`reveal relative border p-5 transition ${
                  t.status === 'live'
                    ? 'border-gold bg-cream shadow-[0_16px_40px_rgba(120,92,48,.12)]'
                    : 'border-line bg-ivory-50/70'
                }`}
                style={{ '--d': `${i * 0.06}s` }}
              >
                {t.status === 'live' && (
                  <span className="absolute top-3 right-3 text-[9px] tracking-[.2em] uppercase bg-gold-deep text-cream px-2.5 py-1">
                    Live
                  </span>
                )}
                {t.status === 'soon' && (
                  <span className="absolute top-3 right-3 text-[9px] tracking-[.2em] uppercase border border-line text-ink-soft px-2.5 py-1">
                    Soon
                  </span>
                )}
                <div className="h-20 mb-4 border border-line/60 bg-gradient-to-br from-ivory-100 to-ivory-400 flex items-center justify-center">
                  {t.status === 'live' ? (
                    t.label.includes('Red') ? (
                      <svg width="40" height="40" viewBox="0 0 160 160">
                        <use href="#re-monogram" />
                      </svg>
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 160 160">
                        <use href="#monogram" />
                      </svg>
                    )
                  ) : (
                    <span className="font-display italic text-2xl text-ink-soft/40">?</span>
                  )}
                </div>
                <h3 className="font-label text-[12px] tracking-[.18em] uppercase text-ink">
                  {t.label}
                </h3>
                <p className="text-[12px] text-ink-soft mt-1.5">{t.note}</p>
                {t.status === 'live' && (
                  <button
                    type="button"
                    className="mt-4 text-[10px] tracking-[.24em] uppercase text-gold-deep border border-gold px-3 py-2 hover:bg-gold hover:text-cream transition"
                    onClick={() => onNavigate('templates')}
                  >
                    Pilih
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:py-28 border-t border-line">
        <div className="mx-auto max-w-[1120px]">
          <SectionHead
            eyebrow="Fitur"
            title={
              <>
                Yang selalu ada di <em>setiap</em> undangan
              </>
            }
          />

          <div className="grid sm:grid-cols-2 gap-5 mt-12">
            {FEATURES.map((f, i) => (
              <article
                key={f.n}
                className="reveal flex gap-5 p-6 md:p-7 border border-line bg-cream/60 hover:border-gold/50 transition"
                style={{ '--d': `${i * 0.08}s` }}
              >
                <span className="font-display text-3xl text-gold/50 leading-none shrink-0">
                  {f.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink-deep">{f.title}</h3>
                  <p className="font-display text-[16.5px] leading-[1.75] text-ink-soft mt-2">
                    {f.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center border-t border-line">
        <div className="mx-auto max-w-[640px]">
          <svg width="80" height="48" viewBox="0 0 132 78" className="mx-auto mb-6" aria-hidden="true">
            <use href="#rings" />
          </svg>
          <p className="font-display italic text-[clamp(20px,3.4vw,28px)] text-ink-soft reveal">
            Siap mencoba alurnya?
          </p>
          <h2
            className="font-display text-[clamp(32px,5vw,52px)] mt-4 text-ink-deep reveal"
            style={{ '--d': '.1s' }}
          >
            Mulai dari template pertama
          </h2>
          <div className="divider-diamond mt-8 reveal" style={{ '--d': '.18s' }}>
            <span className="line" />
            <span className="dia sm" />
            <span className="dia" />
            <span className="dia sm" />
            <span className="line" />
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-10 reveal" style={{ '--d': '.26s' }}>
            <button type="button" className="btn-gold" onClick={() => onNavigate('templates')}>
              Pilih Template
            </button>
            <button type="button" className="btn-outline" onClick={() => onNavigate('create')}>
              Langsung Buat
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-14 text-center">
        <p className="font-display italic text-lg text-ink-soft">
          Satu platform, banyak gaya undangan.
        </p>
        <p className="text-[10px] tracking-[.32em] uppercase text-gold-deep mt-4">
          Undangaja · Standarisasi Undangan Digital
        </p>
      </footer>
    </div>
  );
}
