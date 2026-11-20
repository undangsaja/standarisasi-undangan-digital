import React from 'react';

/**
 * Cherry Blossom ornament kit — blush paper, sakura blossoms, sage leaves.
 * IDs prefixed with `cb-` to avoid clashing with re-* / cluster-* / monogram / div-line / rings.
 */
export default function CherryBlossomDefs() {
  return (
    <svg id="cb-defs" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="cb-g-blush" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF8FA" />
          <stop offset="45%" stopColor="#FBE5EA" />
          <stop offset="100%" stopColor="#F6D0DB" />
        </linearGradient>
        <linearGradient id="cb-g-rose" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#F6D0DB" />
          <stop offset="48%" stopColor="#E8A8BC" />
          <stop offset="100%" stopColor="#D06982" />
        </linearGradient>
        <linearGradient id="cb-g-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9BB396" />
          <stop offset="55%" stopColor="#799375" />
          <stop offset="100%" stopColor="#5F7A5C" />
        </linearGradient>
        <linearGradient id="cb-g-branch" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#A86B76" />
          <stop offset="45%" stopColor="#8C5661" />
          <stop offset="100%" stopColor="#6E3F4A" />
        </linearGradient>

        {/* Single sakura petal — notched tip */}
        <symbol id="cb-petal" viewBox="0 0 40 40">
          <path
            d="M20 36 C 10 28 6 16 11 7 C 13.5 3 17.5 4 19 10 L 20 15 L 21 10 C 22.5 4 26.5 3 29 7 C 34 16 30 28 20 36 Z"
            fill="url(#cb-g-rose)"
          />
          <path
            d="M20 32 C 13 26 10 16 14 9"
            fill="none"
            stroke="#FBE5EA"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity=".55"
          />
        </symbol>

        {/* 5-petal sakura blossom */}
        <symbol id="cb-blossom" viewBox="0 0 100 100">
          <g>
            {/* petal up */}
            <path
              d="M50 54 C 38 44 32 28 37 14 C 39.5 7 46 7 48.5 14 L 50 20 L 51.5 14 C 54 7 60.5 7 63 14 C 68 28 62 44 50 54 Z"
              fill="url(#cb-g-rose)"
            />
            <g transform="rotate(72 50 50)">
              <path
                d="M50 54 C 38 44 32 28 37 14 C 39.5 7 46 7 48.5 14 L 50 20 L 51.5 14 C 54 7 60.5 7 63 14 C 68 28 62 44 50 54 Z"
                fill="url(#cb-g-rose)"
              />
            </g>
            <g transform="rotate(144 50 50)">
              <path
                d="M50 54 C 38 44 32 28 37 14 C 39.5 7 46 7 48.5 14 L 50 20 L 51.5 14 C 54 7 60.5 7 63 14 C 68 28 62 44 50 54 Z"
                fill="url(#cb-g-rose)"
              />
            </g>
            <g transform="rotate(216 50 50)">
              <path
                d="M50 54 C 38 44 32 28 37 14 C 39.5 7 46 7 48.5 14 L 50 20 L 51.5 14 C 54 7 60.5 7 63 14 C 68 28 62 44 50 54 Z"
                fill="url(#cb-g-rose)"
              />
            </g>
            <g transform="rotate(288 50 50)">
              <path
                d="M50 54 C 38 44 32 28 37 14 C 39.5 7 46 7 48.5 14 L 50 20 L 51.5 14 C 54 7 60.5 7 63 14 C 68 28 62 44 50 54 Z"
                fill="url(#cb-g-rose)"
              />
            </g>
            {/* soft inner petals */}
            <g opacity=".55">
              <path
                d="M50 50 C 42 43 39 33 42 25 C 44 20 47.5 21 48.8 25 L 50 29 L 51.2 25 C 52.5 21 56 20 58 25 C 61 33 58 43 50 50 Z"
                fill="#FBE5EA"
              />
              <g transform="rotate(72 50 50)">
                <path
                  d="M50 50 C 42 43 39 33 42 25 C 44 20 47.5 21 48.8 25 L 50 29 L 51.2 25 C 52.5 21 56 20 58 25 C 61 33 58 43 50 50 Z"
                  fill="#FBE5EA"
                />
              </g>
              <g transform="rotate(144 50 50)">
                <path
                  d="M50 50 C 42 43 39 33 42 25 C 44 20 47.5 21 48.8 25 L 50 29 L 51.2 25 C 52.5 21 56 20 58 25 C 61 33 58 43 50 50 Z"
                  fill="#FBE5EA"
                />
              </g>
              <g transform="rotate(216 50 50)">
                <path
                  d="M50 50 C 42 43 39 33 42 25 C 44 20 47.5 21 48.8 25 L 50 29 L 51.2 25 C 52.5 21 56 20 58 25 C 61 33 58 43 50 50 Z"
                  fill="#FBE5EA"
                />
              </g>
              <g transform="rotate(288 50 50)">
                <path
                  d="M50 50 C 42 43 39 33 42 25 C 44 20 47.5 21 48.8 25 L 50 29 L 51.2 25 C 52.5 21 56 20 58 25 C 61 33 58 43 50 50 Z"
                  fill="#FBE5EA"
                />
              </g>
            </g>
            {/* stamens */}
            <g stroke="#C4896A" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity=".9">
              <path d="M50 50 L50 28" />
              <path d="M50 50 L62 36" />
              <path d="M50 50 L58 62" />
              <path d="M50 50 L42 62" />
              <path d="M50 50 L38 36" />
            </g>
            <g fill="#D99C77">
              <circle cx="50" cy="27" r="2.4" />
              <circle cx="63.5" cy="35" r="2.2" />
              <circle cx="59" cy="63.5" r="2.3" />
              <circle cx="41" cy="63.5" r="2.3" />
              <circle cx="36.5" cy="35" r="2.2" />
              <circle cx="50" cy="50" r="3.2" fill="#A84A66" />
            </g>
          </g>
        </symbol>

        {/* Small twig with blossoms + sage leaves */}
        <symbol id="cb-sprig" viewBox="0 0 240 160">
          <path
            d="M12 130 C 48 122 78 108 112 88 C 148 68 178 48 214 34"
            fill="none"
            stroke="url(#cb-g-branch)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M78 108 C 92 96 104 88 122 78"
            fill="none"
            stroke="url(#cb-g-branch)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M148 62 C 162 70 176 78 196 82"
            fill="none"
            stroke="url(#cb-g-branch)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* sage leaves */}
          <path
            d="M88 100 C 78 86 82 70 98 64 C 104 78 102 94 88 100 Z"
            fill="url(#cb-g-leaf)"
            opacity=".92"
          />
          <path
            d="M98 66 C 92 76 90 88 88 98"
            fill="none"
            stroke="#B7C9B2"
            strokeWidth="1"
            opacity=".55"
          />
          <path
            d="M158 72 C 172 64 188 70 194 84 C 180 90 164 86 158 72 Z"
            fill="url(#cb-g-leaf)"
            opacity=".92"
          />
          <path
            d="M160 74 C 172 76 184 80 192 83"
            fill="none"
            stroke="#B7C9B2"
            strokeWidth="1"
            opacity=".55"
          />
          <path
            d="M42 118 C 34 106 38 92 50 88 C 54 100 52 114 42 118 Z"
            fill="url(#cb-g-leaf)"
            opacity=".85"
          />
          {/* blossoms */}
          <g transform="translate(70,70) scale(0.42)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(148,28) scale(0.55)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(188,96) scale(0.36)">
            <use href="#cb-blossom" />
          </g>
          <circle cx="128" cy="74" r="3.2" fill="#D99C77" opacity=".85" />
          <circle cx="138" cy="70" r="2.2" fill="#D06982" opacity=".7" />
        </symbol>

        {/* Hairline rule interrupted by a tiny blossom */}
        <symbol id="cb-divider" viewBox="0 0 400 40">
          <g fill="none" stroke="#D06982" strokeOpacity=".45" strokeWidth="1" strokeLinecap="round">
            <path d="M12 20 H168" />
            <path d="M232 20 H388" />
          </g>
          <g fill="none" stroke="#F6D0DB" strokeWidth="2.5" strokeLinecap="round" opacity=".7">
            <path d="M12 20 H168" />
            <path d="M232 20 H388" />
          </g>
          <circle cx="176" cy="20" r="2.5" fill="#D99C77" />
          <circle cx="224" cy="20" r="2.5" fill="#D99C77" />
          <g transform="translate(178,4) scale(0.44)">
            <use href="#cb-blossom" />
          </g>
        </symbol>

        {/* Circular medallion seal — blank center */}
        <symbol id="cb-monogram" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="72" fill="url(#cb-g-blush)" opacity=".92" />
          <circle cx="80" cy="80" r="70" fill="none" stroke="#D06982" strokeWidth="1.6" opacity=".85" />
          <circle cx="80" cy="80" r="63" fill="none" stroke="#D06982" strokeWidth="1" opacity=".55" />
          <circle
            cx="80"
            cy="80"
            r="66"
            fill="none"
            stroke="#D99C77"
            strokeWidth="0.8"
            strokeDasharray="3 5"
            opacity=".7"
          />
          {/* top blossom */}
          <g transform="translate(54,2) scale(0.52)">
            <use href="#cb-blossom" />
          </g>
          {/* bottom blossom */}
          <g transform="translate(54,106) scale(0.52)">
            <use href="#cb-blossom" />
          </g>
          {/* side diamonds */}
          <path d="M12 80 l6 -6 6 6 -6 6 z" fill="#D06982" opacity=".75" />
          <path d="M136 80 l6 -6 6 6 -6 6 z" fill="#D06982" opacity=".75" />
          <circle cx="80" cy="80" r="48" fill="#FFFFFF" opacity=".55" />
        </symbol>

        {/* Soft arch of blossoms + leaves */}
        <symbol id="cb-arch" viewBox="0 0 480 260">
          <path
            d="M40 230 C 48 120 120 36 240 36 C 360 36 432 120 440 230"
            fill="none"
            stroke="#D06982"
            strokeOpacity=".28"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M56 230 C 64 130 128 52 240 52 C 352 52 416 130 424 230"
            fill="none"
            stroke="#F6D0DB"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".8"
          />
          {/* leaves along the arch */}
          <path
            d="M78 168 C 62 154 64 132 82 124 C 92 140 90 160 78 168 Z"
            fill="url(#cb-g-leaf)"
            opacity=".9"
            transform="rotate(-28 78 150)"
          />
          <path
            d="M402 168 C 418 154 416 132 398 124 C 388 140 390 160 402 168 Z"
            fill="url(#cb-g-leaf)"
            opacity=".9"
            transform="rotate(28 402 150)"
          />
          <path
            d="M130 96 C 116 80 120 60 138 54 C 146 70 144 88 130 96 Z"
            fill="url(#cb-g-leaf)"
            opacity=".88"
            transform="rotate(-18 130 78)"
          />
          <path
            d="M350 96 C 364 80 360 60 342 54 C 334 70 336 88 350 96 Z"
            fill="url(#cb-g-leaf)"
            opacity=".88"
            transform="rotate(18 350 78)"
          />
          <path
            d="M214 48 C 204 34 210 18 226 16 C 230 30 226 44 214 48 Z"
            fill="url(#cb-g-leaf)"
            opacity=".85"
            transform="rotate(-8 214 34)"
          />
          <path
            d="M266 48 C 276 34 270 18 254 16 C 250 30 254 44 266 48 Z"
            fill="url(#cb-g-leaf)"
            opacity=".85"
            transform="rotate(8 266 34)"
          />
          {/* blossoms */}
          <g transform="translate(48,148) scale(0.48)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(98,78) scale(0.4)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(156,38) scale(0.44)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(210,8) scale(0.55)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(268,14) scale(0.42)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(322,42) scale(0.48)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(376,82) scale(0.4)">
            <use href="#cb-blossom" />
          </g>
          <g transform="translate(410,152) scale(0.48)">
            <use href="#cb-blossom" />
          </g>
          {/* gold accents */}
          <g fill="#D99C77" opacity=".9">
            <circle cx="240" cy="72" r="3.2" />
            <circle cx="168" cy="92" r="2.4" />
            <circle cx="312" cy="92" r="2.4" />
            <circle cx="118" cy="140" r="2.6" />
            <circle cx="362" cy="140" r="2.6" />
          </g>
        </symbol>

        {/* Tiny diamond chain used as micro-ornament */}
        <symbol id="cb-diamond-row" viewBox="0 0 120 24">
          <path d="M60 3 L68 12 L60 21 L52 12 Z" fill="#D06982" opacity=".85" />
          <path d="M36 6 L42 12 L36 18 L30 12 Z" fill="#D99C77" opacity=".8" />
          <path d="M84 6 L90 12 L84 18 L78 12 Z" fill="#D99C77" opacity=".8" />
          <circle cx="16" cy="12" r="2.2" fill="#F6D0DB" />
          <circle cx="104" cy="12" r="2.2" fill="#F6D0DB" />
        </symbol>
      </defs>
    </svg>
  );
}
