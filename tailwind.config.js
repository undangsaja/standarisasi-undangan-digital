/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F3E8D7',
          50: '#FBF4E8',
          100: '#F7EFE3',
          200: '#F3E8D7',
          300: '#EFE1CB',
          400: '#E9D9BD',
          500: '#DCC5A2',
        },
        gold: {
          DEFAULT: '#B08B4E',
          light: '#E3C48D',
          deep: '#8B6729',
          soft: '#D9B87C',
        },
        ink: {
          DEFAULT: '#463422',
          soft: '#7C664A',
          deep: '#3E2E1D',
        },
        cream: '#FFF8EC',
        sage: {
          DEFAULT: '#8C9077',
          deep: '#5F6549',
        },
        line: 'rgba(176,139,78,.35)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['Parisienne', 'cursive'],
        label: ['Marcellus', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      animation: {
        shine: 'shine 8s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        silk: 'silk 16s ease-in-out infinite alternate',
        fall: 'fall linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-soft': 'pulse 3.5s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '180% 0' },
          '100%': { backgroundPosition: '-80% 0' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-11px) rotate(1.2deg)' },
        },
        silk: {
          from: { transform: 'translate3d(0,0,0) rotate(0deg)' },
          to: { transform: 'translate3d(24px,-16px,0) rotate(-1.6deg)' },
        },
        fall: {
          '0%': { opacity: '0', transform: 'translate3d(0,-10vh,0) rotate(0deg)' },
          '8%': { opacity: '.85' },
          '90%': { opacity: '.6' },
          '100%': { opacity: '0', transform: 'translate3d(var(--drift,40px),112vh,0) rotate(var(--spin,360deg))' },
        },
      },
    },
  },
  plugins: [],
}
