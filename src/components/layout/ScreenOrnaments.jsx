import React from 'react';

/**
 * ScreenOrnaments:
 * Komponen ornamen dekoratif samping dan sudut layar dengan animasi gerak lembut.
 * Menggunakan pointer-events-none agar tidak menghalangi tombol atau form.
 */
export default function ScreenOrnaments({ config }) {
  // Gunakan gambar dari config (jika ada) atau fallback ke SVG default di /ornaments/
  const topLeftImg = config?.topLeft || '/ornaments/ornament-top-left.svg';
  const topRightImg = config?.topRight || '/ornaments/ornament-top-right.svg';
  const bottomLeftImg = config?.bottomLeft || '/ornaments/ornament-bottom-left.svg';
  const bottomRightImg = config?.bottomRight || '/ornaments/ornament-bottom-right.svg';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Pojok Kiri Atas (Top-Left) - Bergerak lembut bergoyang */}
      <div className="absolute top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 animate-ornament-tl opacity-85 transition-opacity">
        <img 
          src={topLeftImg} 
          alt="Ornamen Kiri Atas" 
          className="w-full h-full object-contain filter drop-shadow-sm" 
          loading="eager"
        />
      </div>

      {/* 2. Pojok Kanan Atas (Top-Right) - Bergerak lembut bergoyang */}
      <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 animate-ornament-tr opacity-85 transition-opacity">
        <img 
          src={topRightImg} 
          alt="Ornamen Kanan Atas" 
          className="w-full h-full object-contain filter drop-shadow-sm" 
          loading="eager"
        />
      </div>

      {/* 3. Pojok Kiri Bawah (Bottom-Left) - Melayang perlahan naik-turun */}
      <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-36 sm:h-36 animate-ornament-bl opacity-80 transition-opacity">
        <img 
          src={bottomLeftImg} 
          alt="Ornamen Kiri Bawah" 
          className="w-full h-full object-contain filter drop-shadow-sm" 
          loading="eager"
        />
      </div>

      {/* 4. Pojok Kanan Bawah (Bottom-Right) - Melayang perlahan naik-turun */}
      <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-36 sm:h-36 animate-ornament-br opacity-80 transition-opacity">
        <img 
          src={bottomRightImg} 
          alt="Ornamen Kanan Bawah" 
          className="w-full h-full object-contain filter drop-shadow-sm" 
          loading="eager"
        />
      </div>
    </div>
  );
}

