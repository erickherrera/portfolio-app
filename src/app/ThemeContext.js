"use client";

import { createContext, useContext, useEffect, useState } from 'react';

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Theme colors mapping with new modern color palette
export const COLORS = {
  [THEMES.LIGHT]: {
    primary: '#8b5cf6',    // Modern purple
    secondary: '#475569',  // Space black (600)
    background: '#ffffff', // Pearl white
    hero: '#f5f5f5',       // Pearl white (200)
    accent: '#0284c7',     // Airforce blue
    foreground: '#0f172a', // Space black (900)
    text: '#334155',       // Space black (700)
  },
  [THEMES.DARK]: {
    primary: '#a78bfa',    // Purple (400) - lighter for dark mode
    secondary: '#64748b',  // Space black (500) - lighter for dark mode
    background: '#0f172a', // Space black (900)
    hero: '#1e293b',       // Space black (800)
    accent: '#38bdf8',     // Airforce blue (400) - lighter for dark mode
    foreground: '#f5f5f5', // Pearl white (200)
    text: '#cbd5e1',       // Space black (300) - light text for dark mode
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

  // Apply CSS variables for theme colors
  const applyThemeColors = (theme) => {
    const root = document.documentElement;
    const themeColors = COLORS[theme];
    
    // Set CSS variables
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
      root.style.setProperty(`--color-${key}-${theme}`, value);
    });
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
      applyThemeColors(resolved);
      
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
      applyThemeColors(resolved);
      
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