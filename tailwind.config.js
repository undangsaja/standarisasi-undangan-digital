/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: 'rgb(var(--theme-surface) / <alpha-value>)',
        neutral: {
          50: 'rgb(var(--theme-50) / <alpha-value>)',
          100: 'rgb(var(--theme-100) / <alpha-value>)',
          200: 'rgb(var(--theme-200) / <alpha-value>)',
          300: 'rgb(var(--theme-300) / <alpha-value>)',
          400: 'rgb(var(--theme-400) / <alpha-value>)',
          500: 'rgb(var(--theme-500) / <alpha-value>)',
          600: 'rgb(var(--theme-600) / <alpha-value>)',
          700: 'rgb(var(--theme-700) / <alpha-value>)',
          800: 'rgb(var(--theme-800) / <alpha-value>)',
          900: 'rgb(var(--theme-900) / <alpha-value>)',
          950: 'rgb(var(--theme-950) / <alpha-value>)',
        },
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

