/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'neon-green-hover': '#32D711',
        'neon-green-dim': 'rgba(57, 255, 20, 0.1)',
        'gold': '#D4AF37',
        'gold-light': '#F1C40F',
        'gold-dim': 'rgba(212, 175, 55, 0.1)',
        'deep-black': '#050505',
        'charcoal': '#0A0A0A',
        'subtle-black': '#121212',
      },
      fontFamily: {
        'heading': ['Syne', 'Space Grotesk', 'sans-serif'],
        'body': ['Manrope', 'DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};