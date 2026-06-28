"use client";

import { useTheme } from "../app/ThemeContext";

export default function ThemedFooter() {
  const { colors } = useTheme();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 py-2 z-10 transition-colors duration-200"
      style={{
        backgroundColor: colors?.background,
        borderTop: `1px solid ${colors?.border || '#E5E7EB'}`
      }}
    >
      <div
        className="container mx-auto text-center text-xs sm:text-sm px-4 transition-colors duration-200"
        style={{ color: colors?.foreground }}
      >
        © {new Date().getFullYear()} Erick Herrera. All Rights Reserved.
      </div>
    </footer>
  );
}