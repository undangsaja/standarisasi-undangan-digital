import React from 'react';

/**
 * Shared SVG symbol definitions for the Ivory & Gold ornament kit.
 * Ported from referensi-ornament.html — all ornaments use <use href="#id">.
 */
export default function OrnamentDefs() {
  return (
    <svg id="orn-defs" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B6729" />
          <stop offset=".28" stopColor="#E3C48D" />
          <stop offset=".52" stopColor="#B08B4E" />
          <stop offset=".78" stopColor="#E9CE9B" />
          <stop offset="1" stopColor="#8B6729" />
        </linearGradient>
        <linearGradient id="goldSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9B87C" />
          <stop offset="1" stopColor="#A67F3F" />
        </linearGradient>
        <radialGradient id="petalA" cx=".38" cy=".32" r=".82">
          <stop offset="0" stopColor="#FFFDF7" />
          <stop offset=".55" stopColor="#F4E8D3" />
          <stop offset="1" stopColor="#DCC5A2" />
        </radialGradient>
        <radialGradient id="petalB" cx=".4" cy=".3" r=".85">
          <stop offset="0" stopColor="#FFF9EE" />
          <stop offset=".6" stopColor="#F6EAD6" />
          <stop offset="1" stopColor="#E0CBA9" />
        </radialGradient>
        <radialGradient id="petalC" cx=".5" cy=".3" r=".8">
          <stop offset="0" stopColor="#FBEEDA" />
          <stop offset="1" stopColor="#D3B78D" />
        </radialGradient>
        <linearGradient id="leafA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A9AE91" />
          <stop offset=".55" stopColor="#848A6C" />
          <stop offset="1" stopColor="#5F6549" />
        </linearGradient>
        <linearGradient id="leafB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BEC0A4" />
          <stop offset="1" stopColor="#7C8262" />
        </linearGradient>

        {/* MAWAR */}
        <symbol id="rose" viewBox="0 0 120 120">
          <g transform="translate(60 60)">
            <g fill="url(#petalA)" stroke="#C6A97F" strokeWidth="1.1" strokeLinejoin="round">
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(60)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(120)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(180)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(240)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(300)" />
            </g>
            <g fill="url(#petalB)" stroke="#C6A97F" strokeWidth="1" strokeLinejoin="round" transform="rotate(30) scale(.63)">
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(60)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(120)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(180)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(240)" />
              <path d="M0 0C-22-8-34-28-24-44C-16-56 4-58 16-48C30-36 22-10 0 0Z" transform="rotate(300)" />
            </g>
            <path d="M0-3C-10-5-15-13-9-19C-3-25 8-23 11-14C14-3 5 5-5 3Z" fill="url(#petalC)" stroke="#C6A97F" strokeWidth=".9" />
            <path d="M-1-2C-6-4-8-9-4-12C0-15 5-13 6-8" fill="none" stroke="#C0A276" strokeWidth="1" opacity=".8" />
            <circle r="2.4" fill="#C9A96F" opacity=".55" />
          </g>
        </symbol>

        {/* DAUN */}
        <symbol id="leaf" viewBox="0 0 120 52">
          <path d="M3 28C25 3 73-6 117 19C87 47 35 52 3 28Z" fill="url(#leafA)" stroke="#5C6247" strokeWidth="1" />
          <path d="M8 28C42 23 84 18 113 21" fill="none" stroke="#EDE7D2" strokeWidth="1.2" opacity=".55" />
          <path d="M30 21l11 9M52 17l11 10M75 15l10 10" fill="none" stroke="#EDE7D2" strokeWidth=".9" opacity=".38" />
        </symbol>
        <symbol id="leaf2" viewBox="0 0 120 52">
          <path d="M3 28C25 3 73-6 117 19C87 47 35 52 3 28Z" fill="url(#leafB)" stroke="#6C7252" strokeWidth="1" />
          <path d="M8 28C42 23 84 18 113 21" fill="none" stroke="#F2EEDC" strokeWidth="1.1" opacity=".5" />
        </symbol>

        {/* BUNGA KECIL */}
        <symbol id="flower" viewBox="0 0 44 44">
          <g transform="translate(22 22)" fill="#FCF4E6" stroke="#CBB68F" strokeWidth=".85">
            <ellipse rx="5.2" ry="9.4" cy="-8.4" />
            <ellipse rx="5.2" ry="9.4" cy="-8.4" transform="rotate(72)" />
            <ellipse rx="5.2" ry="9.4" cy="-8.4" transform="rotate(144)" />
            <ellipse rx="5.2" ry="9.4" cy="-8.4" transform="rotate(216)" />
            <ellipse rx="5.2" ry="9.4" cy="-8.4" transform="rotate(288)" />
            <circle r="3.6" fill="url(#goldSoft)" stroke="none" />
          </g>
        </symbol>

        {/* BABY'S BREATH */}
        <symbol id="sprig" viewBox="0 0 220 120">
          <g fill="none" stroke="#A98C5C" strokeWidth="1.2" strokeLinecap="round">
            <path d="M8 112C56 96 96 74 132 42C154 22 180 12 212 8" />
            <path d="M62 92C74 76 82 62 86 44" />
            <path d="M104 62C118 56 132 52 150 54" />
            <path d="M138 38C150 30 162 26 178 26" />
            <path d="M88 60C74 52 62 48 46 50" />
          </g>
          <g fill="#FCF6EA" stroke="#D4BF98" strokeWidth=".8">
            <circle cx="212" cy="8" r="6" />
            <circle cx="196" cy="18" r="4.6" />
            <circle cx="178" cy="26" r="5.2" />
            <circle cx="160" cy="22" r="4" />
            <circle cx="150" cy="54" r="5.4" />
            <circle cx="134" cy="50" r="3.8" />
            <circle cx="118" cy="58" r="4.4" />
            <circle cx="86" cy="44" r="5" />
            <circle cx="72" cy="50" r="3.8" />
            <circle cx="46" cy="50" r="5.6" />
            <circle cx="34" cy="62" r="4" />
            <circle cx="62" cy="92" r="4.6" />
            <circle cx="96" cy="76" r="3.6" />
            <circle cx="132" cy="42" r="4.2" />
          </g>
        </symbol>

        {/* CORNER CLUSTERS */}
        <symbol id="cluster-a" viewBox="0 0 480 360">
          <g>
            <use href="#leaf" x="16" y="212" width="170" height="72" transform="rotate(-14 100 250)" />
            <use href="#leaf2" x="120" y="238" width="150" height="62" transform="rotate(16 195 268)" />
            <use href="#leaf" x="212" y="86" width="160" height="66" transform="rotate(-32 292 118)" />
            <use href="#leaf2" x="252" y="176" width="140" height="58" transform="rotate(28 322 205)" />
            <use href="#leaf" x="74" y="26" width="140" height="58" transform="rotate(30 144 55)" />
            <use href="#leaf2" x="330" y="60" width="128" height="52" transform="rotate(-18 394 86)" />
          </g>
          <use href="#sprig" x="196" y="0" width="286" height="156" />
          <use href="#sprig" x="150" y="196" width="300" height="162" transform="rotate(12 300 276)" />
          <use href="#rose" x="24" y="52" width="184" height="184" />
          <use href="#rose" x="168" y="6" width="132" height="132" />
          <use href="#rose" x="268" y="126" width="98" height="98" />
          <use href="#rose" x="96" y="196" width="82" height="82" />
          <use href="#flower" x="228" y="96" width="34" height="34" />
          <use href="#flower" x="196" y="168" width="30" height="30" />
          <use href="#flower" x="356" y="84" width="30" height="30" />
          <use href="#flower" x="292" y="42" width="26" height="26" />
          <use href="#flower" x="332" y="220" width="30" height="30" />
          <use href="#flower" x="146" y="252" width="26" height="26" />
          <use href="#flower" x="66" y="228" width="24" height="24" />
        </symbol>

        <symbol id="cluster-b" viewBox="0 0 420 320">
          <g>
            <use href="#leaf" x="40" y="176" width="150" height="62" transform="rotate(-18 115 207)" />
            <use href="#leaf2" x="150" y="212" width="132" height="56" transform="rotate(18 216 240)" />
            <use href="#leaf" x="214" y="72" width="132" height="56" transform="rotate(-30 280 100)" />
            <use href="#leaf2" x="60" y="34" width="118" height="50" transform="rotate(26 119 59)" />
          </g>
          <use href="#sprig" x="176" y="18" width="238" height="130" />
          <use href="#sprig" x="112" y="176" width="252" height="138" transform="rotate(10 238 245)" />
          <use href="#rose" x="52" y="72" width="152" height="152" />
          <use href="#rose" x="182" y="18" width="108" height="108" />
          <use href="#rose" x="196" y="168" width="82" height="82" />
          <use href="#flower" x="168" y="112" width="30" height="30" />
          <use href="#flower" x="290" y="62" width="26" height="26" />
          <use href="#flower" x="264" y="136" width="28" height="28" />
          <use href="#flower" x="86" y="212" width="24" height="24" />
          <use href="#flower" x="322" y="196" width="26" height="26" />
        </symbol>

        {/* ARCH */}
        <symbol id="arch" viewBox="0 0 760 1080">
          <g fill="none" stroke="url(#gold)" strokeWidth="2.2">
            <path d="M42 1062V420C42 302 104 268 162 216C222 162 232 98 380 54C528 98 538 162 598 216C656 268 718 302 718 420V1062" />
          </g>
          <g fill="none" stroke="url(#gold)" strokeWidth="1" opacity=".65">
            <path d="M64 1062V428C64 318 122 288 178 238C236 186 246 122 380 82C514 122 524 186 582 238C638 288 696 318 696 428V1062" />
          </g>
          <path d="M380 30l11 22-11 22-11-22z" fill="url(#gold)" />
          <path d="M342 62h22M396 62h22" stroke="url(#gold)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="380" cy="1044" r="7" fill="none" stroke="url(#gold)" strokeWidth="1.4" />
        </symbol>

        {/* MONOGRAM */}
        <symbol id="monogram" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="62" fill="none" stroke="url(#gold)" strokeWidth="1.2" opacity=".75" />
          <circle cx="80" cy="80" r="70" fill="none" stroke="url(#gold)" strokeWidth="2.2" />
          <path d="M80 12l7 12-7 12-7-12z" fill="url(#gold)" />
          <path d="M80 124l7 12-7 12-7-12z" fill="url(#gold)" />
          <path d="M12 80l12-7 12 7-12 7zM124 80l12-7 12 7-12 7z" fill="url(#gold)" />
          <text
            x="80"
            y="97"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="62"
            fill="url(#gold)"
          >
            M
            <tspan fontSize="38" dy="-2" dx="2">&amp;</tspan>
            <tspan fontSize="62" dy="2" dx="2">I</tspan>
          </text>
        </symbol>

        {/* DIVIDERS */}
        <symbol id="div-diamond" viewBox="0 0 340 26">
          <path d="M4 13h118M218 13h118" stroke="url(#gold)" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M170 2l13 11-13 11-13-11z" fill="url(#gold)" />
          <path d="M132 13l6-6 6 6-6 6zM202 13l6-6 6 6-6 6z" fill="url(#goldSoft)" />
        </symbol>

        <symbol id="div-filigree" viewBox="0 0 340 46">
          <g fill="none" stroke="url(#gold)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 23c30 0 40-13 66-13 20 0 27 11 46 11" />
            <path d="M12 23c30 0 40 13 66 13 20 0 27-11 46-11" />
            <path d="M328 23c-30 0-40-13-66-13-20 0-27 11-46 11" />
            <path d="M328 23c-30 0-40 13-66 13-20 0-27-11-46-11" />
            <path d="M124 23c12-11 22-11 30 0-8 11-18 11-30 0z" />
            <path d="M216 23c-12-11-22-11-30 0 8 11 18 11 30 0z" />
          </g>
          <path d="M170 14l9 9-9 9-9-9z" fill="url(#gold)" />
        </symbol>

        <symbol id="div-line" viewBox="0 0 340 20">
          <path d="M2 10h132M206 10h132" stroke="url(#gold)" strokeWidth="1" strokeLinecap="round" opacity=".85" />
          <path d="M170 3l8 7-8 7-8-7z" fill="url(#gold)" />
        </symbol>

        {/* RINGS */}
        <symbol id="rings" viewBox="0 0 132 78">
          <circle cx="50" cy="45" r="25" fill="none" stroke="url(#gold)" strokeWidth="4.5" />
          <circle cx="82" cy="45" r="25" fill="none" stroke="url(#gold)" strokeWidth="4.5" />
          <path d="M82 14l7 9-7 9-7-9z" fill="#E3C48D" stroke="url(#gold)" strokeWidth="1" />
        </symbol>

        {/* ICONS */}
        <symbol id="ico-clock" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="19" fill="none" stroke="url(#gold)" strokeWidth="2.4" />
          <path d="M24 12v12l8 6" fill="none" stroke="url(#gold)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>

        <symbol id="ico-pin" viewBox="0 0 48 48">
          <path
            d="M24 4c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14z"
            fill="none"
            stroke="url(#gold)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="18" r="5" fill="none" stroke="url(#gold)" strokeWidth="2.4" />
        </symbol>

        <symbol id="crown" viewBox="0 0 120 40">
          <g fill="none" stroke="url(#gold)" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 30c16 0 20-14 34-14 8 0 12 6 22 6s14-6 22-6c14 0 18 14 34 14" />
          </g>
          <path d="M60 6l7 8-7 8-7-8z" fill="url(#gold)" />
          <circle cx="34" cy="21" r="2.2" fill="url(#gold)" />
          <circle cx="86" cy="21" r="2.2" fill="url(#gold)" />
        </symbol>

        <symbol id="corner-tick" viewBox="0 0 80 80">
          <path d="M2 40V10C2 5 5 2 10 2h30" fill="none" stroke="url(#gold)" strokeWidth="1.6" />
          <path d="M14 40V18c0-3 2-5 5-5h22" fill="none" stroke="url(#gold)" strokeWidth="1" opacity=".7" />
          <circle cx="24" cy="24" r="3" fill="url(#gold)" />
        </symbol>

        <symbol id="bg-leaf" viewBox="0 0 200 120">
          <g fill="none" stroke="url(#gold)" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 110C60 92 110 62 172 18" />
            <path d="M42 96c-4-16 2-28 14-36M70 80c-4-16 2-28 14-36M98 64c-4-16 2-28 14-36M126 48c-4-16 2-28 14-36" />
            <path d="M46 82c16-4 28 2 36 14M74 66c16-4 28 2 36 14M102 50c16-4 28 2 36 14" />
          </g>
        </symbol>

        {/* Dynamic monogram initials — set via text content */}
        <symbol id="monogram-dyn" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="62" fill="none" stroke="url(#gold)" strokeWidth="1.2" opacity=".75" />
          <circle cx="80" cy="80" r="70" fill="none" stroke="url(#gold)" strokeWidth="2.2" />
          <path d="M80 12l7 12-7 12-7-12z" fill="url(#gold)" />
          <path d="M80 124l7 12-7 12-7-12z" fill="url(#gold)" />
          <path d="M12 80l12-7 12 7-12 7zM124 80l12-7 12 7-12 7z" fill="url(#gold)" />
        </symbol>
      </defs>
    </svg>
  );
}
