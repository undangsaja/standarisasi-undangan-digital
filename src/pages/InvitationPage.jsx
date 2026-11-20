import React, { useEffect, useMemo, useState } from 'react';
import { SiteHeader, Petals, useReveal, useCountdown, Toast } from '../components/layout/SiteChrome';
import { DEFAULT_DRAFT } from '../data/templates';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'templates', label: 'Templates' },
  { id: 'create', label: 'Create' },
];

export default function InvitationPage({ onNavigate, draft }) {
  const data = useMemo(() => ({
    ...DEFAULT_DRAFT,
    ...(draft || {}),
    groom: { ...DEFAULT_DRAFT.groom, ...(draft?.groom || {}) },
    bride: { ...DEFAULT_DRAFT.bride, ...(draft?.bride || {}) },
    akad: { ...DEFAULT_DRAFT.akad, ...(draft?.akad || {}) },
    reception: { ...DEFAULT_DRAFT.reception, ...(draft?.reception || {}) },
    story: draft?.story?.length ? draft.story : DEFAULT_DRAFT.story,
    gallery: draft?.gallery?.length ? draft.gallery : DEFAULT_DRAFT.gallery,
  }), [draft]);

  const [unlocked, setUnlocked] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [wishes, setWishes] = useState([
    {
      name: 'Rizky & Amelia',
      meta: 'Family Friend · 2 Days Ago',
      text: 'May your home always be filled with patience, laughter, and endless blessings.',
    },
    {
      name: 'The Santoso Family',
      meta: 'Family · 4 Days Ago',
      text: 'We have watched you grow into such beautiful souls. May this marriage be a source of mercy and joy.',
    },
  ]);
  const [toast, setToast] = useState('');
  const [rsvp, setRsvp] = useState({
    name: '', attend: 'Joyfully Accept', guests: '2 Guests', msg: '',
  });
  const [showFloat, setShowFloat] = useState(false);

  const rootRef = useReveal([unlocked]);
  const countdown = useCountdown(data.date);

  useEffect(() => {
    if (unlocked) {
      document.body.classList.remove('locked');
      const t = setTimeout(() => setShowPetals(true), 400);
      return () => clearTimeout(t);
    }
    document.body.classList.add('locked');
    return () => document.body.classList.remove('locked');
  }, [unlocked]);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openInvitation = () => {
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const submitRsvp = (e) => {
    e.preventDefault();
    if (rsvp.name.trim().length < 2) {
      showToast('Please enter your name');
      return;
    }
    setWishes((prev) => [{
      name: rsvp.name.trim(),
      meta: `${rsvp.attend} · ${rsvp.guests} · Just Now`,
      text: rsvp.msg.trim() || 'Congratulations to the happy couple!',
    }, ...prev]);
    setRsvp({ name: '', attend: 'Joyfully Accept', guests: '2 Guests', msg: '' });
    showToast('Thank you — your RSVP has been sent');
  };

  const downloadIcs = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:wedding-invitation@undangaja',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261223T030000Z',
      'DTEND:20261223T140000Z',
      `SUMMARY:Wedding of ${data.groom.short} & ${data.bride.short}`,
      'DESCRIPTION:Akad Nikah & Reception',
      `LOCATION:${data.venue}, ${data.city}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-invitation.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    showToast('Calendar file downloaded');
  };

  const initials = `${(data.groom.short || 'M')[0]}&${(data.bride.short || 'I')[0]}`;

  /* ---------- Opening Veil ---------- */
  const veil = (
    <div
      id="veil"
      className={`fixed inset-0 z-[90] grid place-items-center text-center transition-[opacity,visibility] duration-[1.1s] ${unlocked ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, rgba(255,250,240,.9), rgba(238,224,202,.96) 55%, rgba(216,192,157,.98)), #EFE2CF',
      }}
    >
      <svg
        className="absolute -top-10 -left-12 w-[min(46vw,330px)] opacity-55 rotate-[8deg] pointer-events-none max-md:w-[56vw] max-md:-left-10 max-md:-top-6"
        viewBox="0 0 480 360"
      >
        <use href="#cluster-a" />
      </svg>
      <svg
        className="absolute -bottom-14 -right-12 w-[min(50vw,360px)] opacity-55 scale-[-1,-1] pointer-events-none max-md:w-[58vw] max-md:-right-8 max-md:-bottom-8"
        viewBox="0 0 480 360"
      >
        <use href="#cluster-a" />
      </svg>

      <div className="relative z-[2] px-6 max-w-[520px]">
        <p
          className="text-[clamp(11px,2.6vw,13px)] tracking-[.52em] uppercase text-gold-deep font-normal mb-5 opacity-0"
          style={{ animation: 'fadeUp .9s .3s cubic-bezier(.22,1,.36,1) forwards' }}
        >
          The Wedding Of
        </p>
        <h1
          className="font-display font-normal text-[clamp(38px,10vw,68px)] leading-[1.02] opacity-0"
          style={{ animation: 'fadeUp 1s .5s cubic-bezier(.22,1,.36,1) forwards' }}
        >
          {data.groom.short}
          <span className="font-script text-gold text-[.62em] block my-[.06em]">&amp;</span>
          {data.bride.short}
        </h1>
        <p
          className="mt-6 mb-8 text-[12px] tracking-[.36em] uppercase text-ink-soft opacity-0"
          style={{ animation: 'fadeUp 1s .75s cubic-bezier(.22,1,.36,1) forwards' }}
        >
          {data.dateLabel}
        </p>
        <p
          className="mb-7 font-display italic text-[clamp(16px,3.8vw,20px)] text-ink-soft opacity-0"
          style={{ animation: 'fadeUp 1s .95s cubic-bezier(.22,1,.36,1) forwards' }}
        >
          Kepada Yth. Bapak/Ibu/Saudara/i
          <strong className="font-display not-italic font-semibold text-ink block mt-1.5 text-[1.18em]">
            Tamu Undangan
          </strong>
        </p>
        <button
          type="button"
          className="btn-gold opacity-0"
          style={{ animation: 'fadeUp .9s 1.15s cubic-bezier(.22,1,.36,1) forwards' }}
          onClick={openInvitation}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 6h16v12H4zM4 6l8 6 8-6" />
          </svg>
          Open Invitation
        </button>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px)} to {opacity:1; transform:none} }
      `}</style>
    </div>
  );

  /* ---------- Main invitation (unlocked) ---------- */
  if (!unlocked) {
    return (
      <div className="relative min-h-dvh">
        <style>{fadeUpStyle}</style>
        {veil}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative min-h-dvh">
      <style>{fadeUpStyle}</style>
      {showPetals && <Petals count={16} />}
      <Toast show={!!toast}>{toast}</Toast>

      {/* Side nav (desktop) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[70] hidden xl:flex flex-col gap-4">
        {[
          ['home', 'Home'],
          ['countdown', 'Countdown'],
          ['couple', 'Couple'],
          ['story', 'Story'],
          ['events', 'Events'],
          ['gallery', 'Gallery'],
          ['rsvp', 'RSVP'],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            data-label={label}
            className="w-2.5 h-2.5 border border-gold rotate-45 relative group transition hover:bg-gold-deep hover:scale-125"
          >
            <span className="absolute right-5 top-1/2 -translate-y-1/2 -rotate-45 origin-right whitespace-nowrap text-[9px] tracking-[.28em] uppercase text-gold-deep opacity-0 group-hover:opacity-100 transition pointer-events-none">
              {label}
            </span>
          </a>
        ))}
      </nav>

      {/* Floating actions */}
      <div
        className={`fixed left-1/2 bottom-6 z-[80] -translate-x-1/2 flex gap-2.5 transition-transform duration-700 ${showFloat ? 'translate-y-0' : 'translate-y-[130%]'}`}
      >
        <a className="fa-btn" href="#rsvp">
          RSVP
        </a>
        <button type="button" className="fa-btn solid" onClick={downloadIcs}>
          Save Date
        </button>
        <button type="button" className="fa-btn" onClick={() => onNavigate('create')}>
          Edit
        </button>
      </div>

      <style>{faStyle}</style>

      <SiteHeader
        nav={NAV}
        active="invitation"
        onNavigate={onNavigate}
        right={
          <span className="hidden sm:inline text-[10px] tracking-[.24em] uppercase text-gold-deep border border-gold px-3 py-2">
            Live Preview
          </span>
        }
      />

      <main className="relative z-10">
        {/* HERO */}
        <section id="home" className="relative min-h-[100svh] grid place-items-center py-28 px-6 overflow-hidden text-center">
          <svg className="absolute -top-[6%] -left-[8%] w-[min(52vw,470px)] pointer-events-none z-[2] max-md:w-[70vw] max-md:-left-[18%]" viewBox="0 0 480 360">
            <use href="#cluster-a" />
          </svg>
          <svg className="absolute -bottom-[9%] -right-[8%] w-[min(56vw,510px)] pointer-events-none z-[2] scale-[-1,-1] max-md:w-[75vw] max-md:-right-[20%]" viewBox="0 0 480 360">
            <use href="#cluster-a" />
          </svg>
          <svg
            className="absolute -left-[10%] -bottom-[6%] w-[min(70vw,760px)] opacity-55 z-[1] pointer-events-none animate-silk max-md:w-[90vw]"
            viewBox="0 0 800 320"
            aria-hidden="true"
          >
            <path d="M-20 260C120 150 300 300 460 190 610 88 720 150 820 96V340H-20Z" fill="#e7d3b2" opacity=".5" />
            <path d="M-20 300C140 210 320 330 500 230 640 152 740 210 820 160V340H-20Z" fill="#dcc39b" opacity=".42" />
            <path d="M-20 246C120 136 300 286 460 176 610 74 720 136 820 82" fill="none" stroke="#c9a96e" strokeWidth="1.6" opacity=".7" />
          </svg>

          <div className="relative z-[4] max-w-[760px] w-full mx-auto">
            <div className="reveal w-[clamp(112px,17vw,158px)] h-[clamp(112px,17vw,158px)] mx-auto mb-8 relative grid place-items-center animate-floaty">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="66" fill="none" stroke="#B08B4E" strokeWidth="1.1" strokeDasharray="420" strokeDashoffset="420" style={{ animation: 'draw 2.2s .3s cubic-bezier(.22,1,.36,1) forwards' }} />
                <circle cx="80" cy="80" r="53" fill="none" stroke="#B08B4E" strokeWidth="1.1" strokeDasharray="330" strokeDashoffset="330" opacity=".6" style={{ animation: 'draw 2.2s .55s cubic-bezier(.22,1,.36,1) forwards' }} />
                <path d="M80 4v12M80 144v12M4 80h12M144 80h12" stroke="#B08B4E" strokeWidth="1.2" />
              </svg>
              <div className="font-display text-[clamp(40px,7vw,58px)] font-medium tracking-[-.06em] flex items-center justify-center leading-none">
                <span className="text-gold-deep">{initials.split('&')[0]}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold mx-2 self-center" />
                <span className="text-ink translate-y-1.5 -ml-3">{initials.split('&')[1]}</span>
              </div>
            </div>

            <p className="reveal text-[clamp(10px,2.4vw,13px)] tracking-[.56em] uppercase text-gold-deep font-normal" style={{ '--d': '.12s' }}>
              The Wedding Of
            </p>

            <h1 className="reveal font-display font-normal text-[clamp(36px,8vw,92px)] leading-[1] tracking-tight mt-5 mb-1.5" style={{ '--d': '.22s' }}>
              <span className="shimmer-text">{data.groom.fullName}</span>
            </h1>

            <div className="reveal font-script text-[clamp(36px,7vw,64px)] text-gold leading-none my-1.5 relative inline-block" style={{ '--d': '.34s' }}>
              and
            </div>

            <h1 className="reveal font-display font-normal text-[clamp(36px,8vw,92px)] leading-[1] tracking-tight mb-1.5" style={{ '--d': '.42s' }}>
              <span className="shimmer-text">{data.bride.fullName}</span>
            </h1>

            <div className="divider-diamond reveal mt-8" style={{ '--d': '.5s' }}>
              <span className="line" />
              <span className="dia sm" />
              <span className="dia" />
              <span className="dia sm" />
              <span className="line" />
            </div>

            <p className="reveal font-display italic font-light text-[clamp(16px,2.5vw,21px)] leading-[1.9] text-ink-soft max-w-[520px] mx-auto mt-8" style={{ '--d': '.58s' }}>
              With great joy and gratitude to Allah SWT, we cordially request the honor of your presence at the wedding of our beloved children.
            </p>

            <div className="reveal flex items-center justify-center gap-4 md:gap-10 mt-10 flex-wrap" style={{ '--d': '.66s' }}>
              <span className="text-[clamp(11px,2.4vw,14px)] tracking-[.32em] uppercase text-ink-soft">
                {data.weekday}
              </span>
              <span className="font-display text-[clamp(58px,12vw,104px)] leading-[.9] text-ink relative px-3 md:px-6">
                <span className="absolute top-[6%] left-0 h-[88%] w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
                <span className="absolute top-[6%] right-0 h-[88%] w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
                {data.day}
              </span>
              <span className="text-[clamp(11px,2.4vw,14px)] tracking-[.32em] uppercase text-ink-soft">
                {data.monthSide}
              </span>
            </div>

            <div className="reveal flex justify-center gap-6 md:gap-14 mt-8 flex-wrap" style={{ '--d': '.74s' }}>
              <span className="flex items-center gap-2.5 text-[clamp(13px,2.4vw,16px)] tracking-[.16em] uppercase text-ink-soft">
                <svg width="19" height="19" viewBox="0 0 48 48"><use href="#ico-clock" /></svg>
                {data.time}
              </span>
              <span className="flex items-center gap-2.5 text-[clamp(13px,2.4vw,16px)] tracking-[.16em] uppercase text-ink-soft">
                <svg width="19" height="19" viewBox="0 0 48 48"><use href="#ico-pin" /></svg>
                {data.city}, {data.venue}
              </span>
            </div>

            <div className="reveal mt-14 flex flex-col items-center gap-3" style={{ '--d': '.86s' }}>
              <span className="text-[10px] tracking-[.42em] uppercase text-gold-deep">Scroll</span>
              <div className="w-[23px] h-[37px] border border-gold rounded-[14px] relative">
                <span className="absolute top-[7px] left-1/2 -translate-x-1/2 w-[3px] h-[7px] rounded-[3px] bg-gold" style={{ animation: 'wheel 1.9s cubic-bezier(.22,1,.36,1) infinite' }} />
              </div>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section id="countdown" className="relative overflow-hidden text-cream py-16 md:py-24 px-6" style={{
          background: 'linear-gradient(115deg, rgba(138,102,38,.96), rgba(177,137,74,.92) 42%, rgba(203,168,104,.95) 62%, rgba(138,102,38,.96))',
        }}>
          <div className="absolute inset-0 opacity-16 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='none' stroke='%23fff6e2' stroke-width='.9'%3E%3Cpath d='M60 8c16 12 16 32 0 42-16-10-16-30 0-42z'/%3E%3Cpath d='M60 70c16 10 16 30 0 42-16-12-16-32 0-42z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div className="relative wrap max-w-[880px] mx-auto">
            <h2 className="reveal font-display font-light text-[clamp(26px,4.6vw,42px)] text-center">
              Counting every moment until we say “I do”
            </h2>
            <p className="reveal text-center mt-3 text-[11px] tracking-[.5em] uppercase opacity-85" style={{ '--d': '.12s' }}>
              Save The Date
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-10">
              {[
                [countdown.d, 'Days'],
                [countdown.h, 'Hours'],
                [countdown.m, 'Minutes'],
                [countdown.s, 'Seconds'],
              ].map(([num, lab], i) => (
                <div
                  key={lab}
                  className="reveal bg-cream/15 border border-cream/30 py-4 md:py-7 px-2 rounded-[4px] backdrop-blur-[3px] text-center"
                  style={{ '--d': `${0.06 + i * 0.1}s` }}
                >
                  <span className="block font-display text-[clamp(32px,7vw,62px)] leading-none tabular-nums">{num}</span>
                  <span className="block mt-2.5 text-[clamp(9px,1.9vw,11px)] tracking-[.32em] uppercase opacity-85">{lab}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COUPLE */}
        <section id="couple" className="py-24 md:py-36 px-6">
          <div className="max-w-[1120px] mx-auto">
            <p className="sec-eyebrow reveal">Bride &amp; Groom</p>
            <h2 className="sec-title reveal" style={{ '--d': '.1s' }}>
              Two hearts, <em>one</em> journey
            </h2>
            <p className="reveal text-center max-w-[620px] mx-auto mt-5 font-display text-[clamp(17px,2.4vw,21px)] leading-[1.85] font-light text-ink-soft" style={{ '--d': '.18s' }}>
              By the blessing of Allah SWT and with the love of our families, we are honored to begin this beautiful chapter together.
            </p>

            <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-12 mt-14">
              <div className="text-center reveal-l">
                <div className="relative w-[min(330px,72vw)] mx-auto mb-6 aspect-[4/5]">
                  <div className="absolute inset-0 border border-gold rounded-t-[190px] rounded-b-[4px] translate-x-3 translate-y-3 transition-transform duration-700 group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]" />
                  <div className="absolute inset-0 border border-gold rounded-t-[190px] rounded-b-[4px] overflow-hidden bg-gradient-to-br from-ivory-400 to-ivory-300 shadow-[0_26px_60px_rgba(120,92,54,.24)] group">
                    <img
                      src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=900&q=80"
                      alt="Groom"
                      className="w-full h-full object-cover transition-transform duration-[1.3s] hover:scale-105 saturate-[.82]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="font-display text-[clamp(25px,4vw,38px)] leading-tight">{data.groom.fullName}</h3>
                <p className="mt-2.5 text-[10px] tracking-[.44em] uppercase text-gold-deep">The Groom</p>
                <p className="mt-3.5 font-display text-base leading-[1.7] text-ink-soft">
                  Son of
                  <strong className="block text-ink font-medium text-[1.12em] tracking-wide mt-0.5">{data.groom.parents}</strong>
                </p>
              </div>

              <div className="reveal font-script text-[clamp(52px,9vw,102px)] text-gold leading-none animate-floaty hidden md:block" style={{ '--d': '.2s' }}>
                &amp;
              </div>

              <div className="text-center reveal-r" style={{ '--d': '.14s' }}>
                <div className="relative w-[min(330px,72vw)] mx-auto mb-6 aspect-[4/5]">
                  <div className="absolute inset-0 border border-gold rounded-t-[190px] rounded-b-[4px] translate-x-3 translate-y-3" />
                  <div className="absolute inset-0 border border-gold rounded-t-[190px] rounded-b-[4px] overflow-hidden bg-gradient-to-br from-ivory-400 to-ivory-300 shadow-[0_26px_60px_rgba(120,92,54,.24)] group">
                    <img
                      src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"
                      alt="Bride"
                      className="w-full h-full object-cover transition-transform duration-[1.3s] hover:scale-105 saturate-[.82]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="font-display text-[clamp(25px,4vw,38px)] leading-tight">{data.bride.fullName}</h3>
                <p className="mt-2.5 text-[10px] tracking-[.44em] uppercase text-gold-deep">The Bride</p>
                <p className="mt-3.5 font-display text-base leading-[1.7] text-ink-soft">
                  Daughter of
                  <strong className="block text-ink font-medium text-[1.12em] tracking-wide mt-0.5">{data.bride.parents}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="py-24 md:py-36 px-6" style={{ background: 'linear-gradient(180deg,transparent,rgba(232,216,193,.42),transparent)' }}>
          <div className="max-w-[760px] mx-auto">
            <p className="sec-eyebrow reveal">Our Journey</p>
            <h2 className="sec-title reveal" style={{ '--d': '.1s' }}>
              A story written <em>by</em> grace
            </h2>
            <p className="reveal text-center max-w-[620px] mx-auto mt-5 font-display text-[clamp(17px,2.4vw,21px)] leading-[1.85] font-light text-ink-soft" style={{ '--d': '.18s' }}>
              Every step brought us closer to the moment we now invite you to share.
            </p>

            <div className="relative mt-14 pl-10 md:pl-14">
              <div className="absolute left-3 md:left-5 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
              {data.story.map((item, i) => (
                <div key={item.year} className="relative pb-10 md:pb-14 reveal" style={{ '--d': `${i * 0.08}s` }}>
                  <span className="absolute -left-10 md:-left-14 top-2 w-3.5 h-3.5 bg-ivory-200 border border-gold rotate-45" />
                  <p className="text-[11px] tracking-[.42em] uppercase text-gold-deep">{item.year}</p>
                  <h3 className="font-display text-[clamp(22px,3.4vw,30px)] mt-2.5 mb-2.5 text-ink-deep">{item.title}</h3>
                  <p className="font-display text-[17px] leading-[1.95] text-ink-soft font-light max-w-[560px]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="py-24 md:py-36 px-6" style={{
          background:
            'radial-gradient(ellipse at 20% 10%, rgba(230,201,146,.28), transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(138,154,124,.18), transparent 55%)',
        }}>
          <div className="max-w-[1120px] mx-auto">
            <p className="sec-eyebrow reveal">Save The Date</p>
            <h2 className="sec-title reveal" style={{ '--d': '.1s' }}>
              Wedding <em>Events</em>
            </h2>
            <p className="reveal text-center max-w-[620px] mx-auto mt-5 font-display text-[clamp(17px,2.4vw,21px)] leading-[1.85] font-light text-ink-soft" style={{ '--d': '.18s' }}>
              It would be an honor to have you with us as we begin our new life together.
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
              {[data.akad, data.reception, {
                title: 'Wedding Blessing',
                time: 'Thursday, 24 December 2026 · 09.00 AM — 11.00 AM',
                place: 'Family Residence',
                address: data.venue,
                maps: data.akad.maps,
              }].map((ev, i) => (
                <article
                  key={ev.title}
                  className="reveal group relative bg-cream/70 border border-gold/30 py-10 px-6 md:px-8 text-center overflow-hidden backdrop-blur-[6px] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_32px_66px_rgba(120,92,54,.22)] hover:border-gold"
                  style={{ '--d': `${0.08 + i * 0.12}s` }}
                >
                  <div className="absolute inset-2.5 border border-gold/20 pointer-events-none transition-all duration-500 group-hover:inset-4" />
                  <div className="w-14 h-14 mx-auto mb-5 grid place-items-center rounded-full bg-gradient-to-br from-gold-light/40 to-gold/15 border border-line">
                    <svg width="25" height="25" viewBox="0 0 48 48">
                      <use href={i === 0 ? '#ico-clock' : i === 1 ? '#rings' : '#crown'} />
                    </svg>
                  </div>
                  <h3 className="font-display text-[clamp(25px,3.6vw,33px)] text-ink-deep">{ev.title}</h3>
                  <p className="mt-3.5 text-[12px] tracking-[.3em] uppercase text-gold-deep">{data.dateLabel}</p>
                  <p className="mt-3 font-display text-[18px] leading-[1.75] text-ink-soft">{ev.time}</p>
                  <p className="mt-1.5 font-display text-[18px] leading-[1.75] text-ink-soft">{ev.place}</p>
                  <p className="mt-1.5 text-[13px] text-ink-soft/90 leading-[1.8]">{ev.address}</p>
                  <a
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-gold rounded-full text-[10.5px] tracking-[.3em] uppercase text-gold-deep no-underline transition hover:bg-gold-deep hover:text-cream hover:tracking-[.36em] hover:border-gold-deep"
                    href={ev.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Map
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="py-24 md:py-36 px-6">
          <div className="max-w-[1120px] mx-auto">
            <p className="sec-eyebrow reveal">Moments</p>
            <h2 className="sec-title reveal" style={{ '--d': '.1s' }}>
              Our <em>Gallery</em>
            </h2>
            <p className="reveal text-center max-w-[620px] mx-auto mt-5 font-display text-[clamp(17px,2.4vw,21px)] leading-[1.85] font-light text-ink-soft" style={{ '--d': '.18s' }}>
              A few frames from the days that led us here.
            </p>

            <div className="grid grid-cols-12 gap-3 md:gap-5 mt-12">
              {[
                'col-span-12 md:col-span-7 aspect-[4/3]',
                'col-span-12 md:col-span-5 aspect-[3/4]',
                'col-span-6 md:col-span-4 aspect-square',
                'col-span-6 md:col-span-4 aspect-square',
                'col-span-12 md:col-span-4 aspect-square md:aspect-square',
              ].map((cls, i) => {
                const item = data.gallery[i] || data.gallery[0];
                return (
                  <figure
                    key={i}
                    className={`reveal relative overflow-hidden cursor-pointer bg-ivory-400 group ${cls}`}
                    style={{ '--d': `${0.06 + i * 0.08}s` }}
                    onClick={() => setLightbox(item.src.replace(/w=\d+/, 'w=1600'))}
                  >
                    <img
                      src={item.src}
                      alt={item.cap}
                      className="w-full h-full object-cover transition-transform duration-[1.25s] group-hover:scale-110 saturate-[.8] brightness-[1.02] group-hover:saturate-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/55 opacity-0 transition group-hover:opacity-100" />
                    <figcaption className="absolute left-5 bottom-4 z-[2] text-cream font-display italic text-[17px] translate-y-3.5 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      {item.cap}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="text-center py-24 md:py-36 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#EFE2CF,#E8D8C1)' }}>
          <div className="max-w-[900px] mx-auto">
            <span className="reveal block font-display text-[clamp(120px,22vw,240px)] leading-[.62] text-gold/20 h-[.42em]">
              “
            </span>
            <p className="reveal font-display italic font-light text-[clamp(21px,3.6vw,38px)] leading-[1.62] mt-7" style={{ '--d': '.12s' }}>
              {data.quote}
            </p>
            <p className="reveal mt-7 text-[11px] tracking-[.44em] uppercase text-gold-deep" style={{ '--d': '.24s' }}>
              {data.quoteSource}
            </p>
            <div className="divider-diamond reveal mt-9" style={{ '--d': '.32s' }}>
              <span className="line" />
              <span className="dia sm" />
              <span className="dia" />
              <span className="dia sm" />
              <span className="line" />
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="py-24 md:py-36 px-6">
          <div className="max-w-[1120px] mx-auto">
            <p className="sec-eyebrow reveal">R.S.V.P</p>
            <h2 className="sec-title reveal" style={{ '--d': '.1s' }}>
              Will you <em>join</em> us?
            </h2>
            <p className="reveal text-center max-w-[620px] mx-auto mt-5 font-display text-[clamp(17px,2.4vw,21px)] leading-[1.85] font-light text-ink-soft" style={{ '--d': '.18s' }}>
              Kindly confirm your attendance and leave a prayer for the newlyweds.
            </p>

            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 mt-12 items-start">
              <div className="reveal-l card-ivory p-7 md:p-10 backdrop-blur-[6px]">
                <div className="absolute inset-3 border border-line/70 pointer-events-none" />
                <form className="relative z-10" onSubmit={submitRsvp} noValidate>
                  <div className="mb-5">
                    <label className="field-label" htmlFor="rsvpName">Your Name</label>
                    <input
                      id="rsvpName"
                      className="field-input"
                      placeholder="e.g. Andi & Family"
                      value={rsvp.name}
                      onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <span className="field-label">Will You Attend?</span>
                    <div className="flex gap-3 flex-wrap">
                      {['Joyfully Accept', 'Regretfully Decline'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`flex-1 min-w-[140px] text-center py-3.5 px-3 border text-[11px] tracking-[.22em] uppercase transition ${
                            rsvp.attend === opt
                              ? 'bg-gold-deep text-cream border-gold-deep tracking-[.26em]'
                              : 'border-gold/40 text-ink-soft hover:border-gold'
                          }`}
                          onClick={() => setRsvp({ ...rsvp, attend: opt })}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="field-label" htmlFor="rsvpGuests">Number of Guests</label>
                    <select
                      id="rsvpGuests"
                      className="field-input"
                      value={rsvp.guests}
                      onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                    >
                      {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'].map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="field-label" htmlFor="rsvpMsg">Prayer &amp; Wish</label>
                    <textarea
                      id="rsvpMsg"
                      className="field-input resize-y min-h-[92px] leading-[1.7]"
                      placeholder="Write your wish for the couple..."
                      value={rsvp.msg}
                      onChange={(e) => setRsvp({ ...rsvp, msg: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full">
                    Send RSVP
                  </button>
                  <p className="mt-4 text-[12px] text-ink-soft/80 leading-[1.8]">
                    Your response will be recorded and shared with both families.
                  </p>
                </form>
              </div>

              <div className="reveal-r" style={{ '--d': '.14s' }}>
                <p className="sec-eyebrow !justify-start mb-6">
                  <span className="w-10 h-px bg-gradient-to-r from-transparent to-gold" />
                  Wishes
                </p>
                <div className="flex flex-col gap-3.5">
                  {wishes.map((w, i) => (
                    <article
                      key={`${w.name}-${i}`}
                      className="relative bg-cream/65 border border-gold/25 px-6 py-5.5 py-6"
                      style={{ animation: 'wishIn .7s cubic-bezier(.22,1,.36,1) both', animationDelay: `${i * 0.06}s` }}
                    >
                      <span className="absolute left-0 top-4 bottom-4 w-0.5 bg-gold" />
                      <h4 className="font-display text-[19px] text-ink-deep">{w.name}</h4>
                      <p className="text-[9.5px] tracking-[.32em] uppercase text-gold-deep mt-1.5">{w.meta}</p>
                      <p className="mt-2.5 font-display text-[16.5px] leading-[1.82] text-ink-soft font-light">{w.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative text-center overflow-hidden pt-24 md:pt-36 pb-16 px-6" style={{ background: 'linear-gradient(180deg,#F3E8D7,#E6D4B8)' }}>
          <svg width="120" height="72" viewBox="0 0 132 78" className="mx-auto mb-7" aria-hidden="true">
            <circle cx="50" cy="45" r="25" fill="none" stroke="#8B6729" strokeWidth="2.2" />
            <circle cx="82" cy="45" r="25" fill="none" stroke="#8B6729" strokeWidth="2.2" />
          </svg>
          <p className="reveal font-display italic text-[clamp(20px,3.4vw,30px)] text-ink-soft">
            “Your presence will make our happiness more complete.”
          </p>
          <h2 className="reveal font-display text-[clamp(32px,6vw,58px)] mt-4 mb-2" style={{ '--d': '.2s' }}>
            <span className="shimmer-text">{data.groom.short} &amp; {data.bride.short}</span>
          </h2>
          <div className="divider-diamond reveal mt-6" style={{ '--d': '.28s' }}>
            <span className="line" />
            <span className="dia sm" />
            <span className="dia" />
            <span className="dia sm" />
            <span className="line" />
          </div>
          <p className="reveal mt-5 text-[11px] tracking-[.42em] uppercase text-gold-deep" style={{ '--d': '.36s' }}>
            With love, the Families
          </p>
          <p className="reveal mt-3 text-[10px] tracking-[.32em] uppercase text-ink-soft/70" style={{ '--d': '.44s' }}>
            {data.city} · {data.dateLabel}
          </p>
        </footer>
      </main>

      {/* Lightbox */}
      <div
        className={`fixed inset-0 z-[180] grid place-items-center p-[5vh_5vw] transition-opacity duration-500 ${lightbox ? 'opacity-100 visible' : 'opacity-0 invisible'} bg-ink/90 backdrop-blur-[5px]`}
        onClick={() => setLightbox(null)}
      >
        <button
          type="button"
          className="absolute top-6 right-7 w-10 h-10 rounded-full border border-cream/50 text-cream text-2xl grid place-items-center hover:bg-cream/15 hover:rotate-90 transition"
          onClick={() => setLightbox(null)}
          aria-label="Close"
        >
          ×
        </button>
        {lightbox && (
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[88vh] object-contain shadow-[0_40px_90px_rgba(0,0,0,.5)] scale-100"
          />
        )}
      </div>

      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0 } }
        @keyframes wheel {
          0% { opacity:0; transform: translate(-50%,-4px) }
          30% { opacity:1 }
          100% { opacity:0; transform: translate(-50%,13px) }
        }
        @keyframes wishIn {
          from { opacity:0; transform: translateY(16px) }
          to { opacity:1; transform:none }
        }
        .fa-btn {
          display:inline-flex;align-items:center;gap:9px;padding:13px 22px;border-radius:999px;
          font-size:10px;letter-spacing:.28em;text-transform:uppercase;cursor:pointer;
          border:1px solid #B08B4E;background:rgba(255,251,242,.92);color:#8B6729;
          backdrop-filter:blur(10px);box-shadow:0 14px 30px rgba(120,92,54,.2);
          transition:.5s cubic-bezier(.22,1,.36,1);text-decoration:none;font-family:Jost,sans-serif;
        }
        .fa-btn.solid { background:#8B6729;color:#fff6e6;border-color:#8B6729 }
        .fa-btn:hover { transform:translateY(-4px);letter-spacing:.32em }
        .py-5\\.5 { padding-top:1.25rem; padding-bottom:1.25rem }
      `}</style>
    </div>
  );
}

const fadeUpStyle = `
  @keyframes fadeUp { from { opacity:0; transform:translateY(22px)} to {opacity:1; transform:none} }
`;

const faStyle = `
  .fa-btn {
    display:inline-flex;align-items:center;gap:9px;padding:13px 22px;border-radius:999px;
    font-size:10px;letter-spacing:.28em;text-transform:uppercase;cursor:pointer;
    border:1px solid #B08B4E;background:rgba(255,251,242,.92);color:#8B6729;
    backdrop-filter:blur(10px);box-shadow:0 14px 30px rgba(120,92,54,.2);
    transition:.5s cubic-bezier(.22,1,.36,1);text-decoration:none;font-family:Jost,sans-serif;
  }
  .fa-btn.solid { background:#8B6729;color:#fff6e6;border-color:#8B6729 }
  .fa-btn:hover { transform:translateY(-4px);letter-spacing:.32em }
`;
