"use client";

import { useTheme } from "../app/ThemeContext";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Shared section heading.
 * Uses the type scale from ThemeContext with the cyberpunk treatment
 * (display font + glowing gradient accent bar) shared by both themes.
 */
export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  const { colors, typography } = useTheme();

  return (
    <header className={`text-center mb-10 sm:mb-14 ${className}`}>
      <h2
        className="cyber-display text-3xl sm:text-4xl font-extrabold mb-4 break-words"
        style={{
          color: colors.foreground,
          textShadow: `0 0 22px ${colors.glow}`,
        }}
      >
        {title}
      </h2>

      <div
        className="h-1.5 w-20 sm:w-24 mx-auto rounded-full"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
          boxShadow: `0 0 18px ${colors.glow}`,
        }}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className="mt-6 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: colors.muted, lineHeight: typography.scale.bodyLarge.lineHeight }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
