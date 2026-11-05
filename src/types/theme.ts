/**
 * Shape of the color palette exposed by ThemeContext.
 * Keep in sync with `COLORS` in src/app/ThemeContext.js.
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  hero: string;
  foreground: string;
  muted: string;
  card: string;
  surface: string;
  border: string;
  borderStrong: string;
  onPrimary: string;
  onAccent: string;
  onSecondary: string;
  focus: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  glow: string;
  gridLine: string;
  overlay: string;
  neon: {
    cyan: string;
    magenta: string;
    violet: string;
    lime: string;
  };
  holo: string[];
}
