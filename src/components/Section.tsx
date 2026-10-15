"use client";

import { useTheme } from "@/components/ThemeProvider";

interface SectionProps {
  id: string;
  variant?: "background" | "hero";
  className?: string;
  children: React.ReactNode;
}

export default function Section({
  id,
  variant = "hero",
  className = "",
  children,
}: SectionProps) {
  const { colors } = useTheme();

  return (
    <section
      id={id}
      className={`pt-16 pb-16 md:pt-20 md:pb-20 border-t-6 transition-colors duration-200 scroll-mt-20 w-full ${className}`}
      style={{
        backgroundColor:
          variant === "background" ? colors.background : colors.hero,
        borderColor: colors.accent,
      }}
    >
      <div className="w-full overflow-hidden">{children}</div>
    </section>
  );
}
