import React from 'react';

/**
 * MobileContainer:
 * Standardized fixed mobile-screen viewport (440px max-width, 100dvh height),
 * perfectly centered horizontally on laptop and desktop screens with aesthetic backdrop.
 */
export default function MobileContainer({ children }) {
  return (
    <div className="h-[100dvh] w-full bg-slate-950 flex justify-center items-center relative overflow-hidden select-none">
      {/* Ambient decorative glow for desktop monitors */}
      <div className="fixed inset-0 pointer-events-none hidden md:block overflow-hidden opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-rose-600/15 blur-3xl" />
        
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Desktop teaser text on the side */}
      <aside className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-3 text-slate-400 max-w-xs pointer-events-none select-none">
        <span className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold">Standardized Mobile Screen</span>
        <h2 className="text-xl font-serif text-white/90">The Wedding Invitation</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Sistem navigasi berbasis halaman/tab terstandarisasi. Berpindah halaman menggunakan navbar bawah atau tombol navigasi.
        </p>
      </aside>

      {/* Main Mobile Screen Viewport Container (Fixed 100dvh, No Global Page Scroll) */}
      <main className="w-full max-w-[440px] h-[100dvh] bg-stone-50 shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden border-x border-slate-800/40 z-10 flex flex-col font-sans">
        {children}
      </main>
    </div>
  );
}
