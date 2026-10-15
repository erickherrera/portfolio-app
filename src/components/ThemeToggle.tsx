"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { THEMES, type Theme } from "@/lib/theme";

const THEME_ORDER: Theme[] = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM];

const LABELS: Record<Theme, string> = {
  [THEMES.LIGHT]: "Light",
  [THEMES.DARK]: "Dark",
  [THEMES.SYSTEM]: "System",
};

const ICON_PATHS: Record<Theme, string> = {
  [THEMES.LIGHT]:
    "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  [THEMES.DARK]:
    "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z",
  [THEMES.SYSTEM]:
    "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
};

export default function ThemeToggle() {
  const { theme, setTheme, colors } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    setTheme(THEME_ORDER[nextIndex]);
  };

  if (!mounted) return null;

  const label = `Current theme: ${LABELS[theme]}. Click to switch theme.`;

  return (
    <button
      onClick={cycleTheme}
      className="relative w-12 h-12 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
      style={{
        backgroundColor: isHovered ? colors.primary : colors.accent,
        color: colors.background,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      {THEME_ORDER.map((option) => (
        <svg
          key={option}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
          className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
            theme === option
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
          style={{ color: colors.background }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={ICON_PATHS[option]}
          />
        </svg>
      ))}
      <div className="w-5 h-5 opacity-0" aria-hidden="true" />
    </button>
  );
}
