import React from 'react';

/**
 * MobileContainer:
 * Standardized fixed mobile-screen viewport (440px max-width, 100dvh height),
 * perfectly centered horizontally on laptop and desktop screens with monochrome backdrop.
 */
export default function MobileContainer({ children }) {
  return (
    <div className="h-[100dvh] w-full bg-neutral-950 flex justify-center items-center relative overflow-hidden select-none">
      {/* Ambient monochrome decorative glow for desktop monitors */}
      <div className="fixed inset-0 pointer-events-none hidden md:block overflow-hidden opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-neutral-400/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Desktop teaser text on the side */}
      <aside className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-3 text-neutral-400 max-w-xs pointer-events-none select-none">
        <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold">Standardized Mobile Screen</span>
        <h2 className="text-xl font-serif text-white">The Wedding Invitation</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Sistem navigasi berbasis halaman/tab terstandarisasi dengan tema monokrom elegan. Berpindah halaman menggunakan navbar bawah.
        </p>
      </aside>

      {/* Main Mobile Screen Viewport Container (Fixed 100dvh, No Global Page Scroll) */}
      <main className="w-full max-w-[440px] h-[100dvh] bg-neutral-50 shadow-[0_0_60px_rgba(0,0,0,0.85)] relative overflow-hidden border-x border-neutral-800 z-10 flex flex-col font-sans">
        {children}
      </main>
    </div>
  );
}
