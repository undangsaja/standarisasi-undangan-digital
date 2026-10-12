import React from 'react';

/**
 * ScreenOrnaments:
 * Menampilkan ornamen sudut atas-kiri.png dan atas-kanan.png
 * dengan animasi bergoyang lembut (smooth breeze sway) di semua halaman kecuali Opening.
 */
export default function ScreenOrnaments({ config }) {
  const topLeftImg = config?.topLeft || '/ornaments/atas-kiri.png';
  const topRightImg = config?.topRight || '/ornaments/atas-kanan.png';

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* 1. Ornamen Pojok Kiri Atas (atas-kiri.png) */}
      <div className="absolute -top-2 -left-2 w-36 h-36 sm:w-44 sm:h-44 animate-ornament-tl">
        <img 
          src={topLeftImg} 
          alt="Ornamen Kiri Atas" 
          className="w-full h-full object-contain drop-shadow-md transition-opacity duration-500" 
          loading="eager"
        />
      </div>

      {/* 2. Ornamen Pojok Kanan Atas (atas-kanan.png) */}
      <div className="absolute -top-2 -right-2 w-36 h-36 sm:w-44 sm:h-44 animate-ornament-tr">
        <img 
          src={topRightImg} 
          alt="Ornamen Kanan Atas" 
          className="w-full h-full object-contain drop-shadow-md transition-opacity duration-500" 
          loading="eager"
        />
      </div>
    </div>
  );
}
