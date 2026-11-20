import React, { useEffect, useMemo, useState } from 'react';
import { useReveal, useCountdown, Toast } from '../components/layout/SiteChrome';
import CherryBlossomDefs from '../components/ornaments/CherryBlossomDefs';
import { DEFAULT_DRAFT } from '../data/templates';

const CB_CSS = `
  .cb-page {
    --cb-paper:#FFF8FA;
    --cb-paper-2:#FDEDF2;
    --cb-card:#FFFFFF;
    --cb-petal:#FBE5EA;
    --cb-blush:#F6D0DB;
    --cb-rose:#D06982;
    --cb-rose-deep:#A84A66;
    --cb-ink:#4A3038;
    --cb-ink-soft:#8A6B74;
    --cb-branch:#8C5661;
    --cb-sage:#799375;
    --cb-gold:#D99C77;
    --cb-line:rgba(208,105,130,.28);
    --cb-shadow:0 24px 60px rgba(168,74,102,.10);
    background:
      radial-gradient(ellipse at 12% 0%, rgba(246,208,219,.45), transparent 48%),
      radial-gradient(ellipse at 88% 100%, rgba(246,208,219,.38), transparent 52%),
      linear-gradient(180deg, var(--cb-paper) 0%, var(--cb-paper-2) 55%, var(--cb-paper) 100%);
    color:var(--cb-ink);
    font-family:'Cormorant Garamond',Georgia,serif;
    min-height:100dvh;
  }
  .cb-display {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-weight:400;
    letter-spacing:.02em;
  }
  .cb-script {
    font-family:'Parisienne',cursive;
    color:var(--cb-rose-deep);
    line-height:1;
  }
  .cb-label {
    font-family:'Jost',system-ui,sans-serif;
    text-transform:uppercase;
    letter-spacing:.32em;
  }
  .cb-eyebrow {
    font-family:'Jost',system-ui,sans-serif;
    font-size:10.5px;
    letter-spacing:.42em;
    text-transform:uppercase;
    color:var(--cb-rose-deep);
  }
  .cb-body {
    font-family:'Cormorant Garamond',Georgia,serif;
    font-size:17.5px;
    line-height:1.85;
    font-weight:400;
    color:var(--cb-ink);
  }
  .cb-btn {
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    cursor:pointer;border:1px solid var(--cb-rose);border-radius:999px;
    padding:14px 30px;
    font-family:'Jost',system-ui,sans-serif;font-size:11px;letter-spacing:.28em;
    text-transform:uppercase;color:#fff;
    background:linear-gradient(135deg, var(--cb-rose), var(--cb-rose-deep));
    box-shadow:0 14px 32px rgba(168,74,102,.22);
    transition:transform .45s cubic-bezier(.2,.8,.25,1), box-shadow .45s, letter-spacing .45s;
  }
  .cb-btn:hover {
    transform:translateY(-3px);
    letter-spacing:.34em;
    box-shadow:0 20px 40px rgba(168,74,102,.3);
  }
  .cb-btn-ghost {
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    cursor:pointer;border:1px solid var(--cb-line);border-radius:999px;
    background:rgba(255,255,255,.55);color:var(--cb-rose-deep);
    padding:13px 26px;
    font-family:'Jost',system-ui,sans-serif;font-size:10.5px;letter-spacing:.26em;
    text-transform:uppercase;transition:.4s cubic-bezier(.2,.8,.25,1);
    backdrop-filter:blur(6px);
  }
  .cb-btn-ghost:hover {
    border-color:var(--cb-rose);background:#fff;letter-spacing:.32em;
    box-shadow:0 12px 28px rgba(168,74,102,.14);
  }
  .cb-card {
    background:var(--cb-card);
    border:1px solid var(--cb-line);
    border-radius:18px;
    position:relative;
    box-shadow:var(--cb-shadow);
  }
  .cb-card::before {
    content:'';position:absolute;inset:7px;border:1px solid rgba(246,208,219,.7);
    border-radius:12px;pointer-events:none;
  }
  .cb-reveal {
    opacity:0;transform:translateY(26px);
    transition:opacity .9s ease, transform .9s cubic-bezier(.2,.8,.25,1);
    transition-delay:var(--d,0s);
  }
  .cb-reveal.in { opacity:1; transform:none; }
  .cb-sec-head {
    display:flex;align-items:flex-end;gap:22px;margin-bottom:clamp(26px,4vw,46px);
  }
  .cb-sec-num {
    font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;
    font-size:clamp(2.6rem,6vw,4.4rem);line-height:.85;font-weight:300;
    color:transparent;-webkit-text-stroke:1px var(--cb-rose);opacity:.65;
  }
  .cb-sec-head h2 {
    font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;
    font-size:clamp(1.35rem,3vw,1.95rem);
    letter-spacing:.08em;color:var(--cb-ink);
  }
  .cb-sec-head p {
    font-family:'Jost',system-ui,sans-serif;font-size:10px;letter-spacing:.3em;
    text-transform:uppercase;color:var(--cb-ink-soft);margin-top:9px;
  }
  .cb-sec-rule {
    flex:1;height:1px;
    background:linear-gradient(90deg, rgba(208,105,130,.45), transparent);
    margin-bottom:12px;
  }
  .cb-field {
    width:100%;padding:13px 2px;background:transparent;border:none;
    border-bottom:1px solid var(--cb-line);color:var(--cb-ink);
    font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;outline:none;
    transition:border-color .4s;
  }
  .cb-field:focus { border-color:var(--cb-rose); }
  .cb-field-label {
    display:block;font-family:'Jost',system-ui,sans-serif;font-size:9.5px;
    letter-spacing:.34em;text-transform:uppercase;color:var(--cb-rose-deep);
    margin-bottom:8px;
  }
  .cb-branch-img {
    position:absolute;pointer-events:none;select-none;object-fit:contain;
    opacity:.92;
  }
  .cb-petal-wrap {
    position:absolute;top:-12vh;pointer-events:none;
    animation:cbPetalFall linear infinite;
  }
  .cb-petal-img {
    width:100%;height:100%;display:block;
    background:url('/ornaments/cb-petal.webp') center/contain no-repeat;
    animation:cbPetalSway ease-in-out infinite alternate;
  }
  @keyframes cbPetalFall {
    0%{opacity:0;transform:translate3d(0,-8vh,0) rotate(0deg)}
    9%{opacity:1}
    88%{opacity:1}
    100%{opacity:0;transform:translate3d(var(--drift,60px),118vh,0) rotate(var(--spin,360deg))}
  }
  @keyframes cbPetalSway {
    from{transform:translateX(var(--sway-a,-14px)) rotate(var(--rot-a,-26deg)) scaleX(var(--flip,1))}
    to{transform:translateX(var(--sway-b,14px)) rotate(var(--rot-b,26deg)) scaleX(var(--flip,1))}
  }
  @keyframes cbFadeUp {
    from{opacity:0;transform:translateY(22px)}
    to{opacity:1;transform:none}
  }
  @keyframes cbFloat {
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-10px)}
  }
  @keyframes cbDraw { to { stroke-dashoffset:0 } }
  @media (prefers-reduced-motion: reduce) {
    .cb-reveal { opacity:1 !important; transform:none !important; }
    .cb-petal-wrap { display:none; }
    .cb-btn, .cb-btn-ghost { animation:none; }
  }
`;

