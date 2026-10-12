import React from 'react';

/**
 * ScreenOrnaments:
 * Menampilkan ornamen sudut atas-kiri.png & atas-kanan.png beserta
 * sambungan ranting bawahnya (atas2-kiri.png & atas2-kanan.png) yang menyatu
 * dan bergerak serempak seperti satu rangkaian bunga gantung.
 */
export default function ScreenOrnaments({ config }) {
  const topLeftImg = config?.topLeft || '/ornaments/atas-kiri.png';
  const topRightImg = config?.topRight || '/ornaments/atas-kanan.png';
  const topLeftSubImg = config?.topLeftSub;
  const topRightSubImg = config?.topRightSub;

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* 1. Rangkaian Ornamen Kiri Atas (atas-kiri.png + sambungan atas2-kiri.png di bawahnya) */}
      <div className="absolute -top-2 -left-2 animate-ornament-tl">
        {/* Ornamen Utama Pojok Kiri Atas (Lapisan Depan z-20) */}
        <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44">
          <img 
            src={topLeftImg} 
            alt="Ornamen Kiri Atas" 
            className="w-full h-full object-contain drop-shadow-md transition-opacity duration-500" 
            loading="eager"
          />
        </div>

        {/* Ornamen Sambungan Bawah Kiri (atas2-kiri.png - Lapisan Belakang z-10 agar tangkai menyatu) */}
        {topLeftSubImg && (
          <div className="absolute top-[74px] sm:top-[90px] -left-[26px] sm:-left-[32px] z-10 w-32 h-32 sm:w-40 sm:h-40 animate-ornament-sub-tl">
            <img 
              src={topLeftSubImg} 
              alt="Ornamen Sambungan Kiri" 
              className="w-full h-full object-contain drop-shadow-sm transition-opacity duration-500" 
              loading="eager"
            />
          </div>
        )}
      </div>

      {/* 2. Rangkaian Ornamen Kanan Atas (atas-kanan.png + sambungan atas2-kanan.png di bawahnya) */}
      <div className="absolute -top-2 -right-2 animate-ornament-tr">
        {/* Ornamen Utama Pojok Kanan Atas (Lapisan Depan z-20) */}
        <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44">
          <img 
            src={topRightImg} 
            alt="Ornamen Kanan Atas" 
            className="w-full h-full object-contain drop-shadow-md transition-opacity duration-500" 
            loading="eager"
          />
        </div>

        {/* Ornamen Sambungan Bawah Kanan (atas2-kanan.png - Lapisan Belakang z-10 agar tangkai menyatu) */}
        {topRightSubImg && (
          <div className="absolute top-[74px] sm:top-[90px] -right-[26px] sm:-right-[32px] z-10 w-32 h-32 sm:w-40 sm:h-40 animate-ornament-sub-tr">
            <img 
              src={topRightSubImg} 
              alt="Ornamen Sambungan Kanan" 
              className="w-full h-full object-contain drop-shadow-sm transition-opacity duration-500" 
              loading="eager"
            />
          </div>
        )}
      </div>
    </div>
  );
}
