import React from 'react';

/**
 * Red Elegants ornament kit — wine velvet, gold filigree, damask, roses.
 * Ported from card-references/red-elegants/red-elegants.html
 * IDs prefixed with `re-` to avoid clashing with Ivory Gold defs.
 */
export default function RedElegantDefs() {
  return (
    <svg id="re-defs" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="re-g-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a5f1c" />
          <stop offset="28%" stopColor="#e9cb8c" />
          <stop offset="55%" stopColor="#b98a35" />
          <stop offset="80%" stopColor="#f2ddad" />
          <stop offset="100%" stopColor="#8a5f1c" />
        </linearGradient>
        <linearGradient id="re-g-gold-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a5f1c" />
          <stop offset="22%" stopColor="#e2c184" />
          <stop offset="50%" stopColor="#a97e2c" />
          <stop offset="78%" stopColor="#efd7a6" />
          <stop offset="100%" stopColor="#8a5f1c" />
        </linearGradient>
        <linearGradient id="re-g-velvet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a2182a" />
          <stop offset="45%" stopColor="#7c1220" />
          <stop offset="100%" stopColor="#450910" />
        </linearGradient>
        <linearGradient id="re-g-velvet-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c22236" />
          <stop offset="60%" stopColor="#8c1523" />
          <stop offset="100%" stopColor="#520c14" />
        </linearGradient>
        <radialGradient id="re-g-rose-a" cx="38%" cy="30%">
          <stop offset="0%" stopColor="#e0404c" />
          <stop offset="52%" stopColor="#b21f2c" />
          <stop offset="100%" stopColor="#721020" />
        </radialGradient>
        <radialGradient id="re-g-rose-b" cx="42%" cy="32%">
          <stop offset="0%" stopColor="#c92c3a" />
          <stop offset="55%" stopColor="#8e1421" />
          <stop offset="100%" stopColor="#4d0a13" />
        </radialGradient>
        <linearGradient id="re-g-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5c7a2c" />
          <stop offset="60%" stopColor="#33501c" />
          <stop offset="100%" stopColor="#1f3412" />
        </linearGradient>
        <linearGradient id="re-g-parch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbf2e0" />
          <stop offset="100%" stopColor="#eddcbb" />
        </linearGradient>
        <pattern id="re-p-damask" width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#b98a35" strokeOpacity=".3" strokeWidth="1">
            <path d="M40 8 C 51 20 61 24 61 37 C 61 50 50 56 40 50 C 30 56 19 50 19 37 C 19 24 29 20 40 8 Z" />
            <path d="M40 21 C 47 29 51 31 51 38 C 51 45 45 49 40 45 C 35 49 29 45 29 38 C 29 31 33 29 40 21 Z" />
            <circle cx="40" cy="60" r="2.2" />
          </g>
        </pattern>

        {/* RED ROSE */}
        <symbol id="re-rose" viewBox="0 0 100 100">
          <g>
            <path d="M50 52 C 27 48 14 30 24 15 C 33 2 53 3 60 14 C 68 28 63 46 50 52 Z" fill="url(#re-g-rose-a)" />
            <g transform="rotate(72 50 50)">
              <path d="M50 52 C 27 48 14 30 24 15 C 33 2 53 3 60 14 C 68 28 63 46 50 52 Z" fill="url(#re-g-rose-a)" />
            </g>
            <g transform="rotate(144 50 50)">
              <path d="M50 52 C 27 48 14 30 24 15 C 33 2 53 3 60 14 C 68 28 63 46 50 52 Z" fill="url(#re-g-rose-a)" />
            </g>
            <g transform="rotate(216 50 50)">
              <path d="M50 52 C 27 48 14 30 24 15 C 33 2 53 3 60 14 C 68 28 63 46 50 52 Z" fill="url(#re-g-rose-a)" />
            </g>
            <g transform="rotate(288 50 50)">
              <path d="M50 52 C 27 48 14 30 24 15 C 33 2 53 3 60 14 C 68 28 63 46 50 52 Z" fill="url(#re-g-rose-a)" />
            </g>
            <g transform="rotate(36 50 50)">
              <path d="M50 52 C 36 50 28 39 33 30 C 38 21 51 21 56 29 C 61 39 58 48 50 52 Z" fill="url(#re-g-rose-b)" />
            </g>
            <g transform="rotate(108 50 50)">
              <path d="M50 52 C 36 50 28 39 33 30 C 38 21 51 21 56 29 C 61 39 58 48 50 52 Z" fill="url(#re-g-rose-b)" />
            </g>
            <g transform="rotate(180 50 50)">
              <path d="M50 52 C 36 50 28 39 33 30 C 38 21 51 21 56 29 C 61 39 58 48 50 52 Z" fill="url(#re-g-rose-b)" />
            </g>
            <g transform="rotate(252 50 50)">
              <path d="M50 52 C 36 50 28 39 33 30 C 38 21 51 21 56 29 C 61 39 58 48 50 52 Z" fill="url(#re-g-rose-b)" />
            </g>
            <g transform="rotate(324 50 50)">
              <path d="M50 52 C 36 50 28 39 33 30 C 38 21 51 21 56 29 C 61 39 58 48 50 52 Z" fill="url(#re-g-rose-b)" />
            </g>
            <path
              d="M50 53 c -7 -3 -9 -13 -1 -17 c 9 -4 19 2 18 11 c -1 11 -13 17 -22 11"
              fill="none"
              stroke="#4d0a13"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity=".72"
            />
            <path d="M42 40 c 4 -7 14 -9 20 -3" fill="none" stroke="#e8828c" strokeWidth="1.8" strokeLinecap="round" opacity=".55" />
          </g>
        </symbol>

        {/* LEAF */}
        <symbol id="re-leaf" viewBox="0 0 100 52">
          <path d="M3 27 C 22 3 62 -4 97 17 C 68 46 26 48 3 27 Z" fill="url(#re-g-leaf)" />
          <path d="M6 27 C 32 22 66 19 94 18" fill="none" stroke="#c8d89a" strokeWidth="1.3" opacity=".55" />
          <path d="M26 21 l 8 -8 M44 18 l 8 -8 M62 17 l 8 -8" stroke="#c8d89a" strokeWidth="1" opacity=".38" fill="none" />
        </symbol>

        {/* BLOSSOM */}
        <symbol id="re-blossom" viewBox="0 0 40 40">
          <g fill="#fdf3e2">
            <ellipse cx="20" cy="9" rx="4.6" ry="8" />
            <g transform="rotate(72 20 20)">
              <ellipse cx="20" cy="9" rx="4.6" ry="8" />
            </g>
            <g transform="rotate(144 20 20)">
              <ellipse cx="20" cy="9" rx="4.6" ry="8" />
            </g>
            <g transform="rotate(216 20 20)">
              <ellipse cx="20" cy="9" rx="4.6" ry="8" />
            </g>
            <g transform="rotate(288 20 20)">
              <ellipse cx="20" cy="9" rx="4.6" ry="8" />
            </g>
          </g>
          <circle cx="20" cy="20" r="3.4" fill="#d5a24c" />
        </symbol>

        {/* TASSEL */}
        <symbol id="re-tassel" viewBox="0 0 60 130">
          <path d="M30 0 V22" stroke="url(#re-g-gold)" strokeWidth="3" fill="none" />
          <path d="M18 22 h24 l4 12 h-32 z" fill="url(#re-g-gold-h)" />
          <rect x="16" y="34" width="28" height="12" rx="3" fill="url(#re-g-gold)" />
          <path d="M18 46 C 12 74 12 100 18 122 C 24 130 36 130 42 122 C 48 100 48 74 42 46 Z" fill="url(#re-g-gold-h)" />
          <g stroke="#8a5f1c" strokeOpacity=".55" strokeWidth="1.1" fill="none">
            <path d="M22 48 V118" />
            <path d="M27 48 V124" />
            <path d="M33 48 V124" />
            <path d="M38 48 V118" />
          </g>
        </symbol>

        {/* ROPE */}
        <symbol id="re-rope" viewBox="0 0 200 40">
          <path
            d="M2 20 C 30 4 44 36 72 20 C 100 4 114 36 142 20 C 164 8 182 12 198 20"
            fill="none"
            stroke="url(#re-g-gold-h)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M2 20 C 30 4 44 36 72 20 C 100 4 114 36 142 20 C 164 8 182 12 198 20"
            fill="none"
            stroke="#f4e2b6"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="2 6"
            opacity=".7"
          />
        </symbol>

        {/* FLEURON */}
        <symbol id="re-fleuron" viewBox="0 0 120 90">
          <path d="M60 6 C 70 22 82 30 96 34 C 82 38 70 46 60 62 C 50 46 38 38 24 34 C 38 30 50 22 60 6 Z" fill="url(#re-g-gold)" />
          <path d="M60 44 C 66 54 74 60 82 62 C 74 66 66 72 60 84 C 54 72 46 66 38 62 C 46 60 54 54 60 44 Z" fill="url(#re-g-gold-h)" />
          <circle cx="60" cy="34" r="3.6" fill="#7c1220" />
        </symbol>

        {/* DIVIDER FLEURON */}
        <symbol id="re-div-fleuron" viewBox="0 0 520 90">
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M14 45 H196" />
            <path d="M196 45 c 18 -2 26 -14 18 -22 c -7 -7 -18 -1 -14 7 c 2 5 9 6 13 2" />
            <path d="M196 45 c 18 2 26 14 18 22 c -7 7 -18 1 -14 -7 c 2 -5 9 -6 13 -2" />
          </g>
          <g transform="translate(520,0) scale(-1,1)" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M14 45 H196" />
            <path d="M196 45 c 18 -2 26 -14 18 -22 c -7 -7 -18 -1 -14 7 c 2 5 9 6 13 2" />
            <path d="M196 45 c 18 2 26 14 18 22 c -7 7 -18 1 -14 -7 c 2 -5 9 -6 13 -2" />
          </g>
          <path d="M260 12 C 271 28 282 36 300 41 C 282 46 271 54 260 70 C 249 54 238 46 220 41 C 238 36 249 28 260 12 Z" fill="url(#re-g-gold)" />
          <circle cx="260" cy="41" r="4.2" fill="#7c1220" />
          <circle cx="214" cy="41" r="2.6" fill="url(#re-g-gold)" />
          <circle cx="306" cy="41" r="2.6" fill="url(#re-g-gold)" />
        </symbol>

        {/* DIAMOND CHAIN WIDE */}
        <symbol id="re-div-diamond" viewBox="0 0 1080 110">
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.4" strokeLinecap="round">
            <path d="M20 55 H360" />
            <path d="M720 55 H1060" />
          </g>
          <g fill="url(#re-g-gold)">
            <path d="M540 22 L562 55 L540 88 L518 55 Z" />
            <path d="M452 34 L470 55 L452 76 L434 55 Z" />
            <path d="M628 34 L646 55 L628 76 L610 55 Z" />
            <circle cx="392" cy="55" r="4" />
            <circle cx="688" cy="55" r="4" />
            <circle cx="490" cy="55" r="3" />
            <circle cx="590" cy="55" r="3" />
          </g>
          <path
            d="M540 38 C 547 46 552 50 558 55 C 552 60 547 64 540 72 C 533 64 528 60 522 55 C 528 50 533 46 540 38 Z"
            fill="#7c1220"
            opacity=".85"
          />
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.2">
            <path d="M360 55 c 14 -12 26 -12 32 -2" />
            <path d="M720 55 c -14 -12 -26 -12 -32 -2" />
          </g>
        </symbol>

        {/* VINE RULE */}
        <symbol id="re-div-vine" viewBox="0 0 520 90">
          <path
            d="M18 62 C 88 16 148 74 216 44 C 258 26 262 26 304 44 C 372 74 432 16 502 62"
            fill="none"
            stroke="url(#re-g-gold-h)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g fill="url(#re-g-gold)">
            <path d="M96 34 C 106 20 126 18 132 26 C 124 36 108 40 96 34 Z" />
            <path d="M158 60 C 172 58 186 68 184 78 C 170 78 158 70 158 60 Z" />
            <path d="M362 60 C 348 58 334 68 336 78 C 350 78 362 70 362 60 Z" />
            <path d="M424 34 C 414 20 394 18 388 26 C 396 36 412 40 424 34 Z" />
            <circle cx="260" cy="34" r="5" />
          </g>
          <g fill="#7c1220">
            <circle cx="260" cy="34" r="2" />
          </g>
        </symbol>

        {/* CORNER SCROLL */}
        <symbol id="re-corner" viewBox="0 0 420 260">
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M18 18 C 96 22 168 44 214 92" />
            <path d="M18 18 C 22 96 44 168 92 214" />
            <path d="M60 42 C 116 48 160 74 182 122" />
            <path d="M42 60 C 48 116 74 160 122 182" />
            <path d="M96 40 c 14 -12 32 -6 30 10 c -2 12 -20 14 -26 4" />
            <path d="M40 96 c -12 14 -6 32 10 30 c 12 -2 14 -20 4 -26" />
          </g>
          <g fill="url(#re-g-gold)">
            <path d="M212 88 C 226 92 236 102 240 118 C 226 112 216 102 212 88 Z" />
            <path d="M88 212 C 92 198 102 188 118 184 C 112 198 102 208 88 212 Z" />
            <circle cx="18" cy="18" r="5.5" />
          </g>
          <g transform="translate(420,0) scale(-1,1)">
            <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.6" strokeLinecap="round">
              <path d="M18 18 C 96 22 168 44 214 92" />
              <path d="M18 18 C 22 96 44 168 92 214" />
              <path d="M60 42 C 116 48 160 74 182 122" />
              <path d="M42 60 C 48 116 74 160 122 182" />
              <path d="M96 40 c 14 -12 32 -6 30 10 c -2 12 -20 14 -26 4" />
              <path d="M40 96 c -12 14 -6 32 10 30 c 12 -2 14 -20 4 -26" />
            </g>
            <g fill="url(#re-g-gold)">
              <path d="M212 88 C 226 92 236 102 240 118 C 226 112 216 102 212 88 Z" />
              <path d="M88 212 C 92 198 102 188 118 184 C 112 198 102 208 88 212 Z" />
              <circle cx="18" cy="18" r="5.5" />
            </g>
          </g>
        </symbol>

        {/* VELVET SWAG (hero drape) */}
        <symbol id="re-swag" viewBox="0 0 1200 190" preserveAspectRatio="none">
          <path d="M0 0 H1200 V34 C 1060 44 980 60 900 78 C 800 100 720 128 600 132 C 480 128 400 100 300 78 C 220 60 140 44 0 34 Z" fill="url(#re-g-velvet)" />
          <path
            d="M0 34 C 140 44 220 60 300 78 C 400 100 480 128 600 132 C 720 128 800 100 900 78 C 980 60 1060 44 1200 34"
            fill="none"
            stroke="url(#re-g-gold-h)"
            strokeWidth="2.2"
          />
          <path
            d="M0 34 C 140 44 220 60 300 78 C 400 100 480 128 600 132 C 720 128 800 100 900 78 C 980 60 1060 44 1200 34"
            fill="none"
            stroke="#e9cb8c"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="1 7"
            opacity=".85"
          />
          <path d="M120 20 C 130 66 128 118 108 172 L 40 172 C 62 118 66 66 62 20 Z" fill="url(#re-g-velvet-2)" opacity=".95" />
          <path d="M1080 20 C 1070 66 1072 118 1092 172 L 1160 172 C 1138 118 1134 66 1138 20 Z" fill="url(#re-g-velvet-2)" opacity=".95" />
          <path d="M120 20 C 130 66 128 118 108 172 M1080 20 C 1070 66 1072 118 1092 172" fill="none" stroke="#e9cb8c" strokeWidth="2" opacity=".7" />
        </symbol>

        {/* CURTAIN PANEL (side) */}
        <symbol id="re-curtain" viewBox="0 0 200 420">
          <path d="M0 0 H200 V420 H0 Z" fill="url(#re-g-velvet)" />
          <path d="M0 0 H200 V420 H0 Z" fill="url(#re-p-damask)" opacity=".25" />
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="2" opacity=".8">
            <path d="M12 0 V420" />
            <path d="M188 0 V420" />
            <path d="M40 0 C 50 80 40 160 50 240 C 60 320 48 360 55 420" />
            <path d="M90 0 C 100 70 88 150 98 230 C 108 310 96 360 102 420" />
            <path d="M140 0 C 150 80 138 160 148 240 C 158 320 146 360 152 420" />
          </g>
          <path d="M0 0 H200 V22 H0 Z" fill="url(#re-g-gold-h)" />
        </symbol>

        {/* MONOGRAM MEDAL (wine & gold) */}
        <symbol id="re-monogram" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="url(#re-g-parch)" stroke="url(#re-g-gold-h)" strokeWidth="2.4" />
          <circle cx="80" cy="80" r="62" fill="none" stroke="url(#re-g-gold)" strokeWidth="1" opacity=".8" />
          <path d="M80 14 l6 10 -6 10 -6 -10 z" fill="url(#re-g-gold)" />
          <path d="M80 126 l6 10 -6 10 -6 -10 z" fill="url(#re-g-gold)" />
          <path d="M14 80 l10 -6 10 6 -10 6 z" fill="url(#re-g-gold)" />
          <path d="M126 80 l10 -6 10 6 -10 6 z" fill="url(#re-g-gold)" />
          <circle cx="80" cy="80" r="34" fill="url(#re-g-velvet)" />
          <text
            x="80"
            y="94"
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontWeight="600"
            fontSize="36"
            fill="#e9cb8c"
            letterSpacing="0.04em"
          >
            M&amp;I
          </text>
        </symbol>

        {/* RINGS */}
        <symbol id="re-rings" viewBox="0 0 320 180">
          <g fill="none" stroke="url(#re-g-gold-h)" strokeWidth="11">
            <circle cx="128" cy="102" r="52" />
            <circle cx="196" cy="102" r="52" />
          </g>
          <g fill="none" stroke="#f6e6bd" strokeWidth="2.6" strokeLinecap="round" opacity=".75">
            <path d="M100 72 C 112 58 134 52 152 60" />
            <path d="M172 74 C 184 60 204 54 222 62" />
          </g>
          <path d="M162 28 L 172 46 L 162 64 L 152 46 Z" fill="url(#re-g-gold)" />
          <path d="M162 12 C 166 18 172 22 180 24 C 172 26 166 30 162 36 C 158 30 152 26 144 24 C 152 22 158 18 162 12 Z" fill="url(#re-g-gold)" />
          <circle cx="82" cy="146" r="3" fill="url(#re-g-gold)" />
          <circle cx="242" cy="146" r="3" fill="url(#re-g-gold)" />
        </symbol>

        {/* ICONS */}
        <symbol id="re-ico-clock" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="19" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="2.8" />
          <path d="M24 12v12l8 6" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="re-ico-pin" viewBox="0 0 48 48">
          <path
            d="M24 4c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14z"
            fill="none"
            stroke="url(#re-g-gold-h)"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="18" r="5" fill="#7c1220" stroke="url(#re-g-gold-h)" strokeWidth="2" />
        </symbol>
        <symbol id="re-ico-cal" viewBox="0 0 48 48">
          <rect x="6" y="12" width="36" height="30" rx="4" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="2.6" />
          <path d="M6 22h36" stroke="url(#re-g-gold-h)" strokeWidth="2.6" />
          <path d="M16 6v10M32 6v10" stroke="url(#re-g-gold-h)" strokeWidth="2.8" strokeLinecap="round" />
          <rect x="14" y="28" width="6" height="6" rx="1" fill="#7c1220" />
          <rect x="24" y="28" width="6" height="6" rx="1" fill="#7c1220" />
          <rect x="34" y="28" width="6" height="6" rx="1" fill="url(#re-g-gold)" />
        </symbol>

        {/* BOUQUET CLUSTER */}
        <symbol id="re-bouquet" viewBox="0 0 460 240">
          <use href="#re-leaf" x="24" y="96" width="120" height="62" transform="rotate(-24 84 127)" />
          <use href="#re-leaf" x="290" y="88" width="130" height="66" transform="rotate(20 355 121)" />
          <use href="#re-leaf" x="120" y="150" width="110" height="58" transform="rotate(16 175 179)" />
          <use href="#re-rose" x="30" y="34" width="108" height="108" transform="rotate(-10 84 88)" />
          <use href="#re-rose" x="150" y="18" width="132" height="132" transform="rotate(6 216 84)" />
          <use href="#re-rose" x="292" y="42" width="102" height="102" transform="rotate(14 343 93)" />
          <use href="#re-blossom" x="128" y="118" width="34" height="34" />
          <use href="#re-blossom" x="262" y="130" width="30" height="30" />
          <use href="#re-blossom" x="52" y="140" width="28" height="28" />
          <g fill="url(#re-g-gold)">
            <circle cx="188" cy="150" r="4.5" />
            <circle cx="206" cy="158" r="3.4" />
            <circle cx="238" cy="152" r="4" />
            <circle cx="318" cy="146" r="3.6" />
            <circle cx="98" cy="146" r="3.6" />
          </g>
        </symbol>

        {/* TASSel PAIR */}
        <symbol id="re-tassel-pair" viewBox="0 0 260 300">
          <g transform="translate(30,26)">
            <use href="#re-rope" width="200" height="40" />
          </g>
          <use href="#re-tassel" x="70" y="52" width="60" height="130" />
          <use href="#re-tassel" x="132" y="72" width="60" height="130" opacity=".9" />
          <g fill="url(#re-g-gold)">
            <circle cx="100" cy="212" r="5" />
            <circle cx="162" cy="232" r="5" />
          </g>
          <path d="M40 250 C 90 236 170 236 220 250" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.4" />
        </symbol>

        {/* DAMASK BAND */}
        <symbol id="re-damask-band" viewBox="0 0 1080 170">
          <rect width="1080" height="170" fill="url(#re-p-damask)" opacity=".55" />
          <rect x="0" y="0" width="1080" height="170" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="3" />
          <rect x="12" y="12" width="1056" height="146" fill="none" stroke="#e9cb8c" strokeWidth="1" opacity=".6" />
          <g transform="translate(540,85) scale(1.5) translate(-60,-45)">
            <use href="#re-fleuron" />
          </g>
          <g fill="url(#re-g-gold)">
            <circle cx="60" cy="85" r="5" />
            <circle cx="1020" cy="85" r="5" />
          </g>
        </symbol>

        {/* PAGE CORNER TICKS */}
        <symbol id="re-tick" viewBox="0 0 80 80">
          <path d="M2 40V10C2 5 5 2 10 2h30" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1.8" />
          <path d="M14 40V18c0-3 2-5 5-5h22" fill="none" stroke="url(#re-g-gold-h)" strokeWidth="1" opacity=".7" />
          <circle cx="24" cy="24" r="3" fill="url(#re-g-gold)" />
        </symbol>
      </defs>
    </svg>
  );
}
