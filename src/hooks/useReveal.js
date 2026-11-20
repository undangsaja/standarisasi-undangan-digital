import React, { useEffect, useRef } from 'react';

/** Observe `.reveal` elements and add `.in` when they enter the viewport. */
export function useReveal(deps = []) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll('.reveal'));
    if (!els.length) return;

    if (reduce) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    // Immediately reveal anything already in (or near) the viewport
    const vh = window.innerHeight || 800;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        el.classList.add('in');
      }
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

    // Fallback: after a short delay, force-show any still-hidden above-fold content
    const t = setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh) el.classList.add('in');
      });
    }, 120);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return rootRef;
}

/** Animated countdown to an ISO date string. */
export function useCountdown(targetIso) {
  const targetRef = useRef(new Date(targetIso || '2026-12-23T10:00:00+07:00').getTime());
  const tickRef = useRef({ d: '00', h: '00', m: '00', s: '00' });
  const [, force] = React.useState(0);

  React.useEffect(() => {
    const tick = () => {
      let diff = targetRef.current - Date.now();
      if (diff < 0) diff = 0;
      const d = String(Math.floor(diff / 86400000)).padStart(2, '0');
      const h = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      const prev = tickRef.current;
      if (prev.d !== d || prev.h !== h || prev.m !== m || prev.s !== s) {
        tickRef.current = { d, h, m, s };
        force((n) => n + 1);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return tickRef.current;
}

export default useReveal;
