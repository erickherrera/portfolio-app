"use client";

import { useTheme } from "../app/ThemeContext";

export default function ThemedFooter() {
  const { resolvedTheme } = useTheme();
  
  const textColor = resolvedTheme === 'dark' ? '#ffffff' : '#000000';
  
  return (
    <footer className="mt-auto py-4 border-t border-gray-200 dark:border-gray-800">
      <div 
        className="container mx-auto text-center text-sm transition-colors duration-200"
        style={{ color: textColor }}
      >
        © {new Date().getFullYear()} Erick Herrera. All Rights Reserved.
      </div>
    </footer>
  );
}