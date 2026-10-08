/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#fdfbf7',
          100: '#f9f5ed',
          200: '#f3ebd8',
          300: '#e9dcbd',
          400: '#dcc69c',
          500: '#cbb07e',
          600: '#b89966',
          700: '#997c51',
          800: '#7d6444',
          900: '#67523a',
        },
        sage: {
          50: '#f4f7f5',
          100: '#e6ede8',
          200: '#cfdccf',
          300: '#abc2ad',
          400: '#83a386',
          500: '#648767',
          600: '#4e6d51',
          700: '#405742',
          800: '#354737',
          900: '#2d3b2f',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'bounce-soft': 'bounce 2s infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

