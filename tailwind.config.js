/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color system
        status: {
          normal: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          failed: '#7C3AED'
        },
        navy: {
          50: '#E6E8FF',
          100: '#C5CAFF',
          200: '#9AA3FF',
          300: '#6E7BFF',
          400: '#4A5AFF',
          500: '#1E3A8A',
          600: '#172554',
          700: '#0F1A3D',
          800: '#0A1126',
          900: '#050A15'
        }
      },
      fontFamily: {
        'digital': ['"Roboto Mono"', 'monospace'],
        'sans': ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' }
        }
      }
    }
  },
  plugins: []
};