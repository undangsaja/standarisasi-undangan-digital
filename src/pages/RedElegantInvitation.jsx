import React, { useEffect, useMemo, useState } from 'react';
import { useReveal, useCountdown, Toast } from '../components/layout/SiteChrome';
import RedElegantDefs from '../components/ornaments/RedElegantDefs';
import { DEFAULT_DRAFT } from '../data/templates';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'templates', label: 'Templates' },
  { id: 'create', label: 'Create' },
];

const RE_CSS = `
  .re-page {
    --re-bg:#f3e6d0; --re-bg2:#ece0c6; --re-card:#fdf5e6; --re-card2:#f6e8ce;
    --re-ink:#2b1512; --re-muted:#86654f; --re-wine:#7c1220; --re-wine-dk:#4a0a12;
    --re-gold:#b98a35; --re-gold-lt:#e9cb8c; --re-gold-dk:#8a5f1c;
    --re-line:rgba(138,95,28,.32);
    --re-shadow:0 30px 60px -40px rgba(74,10,18,.55);
    background:
      radial-gradient(ellipse at 15% 0%, rgba(185,138,53,.13), transparent 55%),
      radial-gradient(ellipse at 85% 100%, rgba(124,18,32,.12), transparent 55%),
      var(--re-bg);
    color:var(--re-ink);
    font-family:'Cormorant Garamond',Georgia,serif;
    transition: background .6s ease, color .6s ease;
    min-height:100dvh;
  }
  .re-page.night {
    --re-bg:#25080d; --re-bg2:#2e0b11; --re-card:#3a0e16; --re-card2:#48121c;
    --re-ink:#f2e3c8; --re-muted:#c09a76;
    --re-line:rgba(233,203,140,.28);
    --re-shadow:0 30px 70px -40px rgba(0,0,0,.9);
    --re-wine:#e9cb8c;
    --re-title:#f2e3c8;
  }
  .re-page:not(.night) { --re-title:#7c1220; }
  .re-title { color: var(--re-title, #7c1220); }
  .re-damask-bg {
    position:fixed; inset:0; z-index:0; pointer-events:none; opacity:.75;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23b98a35' stroke-opacity='0.13' stroke-width='1.1'%3E%3Cpath d='M70 14 C 86 32 102 38 102 60 C 102 80 84 90 70 80 C 56 90 38 80 38 60 C 38 38 54 32 70 14 Z'/%3E%3Cpath d='M70 34 C 80 46 88 50 88 60 C 88 72 78 78 70 72 C 62 78 52 72 52 60 C 52 50 60 46 70 34 Z'/%3E%3Cpath d='M0 70 C 14 70 18 62 18 54 M140 70 C 126 70 122 62 122 54 M70 140 C 70 126 78 122 86 122 M70 0 C 70 14 78 18 86 18'/%3E%3Ccircle cx='70' cy='96' r='2.6'/%3E%3Ccircle cx='24' cy='24' r='2.2'/%3E%3Ccircle cx='116' cy='116' r='2.2'/%3E%3C/g%3E%3C/svg%3E");
  }
  .re-grain {
    position:fixed; inset:0; z-index:50; pointer-events:none; mix-blend-mode:multiply; opacity:.05;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .re-eyebrow {
    font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.52em;
    text-transform:uppercase; color:var(--re-gold);
  }
  .re-display {
    font-family:'Cinzel',serif; font-weight:600; letter-spacing:.12em;
  }
  .re-script {
    font-family:'Great Vibes',cursive; color:var(--re-gold-dk); line-height:1;
  }
  .re-mono {
    font-family:'DM Mono',monospace;
  }
  .re-btn {
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    cursor:pointer;border:none;padding:15px 32px;border-radius:2px;
    font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;
    color:#f6e8ce;background:linear-gradient(120deg,var(--re-wine-dk),var(--re-wine) 45%,#a2182a 58%,var(--re-wine-dk));
    background-size:220% 100%;
    box-shadow:0 16px 36px rgba(74,10,18,.4);
    transition:transform .5s cubic-bezier(.2,.8,.25,1), box-shadow .5s, letter-spacing .5s;
    animation:reShine 5.5s linear infinite;
  }
  .re-btn:hover { transform:translateY(-3px); letter-spacing:.34em; box-shadow:0 22px 44px rgba(74,10,18,.5); }
  .re-btn-outline {
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    cursor:pointer;border:1px solid var(--re-gold);background:transparent;color:var(--re-gold-dk);
    padding:14px 28px;border-radius:2px;font-family:'DM Mono',monospace;font-size:10.5px;
    letter-spacing:.26em;text-transform:uppercase;transition:.4s cubic-bezier(.2,.8,.25,1);
  }
  .re-btn-outline:hover { background:var(--re-gold); color:#2b0a10; letter-spacing:.32em; }
  .re-card {
    background:linear-gradient(158deg,var(--re-card),var(--re-card2));
    border:1px solid var(--re-line); position:relative; box-shadow:var(--re-shadow);
  }
  .re-card::before {
    content:'';position:absolute;inset:8px;border:1px solid rgba(185,138,53,.22);pointer-events:none;
  }
  .re-reveal {
    opacity:0;transform:translateY(28px);
    transition:opacity .9s ease, transform .9s cubic-bezier(.2,.8,.25,1);
    transition-delay:var(--d,0s);
  }
  .re-reveal.in { opacity:1; transform:none; }
  .re-sec-head {
    display:flex;align-items:flex-end;gap:22px;margin-bottom:clamp(26px,4vw,46px);
  }
  .re-sec-num {
    font-family:'Cinzel',serif;font-size:clamp(2.4rem,6vw,4.2rem);line-height:.8;
    color:transparent;-webkit-text-stroke:1px var(--re-gold);opacity:.7;
  }
  .re-sec-head h2 {
    font-family:'Cinzel',serif;font-weight:600;font-size:clamp(1.15rem,2.6vw,1.72rem);
    letter-spacing:.26em;text-transform:uppercase;color:var(--re-ink);
  }
  .re-sec-head p {
    font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.24em;text-transform:uppercase;
    color:var(--re-muted);margin-top:9px;
  }
  .re-sec-rule { flex:1;height:1px;background:linear-gradient(90deg,var(--re-gold),transparent);margin-bottom:10px; }
  .re-field {
    width:100%;padding:13px 2px;background:transparent;border:none;
    border-bottom:1px solid var(--re-line);color:var(--re-ink);
    font-family:'Cormorant Garamond',serif;font-size:17px;outline:none;
    transition:border-color .4s;
  }
  .re-field:focus { border-color:var(--re-gold); }
  .re-label {
    display:block;font-family:'DM Mono',monospace;font-size:9.5px;letter-spacing:.3em;
    text-transform:uppercase;color:var(--re-gold);margin-bottom:8px;
  }
  @keyframes reShine { 0%{background-position:180% 0} 100%{background-position:-80% 0} }
  @keyframes reFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
  @keyframes reDraw { to { stroke-dashoffset:0 } }
  @keyframes reFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes rePetal {
    0%{opacity:0;transform:translate3d(0,-8vh,0) rotate(0)}
    10%{opacity:.9}
    90%{opacity:.55}
    100%{opacity:0;transform:translate3d(var(--drift,40px),110vh,0) rotate(var(--spin,360deg))}
  }
  .re-petal {
    position:absolute;top:-6vh;width:14px;height:14px;opacity:0;pointer-events:none;
    background:radial-gradient(circle at 35% 30%, #e0404c, #7c1220 70%);
    border-radius:80% 20% 70% 30%;
    box-shadow:0 2px 8px rgba(124,18,32,.25);
    animation:rePetal linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .re-reveal { opacity:1 !important; transform:none !important; }
    .re-petal { display:none; }
    .re-btn { animation:none; }
  }
`;

