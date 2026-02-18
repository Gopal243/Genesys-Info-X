/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FDB913',
        'brand-yellow-light': '#FFD700',
        'brand-yellow-dim': 'rgba(253, 185, 19, 0.1)',
        'brand-green': '#00C853',
        'brand-green-light': '#4CAF50',
        'brand-green-dim': 'rgba(0, 200, 83, 0.1)',
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
        'fade-up': 'fadeUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
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