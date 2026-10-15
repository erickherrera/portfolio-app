"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  COLORS,
  THEMES,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type Theme,
  type ThemeColors,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && Object.values(THEMES).includes(value as Theme);
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return THEMES.LIGHT;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(THEMES.SYSTEM);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(THEMES.LIGHT);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const resolved =
        theme === THEMES.SYSTEM ? getSystemTheme() : (theme as ResolvedTheme);
      setResolvedTheme(resolved);
      document.documentElement.classList.toggle("dark", resolved === THEMES.DARK);
      document.documentElement.style.colorScheme = resolved;
    };

    apply();

    if (theme !== THEMES.SYSTEM) return;
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    if (!isTheme(next)) return;
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      colors: COLORS[resolvedTheme],
    }),
    [theme, resolvedTheme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