function useRevealRe(deps = []) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll('.re-reveal'));
    if (reduce) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const vh = window.innerHeight || 800;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );
    els.forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el);
    });
    const t = setTimeout(() => {
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < vh) el.classList.add('in');
      });
    }, 120);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

function Petals() {
  const petals = React.useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 12,
      drift: Math.random() * 180 - 90,
      spin: Math.random() * 720 - 360,
      duration: 10 + Math.random() * 12,
      delay: -Math.random() * 16,
    }));
  }, []);
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="re-petal"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size * 0.95,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function RedElegantInvitation({ onNavigate, draft }) {
  const data = useMemo(
    () => ({
      ...DEFAULT_DRAFT,
      ...(draft || {}),
      groom: { ...DEFAULT_DRAFT.groom, ...(draft?.groom || {}) },
      bride: { ...DEFAULT_DRAFT.bride, ...(draft?.bride || {}) },
      akad: { ...DEFAULT_DRAFT.akad, ...(draft?.akad || {}) },
      reception: { ...DEFAULT_DRAFT.reception, ...(draft?.reception || {}) },
      story: draft?.story?.length ? draft.story : DEFAULT_DRAFT.story,
      gallery: draft?.gallery?.length ? draft.gallery : DEFAULT_DRAFT.gallery,
    }),
    [draft]
  );

  const [unlocked, setUnlocked] = useState(false);
  const [night, setNight] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState('');
  const [wishes, setWishes] = useState([
    {
      name: 'Keluarga Wijaya',
      meta: 'Family · 1 Day Ago',
      text: 'Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Selamat menempuh hidup baru.',
    },
    {
      name: 'Andi & Partner',
      meta: 'College Friend · 3 Days Ago',
      text: 'What a beautiful beginning — wishing you both a lifetime of joy and gold-lined days.',
    },
  ]);
  const [rsvp, setRsvp] = useState({
    name: '',
    attend: 'Hadir',
    guests: '2 Tamu',
    msg: '',
  });
  const [showFloat, setShowFloat] = useState(false);

  const rootRef = useRevealRe([unlocked]);
  const countdown = useCountdown(data.date);

  useEffect(() => {
    if (unlocked) {
      document.body.classList.remove('locked');
      const t = setTimeout(() => setShowPetals(true), 500);
      return () => clearTimeout(t);
    }
    document.body.classList.add('locked');
    return () => document.body.classList.remove('locked');
  }, [unlocked]);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > window.innerHeight * 0.65);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const submitRsvp = (e) => {
    e.preventDefault();
    if (rsvp.name.trim().length < 2) {
      showToast('Mohon isi nama Anda');
      return;
    }
    setWishes((prev) => [
      {
        name: rsvp.name.trim(),
        meta: `${rsvp.attend} · ${rsvp.guests} · Baru saja`,
        text: rsvp.msg.trim() || 'Selamat untuk kedua mempelai!',
      },
      ...prev,
    ]);
    setRsvp({ name: '', attend: 'Hadir', guests: '2 Tamu', msg: '' });
    showToast('Terima kasih — RSVP terkirim');
  };

  const downloadIcs = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation Red Elegants//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:wedding-red-elegants@undangaja',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261223T030000Z',
      'DTEND:20261223T140000Z',
      `SUMMARY:Wedding of ${data.groom.short} & ${data.bride.short}`,
      `LOCATION:${data.venue}, ${data.city}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-red-elegants.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast('File kalender diunduh');
  };

  /* ---------- Opening: velvet curtain ---------- */
  const veil = (
    <div
      className={`fixed inset-0 z-[90] grid place-items-center transition-opacity duration-[1.1s] ${unlocked ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, rgba(253,245,230,.95), rgba(243,230,208,.97) 55%, rgba(214,180,130,.99)), #f3e6d0',
      }}
    >
      <RedElegantDefs />
      {/* velvet top swag */}
      <svg
        className="absolute top-0 left-0 w-full h-[min(28vh,200px)] pointer-events-none"
        viewBox="0 0 1200 190"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <use href="#re-swag" />
      </svg>
      {/* side curtains */}
      <svg
        className="absolute left-0 top-0 h-full w-[min(18vw,160px)] pointer-events-none opacity-95"
        viewBox="0 0 200 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <use href="#re-curtain" />
      </svg>
      <svg
        className="absolute right-0 top-0 h-full w-[min(18vw,160px)] pointer-events-none opacity-95 scale-x-[-1]"
        viewBox="0 0 200 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <use href="#re-curtain" />
      </svg>
      {/* bottom tassels */}
      <svg
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(280px,60vw)] pointer-events-none"
        viewBox="0 0 260 300"
        aria-hidden="true"
      >
        <use href="#re-tassel-pair" />
      </svg>

      <div className="relative z-10 text-center px-6 max-w-[560px] pb-16">
        <p
          className="re-eyebrow"
          style={{ animation: 'reFadeUp .9s .3s cubic-bezier(.2,.8,.25,1) both' }}
        >
          The Wedding Of
        </p>
        <div
          className="mx-auto mt-5 w-[130px] h-[130px]"
          style={{ animation: 'reFadeUp 1s .45s cubic-bezier(.2,.8,.25,1) both' }}
        >
          <svg viewBox="0 0 160 160" className="w-full h-full">
            <use href="#re-monogram" />
          </svg>
        </div>
        <h1
          className="re-display text-[clamp(34px,9vw,58px)] font-bold text-[#7c1220] mt-5 leading-[1.05]"
          style={{ animation: 'reFadeUp 1s .55s cubic-bezier(.2,.8,.25,1) both' }}
        >
          {data.groom.short}
        </h1>
        <p
          className="re-script text-[clamp(28px,6vw,42px)] text-[#8a5f1c] my-1"
          style={{ animation: 'reFadeUp 1s .7s cubic-bezier(.2,.8,.25,1) both' }}
        >
          &amp;
        </p>
        <h1
          className="re-display text-[clamp(34px,9vw,58px)] font-bold text-[#7c1220] leading-[1.05]"
          style={{ animation: 'reFadeUp 1s .8s cubic-bezier(.2,.8,.25,1) both' }}
        >
          {data.bride.short}
        </h1>
        <svg
          width="220"
          height="24"
          viewBox="0 0 520 90"
          className="mx-auto mt-5"
          style={{ animation: 'reFadeUp 1s .95s cubic-bezier(.2,.8,.25,1) both' }}
        >
          <use href="#re-div-fleuron" />
        </svg>
        <p
          className="re-mono text-[11px] tracking-[.36em] uppercase text-[#86654f] mt-4"
          style={{ animation: 'reFadeUp 1s 1.05s cubic-bezier(.2,.8,.25,1) both' }}
        >
          {data.dateLabel}
        </p>
        <p
          className="font-display italic text-[17px] text-[#86654f] mt-5"
          style={{ animation: 'reFadeUp 1s 1.15s cubic-bezier(.2,.8,.25,1) both' }}
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
          <strong className="block font-display not-italic font-semibold text-[#2b1512] mt-1.5 text-[1.15em]">
            Tamu Undangan
          </strong>
        </p>
        <button
          type="button"
          className="re-btn mt-8"
          style={{ animation: 'reFadeUp .9s 1.3s cubic-bezier(.2,.8,.25,1) both' }}
          onClick={() => {
            setUnlocked(true);
            window.scrollTo({ top: 0 });
          }}
        >
          Buka Undangan
        </button>
        <p
          className="re-mono text-[9px] tracking-[.3em] uppercase text-[#86654f]/70 mt-6"
          style={{ animation: 'reFadeUp 1s 1.45s cubic-bezier(.2,.8,.25,1) both' }}
        >
          Red Elegants · Velvet &amp; Gold
        </p>
      </div>

      <style>{`@keyframes reFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }`}</style>
    </div>
  );

  if (!unlocked) {
    return (
      <div className={`re-page min-h-dvh ${night ? 'night' : ''}`}>
        <style>{RE_CSS}</style>
        <div className="re-damask-bg" />
        <div className="re-grain" />
        {veil}
      </div>
    );
  }

  const initials = `${(data.groom.short || 'M')[0]}&${(data.bride.short || 'I')[0]}`;

  return (
    <div ref={rootRef} className={`re-page relative min-h-dvh ${night ? 'night' : ''}`}>
      <style>{RE_CSS}</style>
      <RedElegantDefs />
      <div className="re-damask-bg" />
      <div className="re-grain" />
      {showPetals && <Petals />}

      {toast && (
        <div className="fixed left-1/2 bottom-8 -translate-x-1/2 z-[99] bg-[#4a0a12] text-[#f6e8ce] border border-[#b98a35] font-mono text-[10px] tracking-[.26em] uppercase px-6 py-3.5 shadow-[0_20px_40px_rgba(0,0,0,.4)]">
          {toast}
        </div>
      )}

      {/* Sticky top */}
      <header
        className="sticky top-0 z-[60] border-b backdrop-blur-[10px]"
        style={{
          background: night ? 'rgba(37,8,13,.88)' : 'rgba(243,230,208,.88)',
          borderColor: night ? 'rgba(233,203,140,.28)' : 'rgba(138,95,28,.32)',
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-12 py-3.5 flex items-center justify-between gap-4">
          <button type="button" className="flex items-center gap-3 group" onClick={() => onNavigate('home')}>
            <span className="w-9 h-9 border border-[#b98a35] rounded-full grid place-items-center text-[#b98a35] font-[Cinzel] text-[14px]">
              R
            </span>
            <span className="text-left">
              <span className="block font-[Cinzel] font-semibold tracking-[.2em] text-[12px] uppercase" style={{ color: 'var(--re-ink)' }}>
                Red Elegants
              </span>
              <span className="block font-mono text-[9px] tracking-[.24em] uppercase" style={{ color: 'var(--re-muted)' }}>
                Velvet · Gold · MMXXVI
              </span>
            </span>
          </button>
          <nav className="hidden md:flex gap-6 font-mono text-[10px] tracking-[.22em] uppercase">
            {[
              ['countdown', 'Waktu'],
              ['couple', 'Mempelai'],
              ['story', 'Kisah'],
              ['events', 'Acara'],
              ['gallery', 'Galeri'],
              ['rsvp', 'RSVP'],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative pb-0.5 hover:text-[#7c1220] transition"
                style={{ color: 'var(--re-muted)' }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="re-btn-outline !py-2 !px-3 !text-[9px]"
              onClick={() => setNight((n) => !n)}
            >
              {night ? 'Mode Terang' : 'Mode Malam'}
            </button>
            <button type="button" className="re-btn-outline !py-2 !px-3 !text-[9px] hidden sm:inline-flex" onClick={() => onNavigate('create')}>
              Edit
            </button>
          </div>
        </div>
      </header>

      {/* HERO with velvet swag */}
      <section id="home" className="relative overflow-hidden pt-8 pb-20 px-5 md:px-12 text-center">
        <svg className="absolute top-0 left-0 w-full h-[min(32vh,240px)] pointer-events-none" viewBox="0 0 1200 190" preserveAspectRatio="none">
          <use href="#re-swag" />
        </svg>
        {/* floating tassels */}
        <svg className="absolute left-[6%] top-[18%] w-16 opacity-90 pointer-events-none animate-[reFloat_6s_ease-in-out_infinite]" viewBox="0 0 60 130">
          <use href="#re-tassel" />
        </svg>
        <svg className="absolute right-[6%] top-[22%] w-16 opacity-90 pointer-events-none animate-[reFloat_7s_ease-in-out_infinite]" viewBox="0 0 60 130">
          <use href="#re-tassel" />
        </svg>

        <div className="relative z-10 max-w-[820px] mx-auto pt-[min(12vh,100px)]">
          <div className="re-reveal w-[140px] h-[140px] mx-auto" style={{ '--d': '0.1s', animation: 'reFloat 7s ease-in-out infinite' }}>
            <svg viewBox="0 0 160 160" className="w-full h-full">
              <use href="#re-monogram" />
            </svg>
          </div>

          <p className="re-eyebrow re-reveal mt-6" style={{ '--d': '0.15s' }}>
            The Wedding Of
          </p>

          <h1
            className="re-reveal re-display font-bold text-[clamp(32px,7vw,72px)] re-title mt-4 leading-[1]"
            style={{ '--d': '0.22s' }}
          >
            {data.groom.fullName}
          </h1>

          <p className="re-reveal re-script text-[clamp(36px,6vw,56px)] my-2" style={{ '--d': '0.32s' }}>
            and
          </p>

          <h1
            className="re-reveal re-display font-bold text-[clamp(32px,7vw,72px)] re-title leading-[1]"
            style={{ '--d': '0.4s' }}
          >
            {data.bride.fullName}
          </h1>

          <svg width="min(420px,90%)" height="36" viewBox="0 0 520 90" className="mx-auto mt-6 re-reveal" style={{ '--d': '0.48s' }}>
            <use href="#re-div-fleuron" />
          </svg>

          <p
            className="re-reveal font-display italic font-light text-[clamp(16px,2.4vw,20px)] leading-[1.85] max-w-[520px] mx-auto mt-6"
            style={{ '--d': '0.55s', color: 'var(--re-muted)' }}
          >
            Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.
          </p>

          {/* meta strip */}
          <div
            className="re-reveal mt-10 border-y grid grid-cols-2 md:grid-cols-4 max-w-[760px] mx-auto"
            style={{ '--d': '0.62s', borderColor: 'var(--re-line)' }}
          >
            {[
              ['Hari', data.weekday],
              ['Tanggal', `${data.day} ${data.monthSide}`],
              ['Waktu', data.time.split('—')[0].trim()],
              ['Lokasi', `${data.city}`],
            ].map(([dt, dd], i) => (
              <div
                key={dt}
                className="py-4 px-3 border-r last:border-r-0 md:border-r"
                style={{ borderColor: 'var(--re-line)' }}
              >
                <div className="re-mono text-[9px] tracking-[.32em] uppercase" style={{ color: 'var(--re-gold)' }}>
                  {dt}
                </div>
                <div className="re-display text-[15px] tracking-[.1em] mt-1.5" style={{ color: 'var(--re-ink)' }}>
                  {dd}
                </div>
              </div>
            ))}
          </div>

          {/* damask band divider */}
          <div className="re-reveal mt-12 max-w-[900px] mx-auto" style={{ '--d': '0.7s' }}>
            <svg viewBox="0 0 1080 170" className="w-full h-auto">
              <rect width="1080" height="170" fill="url(#re-p-damask)" opacity=".55" />
              <rect x="0" y="0" width="1080" height="170" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="3" />
              <rect x="12" y="12" width="1056" height="146" fill="none" stroke="#e9cb8c" strokeWidth="1" opacity=".6" />
              <g transform="translate(540,85) scale(1.5) translate(-60,-45)">
                <use href="#re-fleuron" />
              </g>
              <g fill="url(#re-g-gold)">
                <circle cx="60" cy="85" r="5" />
                <circle cx="1020" cy="85" r="5" />
              </g>
            </svg>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-10 re-reveal" style={{ '--d': '0.78s' }}>
            <a href="#rsvp" className="re-btn">
              Konfirmasi Kehadiran
            </a>
            <button type="button" className="re-btn-outline" onClick={downloadIcs}>
              Simpan Tanggal
            </button>
          </div>
        </div>
      </section>

      {/* COUNTDOWN — wine band */}
      <section id="countdown" className="relative overflow-hidden py-16 md:py-20 px-5 md:px-12">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(115deg,#4a0a12,#7c1220 45%,#a2182a 58%,#4a0a12)' }}
        />
        <div className="absolute inset-0 opacity-25" style={{ background: 'url(#re-p-damask)', pointerEvents: 'none' }} />
        <div className="relative z-10 max-w-[880px] mx-auto text-center">
          <div className="re-reveal">
            <svg width="80" height="58" viewBox="0 0 120 90" className="mx-auto mb-4">
              <use href="#re-fleuron" />
            </svg>
            <h2 className="re-display text-[clamp(22px,4vw,36px)] font-semibold text-[#f2e3c8] tracking-[.12em]">
              MENUJU HARI BAHAGIA
            </h2>
            <p className="re-mono text-[10px] tracking-[.4em] uppercase text-[#e9cb8c]/85 mt-3">Save The Date</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-9">
            {[
              [countdown.d, 'Hari'],
              [countdown.h, 'Jam'],
              [countdown.m, 'Menit'],
              [countdown.s, 'Detik'],
            ].map(([num, lab], i) => (
              <div
                key={lab}
                className="re-reveal border py-5 px-2"
                style={{
                  '--d': `${0.08 + i * 0.08}s`,
                  background: 'rgba(253,245,230,.08)',
                  borderColor: 'rgba(233,203,140,.35)',
                }}
              >
                <span className="block re-display text-[clamp(32px,7vw,56px)] leading-none text-[#f2e3c8] tabular-nums">
                  {num}
                </span>
                <span className="block re-mono mt-2.5 text-[10px] tracking-[.3em] uppercase text-[#e9cb8c]/85">
                  {lab}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUPLE */}
      <section id="couple" className="py-20 md:py-28 px-5 md:px-12 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="re-sec-head re-reveal">
            <div className="re-sec-num">I</div>
            <div>
              <h2>Mempelai</h2>
              <p>Bride &amp; Groom · Two Houses, One Vow</p>
            </div>
            <div className="re-sec-rule" />
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-10 items-center">
            {[
              {
                role: 'The Groom',
                name: data.groom.fullName,
                parents: data.groom.parents,
                photo: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80',
              },
              {
                role: 'The Bride',
                name: data.bride.fullName,
                parents: data.bride.parents,
                photo: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80',
              },
            ].map((p, idx) => (
              <React.Fragment key={p.role}>
                {idx === 1 && (
                  <div className="hidden md:block re-reveal text-center" style={{ '--d': '0.15s' }}>
                    <svg width="100" height="70" viewBox="0 0 120 90" className="mx-auto mb-3">
                      <use href="#re-fleuron" />
                    </svg>
                    <span className="re-script text-[64px] text-[var(--re-gold-dk)] block leading-none">&amp;</span>
                  </div>
                )}
                <div className={`re-reveal text-center ${idx === 0 ? '' : 'md:order-none'}`} style={{ '--d': `${0.1 + idx * 0.12}s` }}>
                  <div className="relative w-[min(300px,70vw)] mx-auto aspect-[4/5] mb-6 group">
                    <div
                      className="absolute inset-0 translate-x-3 translate-y-3 border-2"
                      style={{ borderColor: 'var(--re-gold)', background: 'var(--re-card)' }}
                    />
                    <div
                      className="absolute inset-0 overflow-hidden border-2 shadow-[var(--re-shadow)]"
                      style={{ borderColor: 'var(--re-gold)', background: 'var(--re-card2)' }}
                    >
                      <img
                        src={p.photo}
                        alt={p.role}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 saturate-[.85]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(124,18,32,.35))' }}
                      />
                    </div>
                    <svg className="absolute -top-3 -left-3 w-14 opacity-80" viewBox="0 0 80 80">
                      <use href="#re-tick" />
                    </svg>
                    <svg className="absolute -bottom-3 -right-3 w-14 opacity-80 rotate-180" viewBox="0 0 80 80">
                      <use href="#re-tick" />
                    </svg>
                  </div>
                  <p className="re-mono text-[9px] tracking-[.4em] uppercase" style={{ color: 'var(--re-gold)' }}>
                    {p.role}
                  </p>
                  <h3 className="re-display text-[clamp(22px,3.5vw,32px)] mt-2.5" style={{ color: 'var(--re-ink)' }}>
                    {p.name}
                  </h3>
                  <p className="font-display text-[16px] leading-[1.7] mt-3" style={{ color: 'var(--re-muted)' }}>
                    Putra/Putri dari
                    <strong className="block font-display font-semibold mt-0.5" style={{ color: 'var(--re-ink)' }}>
                      {p.parents}
                    </strong>
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* STORY with gold spine */}
      <section id="story" className="py-20 md:py-28 px-5 md:px-12 relative z-10" style={{ background: 'linear-gradient(180deg,transparent,rgba(236,224,198,.5),transparent)' }}>
        <div className="max-w-[760px] mx-auto">
          <div className="re-sec-head re-reveal">
            <div className="re-sec-num">II</div>
            <div>
              <h2>Kisah Kami</h2>
              <p>Our Journey · Written in Gold</p>
            </div>
            <div className="re-sec-rule" />
          </div>

          <div className="relative pl-10 md:pl-14">
            <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(180deg,transparent,var(--re-gold),transparent)' }} />
            {data.story.map((item, i) => (
              <div key={item.year} className="relative pb-10 re-reveal" style={{ '--d': `${i * 0.08}s` }}>
                <span
                  className="absolute -left-10 md:-left-14 top-2 w-3.5 h-3.5 rotate-45 border"
                  style={{ background: 'var(--re-card)', borderColor: 'var(--re-gold)' }}
                />
                <p className="re-mono text-[11px] tracking-[.36em] uppercase" style={{ color: 'var(--re-gold)' }}>
                  {item.year}
                </p>
                <h3 className="re-display text-[clamp(18px,3vw,26px)] mt-2.5 mb-2.5" style={{ color: 'var(--re-ink)' }}>
                  {item.title}
                </h3>
                <p className="font-display text-[17px] leading-[1.9] font-light" style={{ color: 'var(--re-muted)' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-20 md:py-28 px-5 md:px-12 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="re-sec-head re-reveal">
            <div className="re-sec-num">III</div>
            <div>
              <h2>Rangkaian Acara</h2>
              <p>Wedding Events · Akad &amp; Resepsi</p>
            </div>
            <div className="re-sec-rule" />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[data.akad, data.reception, {
              title: 'Wedding Blessing',
              time: 'Kamis, 24 December 2026 · 09.00 AM',
              place: 'Family Residence',
              address: data.venue,
              maps: data.akad.maps,
            }].map((ev, i) => (
              <article
                key={ev.title}
                className="re-reveal re-card p-7 md:p-8 text-center group hover:-translate-y-2 transition-transform duration-500"
                style={{ '--d': `${0.08 + i * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-5 grid place-items-center border" style={{ borderColor: 'var(--re-line)', background: 'rgba(185,138,53,.1)' }}>
                  <svg width="26" height="26" viewBox="0 0 48 48">
                    <use href={i === 0 ? '#re-ico-cal' : i === 1 ? '#re-rings' : '#re-fleuron'} />
                  </svg>
                </div>
                <h3 className="re-display text-[22px]" style={{ color: 'var(--re-ink)' }}>
                  {ev.title}
                </h3>
                <p className="re-mono text-[10px] tracking-[.28em] uppercase mt-3" style={{ color: 'var(--re-gold)' }}>
                  {data.dateLabel}
                </p>
                <p className="font-display text-[17px] mt-3" style={{ color: 'var(--re-muted)' }}>
                  {ev.time}
                </p>
                <p className="font-display text-[17px]" style={{ color: 'var(--re-muted)' }}>
                  {ev.place}
                </p>
                <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: 'var(--re-muted)', opacity: 0.9 }}>
                  {ev.address}
                </p>
                <a
                  href={ev.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="re-btn-outline mt-6 inline-flex"
                >
                  Lihat Peta
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-28 px-5 md:px-12 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="re-sec-head re-reveal">
            <div className="re-sec-num">IV</div>
            <div>
              <h2>Galeri</h2>
              <p>Moments · Frames of Gold</p>
            </div>
            <div className="re-sec-rule" />
          </div>

          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {[
              'col-span-12 md:col-span-7 aspect-[4/3]',
              'col-span-12 md:col-span-5 aspect-[3/4]',
              'col-span-6 md:col-span-4 aspect-square',
              'col-span-6 md:col-span-4 aspect-square',
              'col-span-12 md:col-span-4 aspect-square',
            ].map((cls, i) => {
              const item = data.gallery[i] || data.gallery[0];
              return (
                <figure
                  key={i}
                  className={`re-reveal relative overflow-hidden cursor-pointer group ${cls}`}
                  style={{
                    '--d': `${0.05 + i * 0.07}s`,
                    border: '2px solid var(--re-gold)',
                    background: 'var(--re-card)',
                  }}
                  onClick={() => setLightbox(item.src.replace(/w=\d+/, 'w=1600'))}
                >
                  <img
                    src={item.src}
                    alt={item.cap}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 saturate-[.75] group-hover:saturate-100"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(74,10,18,.7))' }}
                  />
                  <figcaption className="absolute left-4 bottom-3 text-[#f6e8ce] font-display italic text-[16px] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
                    {item.cap}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative py-20 md:py-28 px-5 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(160deg,#7c1220,#4a0a12)' }}>
        <div className="absolute inset-0 opacity-20" style={{ background: 'url(#re-p-damask)' }} />
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <svg width="100" height="70" viewBox="0 0 120 90" className="mx-auto re-reveal">
            <use href="#re-fleuron" />
          </svg>
          <p className="re-reveal font-display italic font-light text-[clamp(20px,3.4vw,34px)] leading-[1.65] text-[#f2e3c8] mt-6" style={{ '--d': '0.1s' }}>
            “{data.quote}”
          </p>
          <p className="re-reveal re-mono text-[10px] tracking-[.4em] uppercase text-[#e9cb8c] mt-6" style={{ '--d': '0.2s' }}>
            {data.quoteSource}
          </p>
          <svg width="280" height="28" viewBox="0 0 520 90" className="mx-auto mt-8 re-reveal" style={{ '--d': '0.28s' }}>
            <use href="#re-div-fleuron" />
          </svg>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-20 md:py-28 px-5 md:px-12 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="re-sec-head re-reveal">
            <div className="re-sec-num">V</div>
            <div>
              <h2>Konfirmasi</h2>
              <p>R.S.V.P · Will You Join Us?</p>
            </div>
            <div className="re-sec-rule" />
          </div>

          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-start">
            <form onSubmit={submitRsvp} className="re-reveal re-card p-7 md:p-9">
              <div className="mb-5">
                <label className="re-label" htmlFor="reName">Nama Anda</label>
                <input
                  id="reName"
                  className="re-field"
                  placeholder="cth. Andi & Keluarga"
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-5">
                <span className="re-label">Kehadiran</span>
                <div className="flex gap-3 flex-wrap">
                  {['Hadir', 'Tidak Hadir'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`flex-1 min-w-[130px] py-3.5 px-3 border text-[11px] tracking-[.22em] uppercase font-mono transition ${
                        rsvp.attend === opt
                          ? 'bg-[#7c1220] text-[#f6e8ce] border-[#7c1220]'
                          : 'border-[var(--re-line)] text-[var(--re-muted)] hover:border-[var(--re-gold)]'
                      }`}
                      onClick={() => setRsvp({ ...rsvp, attend: opt })}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="re-label" htmlFor="reGuests">Jumlah Tamu</label>
                <select
                  id="reGuests"
                  className="re-field"
                  value={rsvp.guests}
                  onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                >
                  {['1 Tamu', '2 Tamu', '3 Tamu', '4 Tamu', '5+ Tamu'].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="re-label" htmlFor="reMsg">Ucapan &amp; Doa</label>
                <textarea
                  id="reMsg"
                  className="re-field resize-y min-h-[90px] leading-[1.7]"
                  placeholder="Tuliskan doa untuk kedua mempelai…"
                  value={rsvp.msg}
                  onChange={(e) => setRsvp({ ...rsvp, msg: e.target.value })}
                />
              </div>

              <button type="submit" className="re-btn w-full">
                Kirim RSVP
              </button>
            </form>

            <div className="re-reveal" style={{ '--d': '0.12s' }}>
              <div className="flex items-center gap-3 mb-5">
                <svg width="48" height="16" viewBox="0 0 520 90">
                  <use href="#re-div-vine" />
                </svg>
                <span className="re-mono text-[10px] tracking-[.28em] uppercase" style={{ color: 'var(--re-gold)' }}>
                  Ucapan
                </span>
              </div>
              <div className="flex flex-col gap-3.5">
                {wishes.map((w, i) => (
                  <article
                    key={`${w.name}-${i}`}
                    className="re-card relative px-6 py-5"
                    style={{ animation: 'reFadeUp .7s cubic-bezier(.2,.8,.25,1) both', animationDelay: `${i * 0.06}s` }}
                  >
                    <span className="absolute left-0 top-4 bottom-4 w-[3px]" style={{ background: 'var(--re-wine)' }} />
                    <h4 className="re-display text-[16px]" style={{ color: 'var(--re-ink)' }}>
                      {w.name}
                    </h4>
                    <p className="re-mono text-[9px] tracking-[.28em] uppercase mt-1.5" style={{ color: 'var(--re-gold)' }}>
                      {w.meta}
                    </p>
                    <p className="font-display text-[16px] leading-[1.8] mt-2.5 font-light" style={{ color: 'var(--re-muted)' }}>
                      {w.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative text-center pt-16 pb-14 px-5 border-t" style={{ borderColor: 'var(--re-line)', background: 'var(--re-bg2)' }}>
        <svg width="200" height="60" viewBox="0 0 320 90" className="mx-auto mb-5">
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.3" strokeLinecap="round">
            <path d="M10 45 C 40 22 70 68 100 45" />
            <path d="M220 45 C 250 22 280 68 310 45" />
          </g>
          <g fill="url(#re-g-gold)">
            <circle cx="82" cy="45" r="3.2" />
            <circle cx="238" cy="45" r="3.2" />
          </g>
          <g transform="translate(160,45)">
            <circle cx="-13" cy="0" r="17" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="5" />
            <circle cx="13" cy="0" r="17" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="5" />
          </g>
        </svg>
        <p className="re-script text-[clamp(28px,5vw,42px)]" style={{ color: 'var(--re-wine)' }}>
          terima kasih
        </p>
        <p className="re-mono text-[9.5px] tracking-[.34em] uppercase mt-5" style={{ color: 'var(--re-muted)' }}>
          {data.groom.short} &amp; {data.bride.short} · {data.city}
        </p>
        <p className="re-mono text-[9px] tracking-[.28em] uppercase mt-3 opacity-70" style={{ color: 'var(--re-muted)' }}>
          Red Elegants Template · Undangaja
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <button type="button" className="re-btn-outline" onClick={() => onNavigate('templates')}>
            Template Lain
          </button>
          <button type="button" className="re-btn-outline" onClick={() => onNavigate('create')}>
            Edit Data
          </button>
        </div>
      </footer>

      {/* Floating actions */}
      <div
        className={`fixed left-1/2 bottom-5 z-[80] -translate-x-1/2 flex gap-2.5 transition-transform duration-700 ${showFloat ? 'translate-y-0' : 'translate-y-[140%]'}`}
      >
        <a href="#rsvp" className="re-btn !py-3 !px-5 !text-[9px] no-underline">
          RSVP
        </a>
        <button type="button" className="re-btn-outline !py-3 !px-4 !text-[9px]" onClick={downloadIcs}>
          Save Date
        </button>
        <button type="button" className="re-btn-outline !py-3 !px-4 !text-[9px]" onClick={() => setNight((n) => !n)}>
          {night ? '☀' : '☾'}
        </button>
      </div>

      {/* Lightbox */}
      <div
        className={`fixed inset-0 z-[180] grid place-items-center p-6 transition-opacity duration-500 ${lightbox ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ background: 'rgba(40,8,12,.92)' }}
        onClick={() => setLightbox(null)}
      >
        <button
          type="button"
          className="absolute top-6 right-7 w-10 h-10 border border-[#e9cb8c]/50 text-[#f6e8ce] text-2xl grid place-items-center hover:bg-[#e9cb8c]/15 hover:rotate-90 transition"
          onClick={() => setLightbox(null)}
          aria-label="Close"
        >
          ×
        </button>
        {lightbox && (
          <img src={lightbox} alt="Gallery preview" className="max-w-full max-h-[88vh] object-contain shadow-2xl border-2 border-[#b98a35]" />
        )}
      </div>

      {/* side nav diamonds */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-[70] hidden xl:flex flex-col gap-3.5">
        {[
          ['home', 'Home'],
          ['countdown', 'Waktu'],
          ['couple', 'Mempelai'],
          ['story', 'Kisah'],
          ['events', 'Acara'],
          ['gallery', 'Galeri'],
          ['rsvp', 'RSVP'],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            title={label}
            className="w-2.5 h-2.5 border rotate-45 transition hover:scale-125"
            style={{ borderColor: 'var(--re-gold)' }}
          />
        ))}
      </nav>
    </div>
  );
}
