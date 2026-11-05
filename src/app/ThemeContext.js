"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

/**
 * Design system for the portfolio.
 *
 * Rules applied across every theme:
 * - WCAG 2.1 AA contrast for text (>= 4.5:1) and UI components (>= 3:1).
 * - Semantic tokens so components never guess a theme by comparing hex values.
 * - A single, documented type scale (1.200ish minor third) with fluid clamps.
 * - Motion tokens: short, purposeful durations with a consistent easing set.
 *
 * The palettes below are mirrored as CSS custom properties in `globals.css`
 * (keyed by `[data-theme="..."]`). Keep both in sync when adding a token.
 */

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  CYBER: 'cyber',
  SYSTEM: 'system',
};

export const THEME_STORAGE_KEY = 'ehc-portfolio-theme';

/**
 * Type scale.
 * - Display/H1-H3 use tight tracking and 1.05-1.3 line heights.
 * - Body copy uses a 1.6-1.7 line height and a 68ch measure for readability.
 * - Small labels use uppercase + 0.08em tracking for scannability.
 */
export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: 'var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
    display: 'var(--font-orbitron), var(--font-inter), ui-sans-serif, system-ui, sans-serif',
  },
  scale: {
    display: {
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      lineHeight: 1.05,
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h1: {
      fontSize: 'clamp(2rem, 4.5vw, 3rem)',
      lineHeight: 1.15,
      fontWeight: 750,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
      lineHeight: 1.3,
      fontWeight: 650,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.0625rem',
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.65,
      fontWeight: 400,
      letterSpacing: '0',
    },
    bodyLarge: {
      fontSize: '1.0625rem',
      lineHeight: 1.7,
      fontWeight: 400,
      letterSpacing: '0',
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: '0',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    mono: {
      fontSize: '0.8125rem',
      lineHeight: 1.6,
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  measure: '68ch',
  rules: {
    maxLineLength: '68ch',
    headingLineHeight: 1.2,
    bodyLineHeight: 1.65,
    minimumBodySize: '1rem',
    minimumTapTarget: '44px',
  },
};

/**
 * Layout / motion tokens. 4px spacing grid, restrained radii, soft layered
 * shadows and short durations keep the interface feeling precise.
 */
export const TOKENS = {
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    pill: '999px',
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },
  shadow: {
    xs: '0 1px 2px 0 rgba(15, 23, 42, 0.06)',
    sm: '0 1px 3px 0 rgba(15, 23, 42, 0.10), 0 1px 2px -1px rgba(15, 23, 42, 0.10)',
    md: '0 4px 12px -2px rgba(15, 23, 42, 0.12), 0 2px 6px -2px rgba(15, 23, 42, 0.08)',
    lg: '0 12px 28px -6px rgba(15, 23, 42, 0.16), 0 4px 10px -4px rgba(15, 23, 42, 0.08)',
    xl: '0 24px 56px -12px rgba(15, 23, 42, 0.22)',
    inner: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
  },
  duration: {
    instant: 0,
    fast: 120,
    base: 200,
    slow: 320,
    slower: 480,
    loop: 6000,
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',
    entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
    linear: 'linear',
  },
  zIndex: {
    base: 0,
    raised: 10,
    sticky: 20,
    overlay: 30,
    nav: 40,
    floating: 50,
    top: 60,
  },
  motion: {
    stagger: 60,
    hoverScale: 1.03,
    distance: { sm: '8px', md: '16px', lg: '24px' },
  },
};

/**
 * Color palettes.
 * Every foreground/background pair below was checked against WCAG 2.1 AA
 * (4.5:1 for body copy, 3:1 for large text and UI borders).
 */
export const COLORS = {
  [THEMES.LIGHT]: {
    primary: '#4F46E5',
    secondary: '#1F2937',
    accent: '#BE185D',
    background: '#FFFFFF',
    hero: '#F8FAFC',
    foreground: '#111827',
    muted: '#4B5563',
    card: '#FFFFFF',
    surface: '#F1F5F9',
    border: '#E2E8F0',
    borderStrong: '#64748B',
    onPrimary: '#FFFFFF',
    onAccent: '#FFFFFF',
    onSecondary: '#FFFFFF',
    focus: '#4F46E5',
    success: '#15803D',
    warning: '#B45309',
    danger: '#DC2626',
    info: '#0E7490',
    glow: 'rgba(79, 70, 229, 0.28)',
    gridLine: 'rgba(79, 70, 229, 0.08)',
    overlay: 'rgba(15, 23, 42, 0.55)',
    neon: { cyan: '#0891B2', magenta: '#DB2777', violet: '#7C3AED', lime: '#4D7C0F' },
    holo: ['#4F46E5', '#DB2777', '#0891B2', '#7C3AED'],
  },
  [THEMES.DARK]: {
    primary: '#22D3EE',
    secondary: '#1E293B',
    accent: '#F472B6',
    background: '#0B0F17',
    hero: '#111827',
    foreground: '#F1F5F9',
    muted: '#A8B3C4',
    card: '#151C2B',
    surface: '#1B2334',
    border: '#28324A',
    borderStrong: '#64748B',
    onPrimary: '#04212B',
    onAccent: '#3B0A25',
    onSecondary: '#F1F5F9',
    focus: '#22D3EE',
    success: '#4ADE80',
    warning: '#FBBF24',
    danger: '#F87171',
    info: '#38BDF8',
    glow: 'rgba(34, 211, 238, 0.35)',
    gridLine: 'rgba(34, 211, 238, 0.07)',
    overlay: 'rgba(2, 6, 16, 0.75)',
    neon: { cyan: '#22D3EE', magenta: '#F472B6', violet: '#A78BFA', lime: '#A3E635' },
    holo: ['#22D3EE', '#F472B6', '#A78BFA', '#A3E635'],
  },
  [THEMES.CYBER]: {
    primary: '#00E5FF',
    secondary: '#141B2E',
    accent: '#FF2E9A',
    background: '#05070E',
    hero: '#0A0F1C',
    foreground: '#E6F7FF',
    muted: '#8FA3BF',
    card: '#0D1424',
    surface: '#121A2C',
    border: '#1E2A44',
    borderStrong: '#5B7099',
    onPrimary: '#041016',
    onAccent: '#2A0416',
    onSecondary: '#E6F7FF',
    focus: '#00E5FF',
    success: '#7CFF6B',
    warning: '#FFE45E',
    danger: '#FF5A5F',
    info: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.42)',
    gridLine: 'rgba(0, 229, 255, 0.10)',
    overlay: 'rgba(2, 4, 10, 0.80)',
    neon: { cyan: '#00E5FF', magenta: '#FF2E9A', violet: '#B14CFF', lime: '#B6FF3C' },
    holo: ['#00E5FF', '#B14CFF', '#FF2E9A', '#FFE45E'],
  },
};

const DARK_BASED_THEMES = new Set([THEMES.DARK, THEMES.CYBER]);

const ThemeContext = createContext({
  theme: THEMES.SYSTEM,
  resolvedTheme: THEMES.LIGHT,
  setTheme: () => null,
  colors: COLORS[THEMES.LIGHT],
  typography: TYPOGRAPHY,
  tokens: TOKENS,
  isCyber: false,
  isDark: false,
});

function isValidTheme(value) {
  return Object.values(THEMES).includes(value);
}

function readStoredTheme() {
  if (typeof window === 'undefined') return THEMES.SYSTEM;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(stored) ? stored : THEMES.SYSTEM;
  } catch {
    return THEMES.SYSTEM;
  }
}

