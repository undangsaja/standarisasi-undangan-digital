import React, { useRef, useEffect } from 'react';
import { 
  Home, 
  Heart, 
  Quote, 
  Calendar, 
  Clock, 
  Image as ImageIcon, 
  MessageSquareHeart, 
  Gift, 
  Sparkles
} from 'lucide-react';

const PAGES = [
  { id: 'opening', label: 'Cover', icon: Home },
  { id: 'couple', label: 'Mempelai', icon: Heart },
  { id: 'quotes', label: 'Quotes', icon: Quote },
  { id: 'event', label: 'Acara', icon: Calendar },
  { id: 'countdown', label: 'Waktu', icon: Clock },
  { id: 'gallery', label: 'Galeri', icon: ImageIcon },
  { id: 'rsvp', label: 'RSVP', icon: MessageSquareHeart },
  { id: 'gift', label: 'Hadiah', icon: Gift },
  { id: 'thanks', label: 'Penutup', icon: Sparkles },
];

export default function FloatingNavbar({ isUnlocked, activePage, onSelectPage }) {
  const scrollContainerRef = useRef(null);

  // Auto-scroll active tab into view inside the 4-item visible scroll window
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector(`[data-nav-id="${activePage}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activePage]);

  if (!isUnlocked) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
      {/* Clean Monochrome Floating Pill Navbar (4 items visible at a time, scrollable horizontally) */}
      <nav 
        ref={scrollContainerRef}
        aria-label="Menu Undangan"
        className="pointer-events-auto w-full max-w-[330px] rounded-full py-1.5 px-2 bg-neutral-950/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.65)] border border-white/20 flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PAGES.map((page) => {
          const Icon = page.icon;
          const isActive = activePage === page.id;

          return (
            <button
              key={page.id}
              data-nav-id={page.id}
              onClick={() => onSelectPage(page.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-200 shrink-0 min-w-[25%] w-1/4 snap-center ${
                isActive 
                  ? 'text-white scale-105 font-bold' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title={page.label}
              aria-label={page.label}
            >
              {/* Active Highlight Glow */}
              {isActive && (
                <span className="absolute inset-x-1 inset-y-0.5 bg-white/15 rounded-full -z-10 border border-white/35 shadow-inner" />
              )}
              
              <Icon size={18} className={isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'} />
              <span className={`text-[9.5px] mt-0.5 tracking-tight whitespace-nowrap ${
                isActive ? 'text-white font-bold' : 'font-medium opacity-80'
              }`}>
                {page.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
