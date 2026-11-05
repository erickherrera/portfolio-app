"use client";

import { useTheme } from "../app/ThemeContext";

export default function ThemedFooter() {
  const { colors } = useTheme();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 py-2 z-40 transition-colors duration-200 backdrop-blur-md"
      style={{
        backgroundColor: `${colors.background}D9`,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div
        className="container mx-auto text-center text-xs sm:text-sm px-4 transition-colors duration-200"
        style={{ color: colors.muted }}
      >
        © {new Date().getFullYear()} Erick Herrera. All Rights Reserved.
      </div>
    </footer>
  );
}