// Layout effects let us patch the theme before the browser paints, which
// avoids a flash of the server rendered theme.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(THEMES.SYSTEM);
  const [systemTheme, setSystemTheme] = useState(null);

  // Resolve "system" against the OS preference.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT);
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  // Hydrate the persisted preference and the OS preference before the first
  // paint. Running this in a layout effect keeps the hydration render identical
  // to the server render (no mismatch warnings) while still applying the real
  // theme before the browser paints.
  useIsomorphicLayoutEffect(() => {
    const stored = readStoredTheme();
    if (stored !== theme) {
      setThemeState(stored);
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT);
  }, []);

  const resolvedTheme = useMemo(() => {
    if (theme !== THEMES.SYSTEM) return theme;
    return systemTheme ?? THEMES.LIGHT;
  }, [theme, systemTheme]);

  const colors = useMemo(() => COLORS[resolvedTheme] ?? COLORS[THEMES.LIGHT], [resolvedTheme]);

  const isCyber = resolvedTheme === THEMES.CYBER;
  const isDark = DARK_BASED_THEMES.has(resolvedTheme);

  // Apply the theme to the document: data-theme drives the CSS variables,
  // .dark keeps Tailwind's dark variants in sync.
  useIsomorphicLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', colors.background);
    }
  }, [resolvedTheme, isDark, colors.background]);

  const setTheme = useCallback((newTheme) => {
    if (!isValidTheme(newTheme)) {
      console.error(`Invalid theme: ${newTheme}`);
      return;
    }
    setThemeState(newTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      /* storage unavailable (private mode) - theme stays session-only */
    }
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      colors,
      typography: TYPOGRAPHY,
      tokens: TOKENS,
      isCyber,
      isDark,
    }),
    [theme, resolvedTheme, setTheme, colors, isCyber, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
