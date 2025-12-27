/*
 * Created on Sat Dec 27 2025
 *
 * Copyright (c) 2025 Your Company
 */

// styles/designTokens.js
export const COLOR_SYSTEM = {
  // BASE THEME (NAVY-BASED)
  base: {
    navy: {
      50: '#E6E8FF',
      100: '#C5CAFF',
      200: '#9AA3FF',
      300: '#6E7BFF',
      400: '#4A5AFF',
      500: '#1E3A8A', // Primary navy
      600: '#172554',
      700: '#0F1A3D',
      800: '#0A1126',
      900: '#050A15'
    },
    
    // Safety status colors (FIXED across modes)
    status: {
      normal: '#10B981',    // Emerald 500
      warning: '#F59E0B',   // Amber 500  
      danger: '#EF4444',    // Red 500
      failed: '#7C3AED'     // Violet 600
    }
  },
  
  // LIGHT MODE (OUTDOOR OPTIMIZED)
  light: {
    primary: '#1E3A8A',     // Navy
    secondary: '#4A5AFF',   // Lighter navy
    background: '#F8FAFC',  // Light gray-blue
    surface: '#FFFFFF',
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      disabled: '#94A3B8'
    },
    border: '#E2E8F0',
    overlay: 'rgba(15, 23, 42, 0.7)'
  },
  
  // DARK MODE
  dark: {
    primary: '#4A5AFF',
    secondary: '#6E7BFF',
    background: '#0F1A3D',
    surface: '#172554',
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
      disabled: '#64748B'
    },
    border: '#334155',
    overlay: 'rgba(0, 0, 0, 0.8)'
  },
  
  // HIGH CONTRAST MODE (ACCESSIBILITY)
  contrast: {
    primary: '#000000',
    secondary: '#1E3A8A',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: {
      primary: '#000000',
      secondary: '#1E293B',
      disabled: '#475569'
    },
    border: '#000000',
    overlay: 'rgba(0, 0, 0, 0.9)'
  }
};

// Usage example in component:
// className={`bg-${theme.background} text-${theme.text.primary}`}

// styles/designTokens.js
export const TYPOGRAPHY = {
  // DIGITAL DISPLAY (Roboto Mono)
  digital: {
    fontFamily: "'Roboto Mono', monospace",
    sizes: {
      xxl: '4rem',    // 64px - Main large number
      xl: '3rem',     // 48px - Section header
      lg: '2rem',     // 32px - Card title
      md: '1.5rem',   // 24px
      sm: '1.25rem',  // 20px
      xs: '1rem'      // 16px
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  
  // UI TEXT (Inter or Roboto)
  ui: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    sizes: {
      h1: '2.5rem',   // 40px
      h2: '2rem',     // 32px
      h3: '1.5rem',   // 24px
      h4: '1.25rem',  // 20px
      body: '1rem',   // 16px
      small: '0.875rem', // 14px
      caption: '0.75rem' // 12px
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  // SPACING SYSTEM (8px base)
  spacing: {
    0: '0',
    1: '0.5rem',   // 8px
    2: '1rem',     // 16px
    3: '1.5rem',   // 24px
    4: '2rem',     // 32px
    5: '3rem',     // 48px
    6: '4rem',     // 64px
    8: '6rem'      // 96px
  }
};