function useRevealCb(deps = []) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll('.cb-reveal'));
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

/** Pink sakura petals — SiteChrome's shared .petal is ivory/gold. */
function CherryPetals({ count = 28 }) {
  const petals = React.useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: count }, (_, i) => {
      const near = Math.random() < 0.4;
      return {
        id: i,
        left: Math.random() * 100,
        size: near ? 22 + Math.random() * 18 : 11 + Math.random() * 11,
        near,
        drift: (Math.random() * 2 - 1) * (near ? 190 : 110),
        spin: (Math.random() * 2 - 1) * 420,
        duration: near ? 9 + Math.random() * 7 : 15 + Math.random() * 12,
        delay: -Math.random() * 22,
        sway: 2.2 + Math.random() * 3.4,
        swayA: -10 - Math.random() * 18,
        swayB: 10 + Math.random() * 18,
        rotA: -22 - Math.random() * 32,
        rotB: 22 + Math.random() * 32,
        opacity: near ? 0.82 + Math.random() * 0.18 : 0.32 + Math.random() * 0.36,
        blur: near ? 0 : Math.random() * 1.6,
        flip: Math.random() < 0.5,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="cb-petal-wrap"
          style={{
            left: `${p.left}vw`,
            width: p.size,
            height: p.size * 1.05,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span
            className="cb-petal-img"
            style={{
              opacity: p.opacity,
              '--sway-a': `${p.swayA}px`,
              '--sway-b': `${p.swayB}px`,
              '--rot-a': `${p.rotA}deg`,
              '--rot-b': `${p.rotB}deg`,
              '--flip': p.flip ? -1 : 1,
              animationDuration: `${p.sway}s`,
              filter: p.blur
                ? `blur(${p.blur}px) drop-shadow(0 3px 8px rgba(168,74,102,.16))`
                : 'drop-shadow(0 3px 8px rgba(168,74,102,.22))',
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default function CherryBlossomInvitation({ onNavigate, draft }) {
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
      text: 'What a beautiful beginning — wishing you both a lifetime of joy and blush-lined days.',
    },
  ]);
  const [rsvp, setRsvp] = useState({
    name: '',
    attend: 'Hadir',
    guests: '2 Tamu',
    msg: '',
  });
  const [showFloat, setShowFloat] = useState(false);

  const rootRef = useRevealCb([unlocked]);
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
      'PRODID:-//Wedding Invitation Cherry Blossom//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:wedding-cherry-blossom@undangaja',
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
    a.download = 'wedding-cherry-blossom.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast('File kalender diunduh');
  };

  /* ---------- Opening veil: hanami stationery ---------- */
  const veil = (
    <div
      className={`fixed inset-0 z-[90] grid place-items-center transition-opacity duration-[1.1s] ${unlocked ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 35%, rgba(255,248,250,.98), rgba(253,237,242,.97) 50%, rgba(246,208,219,.96)), #FFF8FA',
      }}
    >
      <CherryBlossomDefs />
      <CherryPetals count={18} />
      {/* signature branch top-left */}
      <img
        src="/ornaments/cb-branch-corner.webp"
        alt=""
        aria-hidden="true"
        className="cb-branch-img left-[-12%] top-[-10%] w-[min(72vw,620px)] opacity-95"
      />
      {/* mirrored branch bottom-right */}
      <img
        src="/ornaments/cb-branch-corner.webp"
        alt=""
        aria-hidden="true"
        className="cb-branch-img right-[-12%] bottom-[-12%] w-[min(66vw,560px)] opacity-85 scale-x-[-1] scale-y-[-1]"
      />
      {/* soft blossom arch framing the cover */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,720px)] pointer-events-none opacity-70"
        viewBox="0 0 480 260"
        aria-hidden="true"
      >
        <use href="#cb-arch" />
      </svg>

      <div className="relative z-10 text-center px-6 max-w-[560px] pb-10">
        <p
          className="cb-eyebrow"
          style={{ animation: 'cbFadeUp .9s .3s cubic-bezier(.2,.8,.25,1) both' }}
        >
          The Wedding Of
        </p>
        <div
          className="relative mx-auto mt-5 w-[128px] h-[128px]"
          style={{ animation: 'cbFadeUp 1s .45s cubic-bezier(.2,.8,.25,1) both' }}
        >
          <img
            src="/ornaments/cb-bouquet.webp"
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] max-w-none opacity-45 pointer-events-none"
          />
          <svg viewBox="0 0 160 160" className="relative w-full h-full">
            <use href="#cb-monogram" />
          </svg>
        </div>
        <h1
          className="cb-display text-[clamp(34px,9vw,56px)] font-light text-[#4A3038] mt-5 leading-[1.08]"
          style={{ animation: 'cbFadeUp 1s .55s cubic-bezier(.2,.8,.25,1) both' }}
        >
          {data.groom.short}
        </h1>
        <p
          className="cb-script text-[clamp(30px,6vw,44px)] my-1"
          style={{ animation: 'cbFadeUp 1s .7s cubic-bezier(.2,.8,.25,1) both' }}
        >
          &amp;
        </p>
        <h1
          className="cb-display text-[clamp(34px,9vw,56px)] font-light text-[#4A3038] leading-[1.08]"
          style={{ animation: 'cbFadeUp 1s .8s cubic-bezier(.2,.8,.25,1) both' }}
        >
          {data.bride.short}
        </h1>
        <svg
          width="220"
          height="24"
          viewBox="0 0 400 40"
          className="mx-auto mt-5"
          style={{ animation: 'cbFadeUp 1s .95s cubic-bezier(.2,.8,.25,1) both' }}
        >
          <use href="#cb-divider" />
        </svg>
        <p
          className="cb-label text-[10.5px] text-[#8A6B74] mt-4"
          style={{ animation: 'cbFadeUp 1s 1.05s cubic-bezier(.2,.8,.25,1) both' }}
        >
          {data.dateLabel}
        </p>
        <p
          className="cb-body italic text-[17px] text-[#8A6B74] mt-5"
          style={{ animation: 'cbFadeUp 1s 1.15s cubic-bezier(.2,.8,.25,1) both' }}
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
          <strong className="block cb-display not-italic font-semibold text-[#4A3038] mt-1.5 text-[1.15em]">
            Tamu Undangan
          </strong>
        </p>
        <button
          type="button"
          className="cb-btn mt-8"
          style={{ animation: 'cbFadeUp .9s 1.3s cubic-bezier(.2,.8,.25,1) both' }}
          onClick={() => {
            setUnlocked(true);
            window.scrollTo({ top: 0 });
          }}
        >
          Buka Undangan
        </button>
        <p
          className="cb-label text-[9px] text-[#8A6B74]/70 mt-6"
          style={{ animation: 'cbFadeUp 1s 1.45s cubic-bezier(.2,.8,.25,1) both' }}
        >
          Cherry Blossom · Hanami &amp; Blush
        </p>
      </div>
    </div>
  );

  if (!unlocked) {
    return (
      <div className="cb-page min-h-dvh">
        <style>{CB_CSS}</style>
        {veil}
      </div>
    );
  }

  const initials = `${(data.groom.short || 'M')[0]}&${(data.bride.short || 'I')[0]}`;

  return (
    <div ref={rootRef} className="cb-page relative min-h-dvh">
      <style>{CB_CSS}</style>
      <CherryBlossomDefs />
      {showPetals && <CherryPetals />}

      <Toast show={!!toast}>{toast}</Toast>

      {/* Sticky top */}
      <header
        className="sticky top-0 z-[60] border-b backdrop-blur-[10px]"
        style={{
          background: 'rgba(255,248,250,.88)',
          borderColor: 'rgba(208,105,130,.28)',
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-12 py-3.5 flex items-center justify-between gap-4">
          <button type="button" className="flex items-center gap-3 group" onClick={() => onNavigate('home')}>
            <span
              className="w-9 h-9 border rounded-full grid place-items-center text-[13px] cb-display font-medium"
              style={{ borderColor: 'var(--cb-rose)', color: 'var(--cb-rose-deep)' }}
            >
              {(data.groom.short || 'M')[0]}
            </span>
            <span className="text-left">
              <span
                className="block cb-display font-semibold tracking-[.12em] text-[13px]"
                style={{ color: 'var(--cb-ink)' }}
              >
                Cherry Blossom
              </span>
              <span className="block cb-label text-[8.5px] tracking-[.28em]" style={{ color: 'var(--cb-ink-soft)' }}>
                Hanami · Blush · Sakura
              </span>
            </span>
          </button>
          <nav className="hidden md:flex gap-6 cb-label text-[9.5px]" style={{ color: 'var(--cb-ink-soft)' }}>
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
                className="relative pb-0.5 hover:text-[#D06982] transition"
                style={{ color: 'var(--cb-ink-soft)' }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="cb-btn-ghost !py-2 !px-3 !text-[9px] hidden sm:inline-flex"
              onClick={() => onNavigate('create')}
            >
              Edit
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden pt-8 pb-20 px-5 md:px-12 text-center">
        <img
          src="/ornaments/cb-branch-corner.webp"
          alt=""
          aria-hidden="true"
          className="cb-branch-img left-[-14%] top-[-8%] w-[min(60vw,540px)] opacity-90"
        />
        <img
          src="/ornaments/cb-branch-corner.webp"
          alt=""
          aria-hidden="true"
          className="cb-branch-img right-[-14%] top-[2%] w-[min(52vw,460px)] opacity-70 scale-x-[-1]"
        />

        <div className="relative z-10 max-w-[820px] mx-auto pt-[min(10vh,80px)]">
          <div
            className="cb-reveal relative w-[140px] h-[140px] mx-auto"
            style={{ '--d': '0.1s', animation: 'cbFloat 7s ease-in-out infinite' }}
          >
            <img
              src="/ornaments/cb-bouquet.webp"
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] max-w-none opacity-40 pointer-events-none"
            />
            <svg viewBox="0 0 160 160" className="relative w-full h-full">
              <use href="#cb-monogram" />
            </svg>
            <span className="sr-only">{initials}</span>
          </div>

          <p className="cb-eyebrow cb-reveal mt-6" style={{ '--d': '0.15s' }}>
            The Wedding Of
          </p>

          <h1
            className="cb-reveal cb-display font-light text-[clamp(32px,7vw,70px)] mt-4 leading-[1.08]"
            style={{ '--d': '0.22s', color: 'var(--cb-ink)' }}
          >
            {data.groom.fullName}
          </h1>

          <p className="cb-reveal cb-script text-[clamp(36px,6vw,56px)] my-2" style={{ '--d': '0.32s' }}>
            and
          </p>

          <h1
            className="cb-reveal cb-display font-light text-[clamp(32px,7vw,70px)] leading-[1.08]"
            style={{ '--d': '0.4s', color: 'var(--cb-ink)' }}
          >
            {data.bride.fullName}
          </h1>

          <svg width="min(420px,90%)" height="36" viewBox="0 0 400 40" className="mx-auto mt-6 cb-reveal" style={{ '--d': '0.48s' }}>
            <use href="#cb-divider" />
          </svg>

          <p
            className="cb-reveal cb-body italic font-light text-[clamp(16px,2.4vw,19px)] max-w-[520px] mx-auto mt-6"
            style={{ '--d': '0.55s', color: 'var(--cb-ink-soft)' }}
          >
            Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.
          </p>

          {/* meta strip */}
          <div
            className="cb-reveal mt-10 border-y grid grid-cols-2 md:grid-cols-4 max-w-[760px] mx-auto"
            style={{ '--d': '0.62s', borderColor: 'var(--cb-line)' }}
          >
            {[
              ['Hari', data.weekday],
              ['Tanggal', `${data.day} ${data.monthSide}`],
              ['Waktu', data.time.split('—')[0].trim()],
              ['Lokasi', `${data.city}`],
            ].map(([dt, dd]) => (
              <div
                key={dt}
                className="py-4 px-3 border-r last:border-r-0 md:border-r"
                style={{ borderColor: 'var(--cb-line)' }}
              >
                <div className="cb-label text-[9px]" style={{ color: 'var(--cb-rose-deep)' }}>
                  {dt}
                </div>
                <div className="cb-display text-[15px] tracking-[.06em] mt-1.5" style={{ color: 'var(--cb-ink)' }}>
                  {dd}
                </div>
              </div>
            ))}
          </div>

          {/* sprig divider */}
          <div className="cb-reveal mt-12 max-w-[520px] mx-auto" style={{ '--d': '0.7s' }}>
            <svg viewBox="0 0 240 160" className="w-full h-auto max-h-[120px]">
              <use href="#cb-sprig" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-8 cb-reveal" style={{ '--d': '0.78s' }}>
            <a href="#rsvp" className="cb-btn no-underline">
              Konfirmasi Kehadiran
            </a>
            <button type="button" className="cb-btn-ghost" onClick={downloadIcs}>
              Simpan Tanggal
            </button>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section id="countdown" className="relative overflow-hidden py-16 md:py-20 px-5 md:px-12">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, rgba(246,208,219,.55), rgba(255,248,250,.9) 40%, rgba(251,229,234,.7))',
          }}
        />
        <img
          src="/ornaments/cb-scatter.webp"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,820px)] max-w-none opacity-30 pointer-events-none"
        />
        <div className="relative z-10 max-w-[880px] mx-auto text-center">
          <div className="cb-reveal">
            <svg width="72" height="54" viewBox="0 0 240 160" className="mx-auto mb-4">
              <use href="#cb-sprig" />
            </svg>
            <h2
              className="cb-display text-[clamp(22px,4vw,34px)] font-medium tracking-[.06em]"
              style={{ color: 'var(--cb-ink)' }}
            >
              MENUJU HARI BAHAGIA
            </h2>
            <p className="cb-label text-[10px] mt-3" style={{ color: 'var(--cb-rose-deep)' }}>
              Save The Date
            </p>
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
                className="cb-reveal border py-5 px-2 rounded-2xl"
                style={{
                  '--d': `${0.08 + i * 0.08}s`,
                  background: 'rgba(255,255,255,.72)',
                  borderColor: 'var(--cb-line)',
                  boxShadow: '0 12px 32px rgba(168,74,102,.08)',
                }}
              >
                <span
                  className="block cb-display text-[clamp(32px,7vw,54px)] leading-none font-light tabular-nums"
                  style={{ color: 'var(--cb-rose-deep)' }}
                >
                  {num}
                </span>
                <span className="block cb-label mt-2.5 text-[9.5px]" style={{ color: 'var(--cb-ink-soft)' }}>
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
          <div className="cb-sec-head cb-reveal">
            <div className="cb-sec-num">I</div>
            <div>
              <h2>Mempelai</h2>
              <p>Bride &amp; Groom · Two Houses, One Vow</p>
            </div>
            <div className="cb-sec-rule" />
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
                  <div className="hidden md:block cb-reveal relative text-center" style={{ '--d': '0.15s' }}>
                    <img
                      src="/ornaments/cb-bouquet.webp"
                      alt=""
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] max-w-none opacity-50 pointer-events-none"
                    />
                    <svg width="88" height="64" viewBox="0 0 240 160" className="relative mx-auto mb-3">
                      <use href="#cb-sprig" />
                    </svg>
                    <span className="relative cb-script text-[64px] block leading-none">&amp;</span>
                  </div>
                )}
                <div className={`cb-reveal text-center ${idx === 0 ? '' : 'md:order-none'}`} style={{ '--d': `${0.1 + idx * 0.12}s` }}>
                  <div className="relative w-[min(300px,70vw)] mx-auto aspect-[4/5] mb-6 group">
                    <div
                      className="absolute inset-0 translate-x-3 translate-y-3 border rounded-2xl"
                      style={{ borderColor: 'var(--cb-rose)', background: 'var(--cb-card)' }}
                    />
                    <div
                      className="absolute inset-0 overflow-hidden border rounded-2xl shadow-[var(--cb-shadow)]"
                      style={{ borderColor: 'var(--cb-rose)', background: 'var(--cb-petal)' }}
                    >
                      <img
                        src={p.photo}
                        alt={p.role}
                        className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 saturate-[.9]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(168,74,102,.28))' }}
                      />
                    </div>
                    <svg className="absolute -top-3 -left-3 w-14 opacity-85" viewBox="0 0 100 100">
                      <use href="#cb-blossom" />
                    </svg>
                    <svg className="absolute -bottom-3 -right-3 w-14 opacity-85 rotate-180" viewBox="0 0 100 100">
                      <use href="#cb-blossom" />
                    </svg>
                  </div>
                  <p className="cb-label text-[9px]" style={{ color: 'var(--cb-rose-deep)' }}>
                    {p.role}
                  </p>
                  <h3 className="cb-display text-[clamp(22px,3.5vw,32px)] font-medium mt-2.5" style={{ color: 'var(--cb-ink)' }}>
                    {p.name}
                  </h3>
                  <p className="cb-body text-[16px] mt-3" style={{ color: 'var(--cb-ink-soft)' }}>
                    Putra/Putri dari
                    <strong className="block cb-display font-semibold mt-0.5" style={{ color: 'var(--cb-ink)' }}>
                      {p.parents}
                    </strong>
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="py-20 md:py-28 px-5 md:px-12 relative z-10"
        style={{ background: 'linear-gradient(180deg,transparent,rgba(246,208,219,.28),transparent)' }}
      >
        <div className="max-w-[760px] mx-auto">
          <div className="cb-sec-head cb-reveal">
            <div className="cb-sec-num">II</div>
            <div>
              <h2>Kisah Kami</h2>
              <p>Our Journey · Written in Blush</p>
            </div>
            <div className="cb-sec-rule" />
          </div>

          <div className="relative pl-10 md:pl-14">
            <div
              className="absolute left-4 md:left-6 top-2 bottom-2 w-px"
              style={{ background: 'linear-gradient(180deg,transparent,var(--cb-rose),transparent)' }}
            />
            {data.story.map((item, i) => (
              <div key={item.year} className="relative pb-10 cb-reveal" style={{ '--d': `${i * 0.08}s` }}>
                <span
                  className="absolute -left-10 md:-left-14 top-2 w-3.5 h-3.5 rotate-45 border"
                  style={{ background: 'var(--cb-card)', borderColor: 'var(--cb-rose)' }}
                />
                <p className="cb-label text-[11px]" style={{ color: 'var(--cb-rose-deep)' }}>
                  {item.year}
                </p>
                <h3 className="cb-display text-[clamp(18px,3vw,26px)] font-medium mt-2.5 mb-2.5" style={{ color: 'var(--cb-ink)' }}>
                  {item.title}
                </h3>
                <p className="cb-body font-light" style={{ color: 'var(--cb-ink-soft)' }}>
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
          <div className="cb-sec-head cb-reveal">
            <div className="cb-sec-num">III</div>
            <div>
              <h2>Rangkaian Acara</h2>
              <p>Wedding Events · Akad &amp; Resepsi</p>
            </div>
            <div className="cb-sec-rule" />
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
                className="cb-reveal cb-card p-7 md:p-8 text-center group hover:-translate-y-2 transition-transform duration-500"
                style={{ '--d': `${0.08 + i * 0.1}s` }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-5 grid place-items-center border rounded-full"
                  style={{
                    borderColor: 'var(--cb-line)',
                    background: 'rgba(246,208,219,.35)',
                  }}
                >
                  {i === 0 && (
                    <svg width="26" height="26" viewBox="0 0 100 100">
                      <use href="#cb-blossom" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="26" height="26" viewBox="0 0 100 100">
                      <use href="#cb-blossom" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="26" height="18" viewBox="0 0 120 24">
                      <use href="#cb-diamond-row" />
                    </svg>
                  )}
                </div>
                <h3 className="cb-display text-[22px] font-medium" style={{ color: 'var(--cb-ink)' }}>
                  {ev.title}
                </h3>
                <p className="cb-label text-[10px] mt-3" style={{ color: 'var(--cb-rose-deep)' }}>
                  {data.dateLabel}
                </p>
                <p className="cb-body text-[17px] mt-3" style={{ color: 'var(--cb-ink-soft)' }}>
                  {ev.time}
                </p>
                <p className="cb-body text-[17px]" style={{ color: 'var(--cb-ink-soft)' }}>
                  {ev.place}
                </p>
                <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: 'var(--cb-ink-soft)', opacity: 0.9 }}>
                  {ev.address}
                </p>
                <a
                  href={ev.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cb-btn-ghost mt-6 inline-flex no-underline"
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
          <div className="cb-sec-head cb-reveal">
            <div className="cb-sec-num">IV</div>
            <div>
              <h2>Galeri</h2>
              <p>Moments · Frames of Blush</p>
            </div>
            <div className="cb-sec-rule" />
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
                  className={`cb-reveal relative overflow-hidden cursor-pointer group rounded-2xl ${cls}`}
                  style={{
                    '--d': `${0.05 + i * 0.07}s`,
                    border: '1px solid var(--cb-line)',
                    background: 'var(--cb-card)',
                    boxShadow: '0 16px 40px rgba(168,74,102,.10)',
                  }}
                  onClick={() => setLightbox(item.src.replace(/w=\d+/, 'w=1600'))}
                >
                  <img
                    src={item.src}
                    alt={item.cap}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 saturate-[.85] group-hover:saturate-100"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(74,48,56,.72))' }}
                  />
                  <figcaption className="absolute left-4 bottom-3 text-[#FFF8FA] cb-display italic text-[16px] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition">
                    {item.cap}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section
        className="relative py-20 md:py-28 px-5 md:px-12 overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #F6D0DB 0%, #FBE5EA 45%, #FFF8FA 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img
            src="/ornaments/cb-branch-corner.webp"
            alt=""
            aria-hidden="true"
            className="cb-branch-img left-[-12%] top-[-14%] w-[min(58vw,520px)] opacity-80"
          />
          <img
            src="/ornaments/cb-branch-corner.webp"
            alt=""
            aria-hidden="true"
            className="cb-branch-img right-[-12%] bottom-[-14%] w-[min(52vw,460px)] opacity-65 scale-x-[-1] scale-y-[-1]"
          />
          <img
            src="/ornaments/cb-scatter.webp"
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,760px)] max-w-none opacity-55"
          />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <svg width="100" height="70" viewBox="0 0 240 160" className="mx-auto cb-reveal">
            <use href="#cb-sprig" />
          </svg>
          <p
            className="cb-reveal cb-display italic font-light text-[clamp(20px,3.4vw,32px)] leading-[1.7] mt-6"
            style={{ '--d': '0.1s', color: 'var(--cb-ink)' }}
          >
            “{data.quote}”
          </p>
          <p className="cb-reveal cb-label text-[10px] mt-6" style={{ '--d': '0.2s', color: 'var(--cb-rose-deep)' }}>
            {data.quoteSource}
          </p>
          <svg width="280" height="28" viewBox="0 0 400 40" className="mx-auto mt-8 cb-reveal" style={{ '--d': '0.28s' }}>
            <use href="#cb-divider" />
          </svg>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-20 md:py-28 px-5 md:px-12 relative z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="cb-sec-head cb-reveal">
            <div className="cb-sec-num">V</div>
            <div>
              <h2>Konfirmasi</h2>
              <p>R.S.V.P · Will You Join Us?</p>
            </div>
            <div className="cb-sec-rule" />
          </div>

          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 items-start">
            <form onSubmit={submitRsvp} className="cb-reveal cb-card p-7 md:p-9">
              <div className="mb-5">
                <label className="cb-field-label" htmlFor="cbName">Nama Anda</label>
                <input
                  id="cbName"
                  className="cb-field"
                  placeholder="cth. Andi & Keluarga"
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-5">
                <span className="cb-field-label">Kehadiran</span>
                <div className="flex gap-3 flex-wrap">
                  {['Hadir', 'Tidak Hadir'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`flex-1 min-w-[130px] py-3.5 px-3 border rounded-full cb-label text-[10px] transition ${
                        rsvp.attend === opt
                          ? 'bg-[#D06982] text-white border-[#D06982]'
                          : 'border-[var(--cb-line)] text-[var(--cb-ink-soft)] hover:border-[#D06982]'
                      }`}
                      style={
                        rsvp.attend !== opt
                          ? { background: 'rgba(255,255,255,.6)' }
                          : undefined
                      }
                      onClick={() => setRsvp({ ...rsvp, attend: opt })}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="cb-field-label" htmlFor="cbGuests">Jumlah Tamu</label>
                <select
                  id="cbGuests"
                  className="cb-field"
                  value={rsvp.guests}
                  onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                >
                  {['1 Tamu', '2 Tamu', '3 Tamu', '4 Tamu', '5+ Tamu'].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="cb-field-label" htmlFor="cbMsg">Ucapan &amp; Doa</label>
                <textarea
                  id="cbMsg"
                  className="cb-field resize-y min-h-[90px] leading-[1.7]"
                  placeholder="Tuliskan doa untuk kedua mempelai…"
                  value={rsvp.msg}
                  onChange={(e) => setRsvp({ ...rsvp, msg: e.target.value })}
                />
              </div>

              <button type="submit" className="cb-btn w-full">
                Kirim RSVP
              </button>
            </form>

            <div className="cb-reveal" style={{ '--d': '0.12s' }}>
              <div className="flex items-center gap-3 mb-5">
                <svg width="48" height="16" viewBox="0 0 120 24">
                  <use href="#cb-diamond-row" />
                </svg>
                <span className="cb-label text-[10px]" style={{ color: 'var(--cb-rose-deep)' }}>
                  Ucapan
                </span>
              </div>
              <div className="flex flex-col gap-3.5">
                {wishes.map((w, i) => (
                  <article
                    key={`${w.name}-${i}`}
                    className="cb-card relative px-6 py-5"
                    style={{ animation: 'cbFadeUp .7s cubic-bezier(.2,.8,.25,1) both', animationDelay: `${i * 0.06}s` }}
                  >
                    <span
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                      style={{ background: 'var(--cb-rose)' }}
                    />
                    <h4 className="cb-display text-[16px] font-medium" style={{ color: 'var(--cb-ink)' }}>
                      {w.name}
                    </h4>
                    <p className="cb-label text-[9px] mt-1.5" style={{ color: 'var(--cb-rose-deep)' }}>
                      {w.meta}
                    </p>
                    <p className="cb-body text-[16px] mt-2.5 font-light" style={{ color: 'var(--cb-ink-soft)' }}>
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
      <footer
        className="relative text-center pt-16 pb-14 px-5 border-t overflow-hidden"
        style={{
          borderColor: 'var(--cb-line)',
          background: 'linear-gradient(180deg, transparent, rgba(246,208,219,.35))',
        }}
      >
        <img
          src="/ornaments/cb-bouquet.webp"
          alt=""
          aria-hidden="true"
          className="cb-branch-img left-1/2 -translate-x-1/2 bottom-[-38%] w-[min(72vw,520px)] opacity-60"
        />
        <div className="relative z-10">
          <svg width="200" height="60" viewBox="0 0 400 40" className="mx-auto mb-5">
            <use href="#cb-divider" />
          </svg>
          <p className="cb-script text-[clamp(28px,5vw,42px)]" style={{ color: 'var(--cb-rose)' }}>
            terima kasih
          </p>
          <p className="cb-label text-[9.5px] mt-5" style={{ color: 'var(--cb-ink-soft)' }}>
            {data.groom.short} &amp; {data.bride.short} · {data.city}
          </p>
          <p className="cb-label text-[9px] mt-3 opacity-70" style={{ color: 'var(--cb-ink-soft)' }}>
            Cherry Blossom Template · Undangaja
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <button type="button" className="cb-btn-ghost" onClick={() => onNavigate('templates')}>
              Template Lain
            </button>
            <button type="button" className="cb-btn-ghost" onClick={() => onNavigate('create')}>
              Edit Data
            </button>
          </div>
        </div>
      </footer>

      {/* Floating actions */}
      <div
        className={`fixed left-1/2 bottom-5 z-[80] -translate-x-1/2 flex gap-2.5 transition-transform duration-700 ${showFloat ? 'translate-y-0' : 'translate-y-[140%]'}`}
      >
        <a href="#rsvp" className="cb-btn !py-3 !px-5 !text-[9px] no-underline">
          RSVP
        </a>
        <button type="button" className="cb-btn-ghost !py-3 !px-4 !text-[9px]" onClick={downloadIcs}>
          Save Date
        </button>
      </div>

      {/* Lightbox */}
      <div
        className={`fixed inset-0 z-[180] grid place-items-center p-6 transition-opacity duration-500 ${lightbox ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ background: 'rgba(74,48,56,.92)' }}
        onClick={() => setLightbox(null)}
      >
        <button
          type="button"
          className="absolute top-6 right-7 w-10 h-10 border border-[#F6D0DB]/50 text-[#FFF8FA] text-2xl grid place-items-center hover:bg-[#F6D0DB]/15 hover:rotate-90 transition rounded-full"
          onClick={() => setLightbox(null)}
          aria-label="Close"
        >
          ×
        </button>
        {lightbox && (
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[88vh] object-contain shadow-2xl border-2 border-[#F6D0DB] rounded-xl"
          />
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
            style={{ borderColor: 'var(--cb-rose)' }}
          />
        ))}
      </nav>
    </div>
  );
}
