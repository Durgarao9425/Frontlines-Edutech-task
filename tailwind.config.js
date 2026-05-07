/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
        },
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease-out forwards',
        'slide-up':      'slideUp 0.5s ease-out forwards',
        'slide-down':    'slideDown 0.22s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.28s ease-out forwards',
        'scale-in':      'scaleIn 0.2s ease-out forwards',
        'shimmer':       'shimmer 1.5s infinite',
        'float':         'float 3s ease-in-out infinite',
        'pulse-ring':    'pulseRing 2s ease-in-out infinite',
        'count-up':      'countUp 0.6s ease-out forwards',
        'nav-appear':    'navAppear 0.18s ease-out forwards',
      },
      keyframes: {
        fadeIn:      { '0%': { opacity: '0', transform: 'translateY(12px)' },  '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideUp:     { '0%': { opacity: '0', transform: 'translateY(20px)' },  '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown:   { '0%': { opacity: '0', transform: 'translateY(-8px)' },  '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-18px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:     { '0%': { opacity: '0', transform: 'scale(0.93)' },       '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer:     { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        pulseRing:   { '0%,100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.4)' }, '50%': { boxShadow: '0 0 0 6px rgba(99,102,241,0)' } },
        countUp:     { '0%': { opacity: '0', transform: 'scale(0.8) translateY(4px)' }, '100%': { opacity: '1', transform: 'scale(1) translateY(0)' } },
        navAppear:   { '0%': { opacity: '0', transform: 'scale(0.96) translateY(-4px)' }, '100%': { opacity: '1', transform: 'scale(1) translateY(0)' } },
      },
      backdropBlur: { xs: '2px' },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
