import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function GallerySection({ data }) {
  const { gallery } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const currentItem = gallery[currentIndex];

  return (
    <div className="w-full h-full max-h-[100dvh] overflow-hidden p-4 pb-24 text-stone-800 flex flex-col justify-between items-center text-center select-none">
      {/* Top Header */}
      <div className="pt-2" data-aos="fade-down" data-aos-duration="600">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.25em] text-amber-700/80 mb-0.5 block">
          Momen Kebahagiaan
        </span>
        <h2 className="font-serif text-2xl font-bold text-stone-900">
          Galeri Foto
        </h2>
      </div>

      {/* Main Hero Slider Frame */}
      <div 
        className="w-full max-w-xs flex flex-col items-center my-auto"
        data-aos="zoom-in"
        data-aos-duration="750"
      >
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md border-2 border-white bg-stone-200 group">
          <img
            src={currentItem.url}
            alt={currentItem.caption}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Left Arrow Button */}
          <button
            onClick={prevPhoto}
            aria-label="Foto Sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-md active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextPhoto}
            aria-label="Foto Selanjutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-md active:scale-90"
          >
            <ChevronRight size={18} />
          </button>

          {/* Zoom Lightbox Trigger */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Perbesar Foto"
            className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-slate-900/80 text-amber-300 hover:bg-slate-900 shadow-md backdrop-blur-sm"
          >
            <ZoomIn size={15} />
          </button>
        </div>

        {/* Caption & Counter */}
        <div className="mt-2.5 flex flex-col items-center">
          <p className="text-xs font-semibold text-stone-800">
            {currentItem.caption}
          </p>
          <span className="text-[10px] text-stone-400 mt-0.5">
            {currentIndex + 1} dari {gallery.length}
          </span>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto max-w-full py-1">
          {gallery.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-10 h-10 rounded-xl overflow-hidden transition-all shrink-0 border-2 ${
                currentIndex === idx 
                  ? 'border-amber-500 scale-105 shadow-sm' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={item.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <p className="text-[10px] text-stone-400 italic" data-aos="fade-up" data-aos-duration="600">
        Sentuh panah atau thumbnail untuk melihat koleksi foto lainnya
      </p>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
          >
            <X size={18} />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="max-w-md max-h-[85vh] flex flex-col items-center">
            <img
              src={currentItem.url}
              alt={currentItem.caption}
              className="max-w-full max-h-[75vh] rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-2 text-stone-200 text-xs font-medium">
              {currentItem.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
