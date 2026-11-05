/**
 * Tailwind v4 reads its theme from `src/app/globals.css` (see the `@theme`
 * block and the `[data-theme]` selectors). This file mirrors those tokens so
 * the two stay in sync - it is not loaded by Tailwind v4 automatically.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F46E5',
          dark: '#22D3EE',
          cyber: '#00E5FF',
        },
        secondary: {
          light: '#1F2937',
          dark: '#1E293B',
          cyber: '#141B2E',
        },
        accent: {
          light: '#BE185D',
          dark: '#F472B6',
          cyber: '#FF2E9A',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0B0F17',
          cyber: '#05070E',
        },
        hero: {
          light: '#F8FAFC',
          dark: '#111827',
          cyber: '#0A0F1C',
        },
        foreground: {
          light: '#111827',
          dark: '#F1F5F9',
          cyber: '#E6F7FF',
        },
        muted: {
          light: '#4B5563',
          dark: '#A8B3C4',
          cyber: '#8FA3BF',
        },
        card: {
          light: '#FFFFFF',
          dark: '#151C2B',
          cyber: '#0D1424',
        },
        surface: {
          light: '#F1F5F9',
          dark: '#1B2334',
          cyber: '#121A2C',
        },
        border: {
          light: '#E2E8F0',
          dark: '#28324A',
          cyber: '#1E2A44',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-orbitron)', 'var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
