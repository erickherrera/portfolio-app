/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Use class strategy for dark mode
  theme: {
    extend: {
      // Define custom colors that map to CSS variables
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          bg: 'var(--card-bg)',
          border: 'var(--card-border)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        }
      },
      // Add font family variables
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace']
      },
      // Add border colors
      borderColor: {
        DEFAULT: 'var(--card-border)'
      },
      // Add background colors
      backgroundColor: {
        DEFAULT: 'var(--background)'
      },
      // Add transition utilities
      transitionProperty: {
        'theme': 'color, background-color, border-color'
      },
      // Add gradient support if needed
      gradientColorStops: {
        // Add custom gradient colors if needed
      }
    },
  },
  plugins: [],
}