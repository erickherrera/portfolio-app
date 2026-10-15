export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];
export type ResolvedTheme = typeof THEMES.LIGHT | typeof THEMES.DARK;

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  hero: string;
  accent: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  surface: string;
}

export const COLORS: Record<ResolvedTheme, ThemeColors> = {
  [THEMES.LIGHT]: {
    primary: "#949494",
    secondary: "#51273c",
    background: "#FFFFFF",
    hero: "#F8F9FA",
    accent: "#51273c",
    foreground: "#171717",
    muted: "#949494",
    card: "#FFFFFF",
    border: "#E5E7EB",
    text: "#374151",
    textMuted: "#6B7280",
    surface: "#F9FAFB",
  },
  [THEMES.DARK]: {
    primary: "#949494",
    secondary: "#a64d79",
    background: "#1a1a1a",
    hero: "#2a2a2a",
    accent: "#a64d79",
    foreground: "#ededed",
    muted: "#6B7280",
    card: "#2a2a2a",
    border: "#374151",
    text: "#D1D5DB",
    textMuted: "#9CA3AF",
    surface: "#1F2937",
  },
};

export const THEME_STORAGE_KEY = "theme";
