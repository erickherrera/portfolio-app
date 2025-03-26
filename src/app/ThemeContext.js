"use client";

import { createContext, useContext, useEffect, useState } from 'react';

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Theme colors mapping
export const COLORS = {
  [THEMES.LIGHT]: {
    primary: '#3B82F6',    // blue-500
    secondary: '#1F2937',  // gray-800
    background: '#FFFFFF', // white
    hero: '#E5E7EB',       // gray-200
    accent: '#3B82F6',     // blue-500
    foreground: '#171717', // near black for light mode
  },
  [THEMES.DARK]: {
    primary: '#60A5FA',    // blue-400
    secondary: '#374151',  // gray-700
    background: '#1F2937', // gray-800
    hero: '#1F2937',       // gray-800
    accent: '#60A5FA',     // blue-400
    foreground: '#ededed', // near white for dark mode
  },
};

// Create Theme Context
const ThemeContext = createContext({
  theme: THEMES.SYSTEM,
  resolvedTheme: THEMES.LIGHT,
  setTheme: () => null,
  colors: COLORS[THEMES.LIGHT],
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(THEMES.SYSTEM);
  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT);
  const [colors, setColors] = useState(COLORS[THEMES.LIGHT]);

  // Function to update theme
  const setTheme = (newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.error(`Invalid theme: ${newTheme}`);
      return;
    }
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  // Effect to handle theme change and system preference
  useEffect(() => {
    // Get stored theme or default to system
    const storedTheme = localStorage.getItem('theme') || THEMES.SYSTEM;
    setThemeState(storedTheme);

    // Setup system preference change listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to handle theme resolution
    const resolveTheme = () => {
      const currentTheme = localStorage.getItem('theme') || THEMES.SYSTEM;
      const isDarkMode = mediaQuery.matches;
      const resolved = currentTheme === THEMES.SYSTEM 
        ? (isDarkMode ? THEMES.DARK : THEMES.LIGHT)
        : currentTheme;
      
      setResolvedTheme(resolved);
      setColors(COLORS[resolved]);
      
      // Apply or remove dark class on document
      if (resolved === THEMES.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Initial resolution
    resolveTheme();

    // Add listener for system preference changes
    const handleChange = () => resolveTheme();
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Effect to handle theme changes
  useEffect(() => {
    const resolveAndApplyTheme = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = theme === THEMES.SYSTEM 
        ? (isDarkMode ? THEMES.DARK : THEMES.LIGHT)
        : theme;
      
      setResolvedTheme(resolved);
      setColors(COLORS[resolved]);
      
      if (resolved === THEMES.DARK) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    resolveAndApplyTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};