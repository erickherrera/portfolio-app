"use client";

import { createContext, useContext, useEffect, useState } from 'react';

// Define available themes
export const THEMES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
});

// Create context with default values
const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  toggleTheme: () => {},
  setTheme: () => {}
});

export function ThemeProvider({ children, defaultTheme = THEMES.SYSTEM }) {
  const [theme, setTheme] = useState(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT);
  
  // Function to determine the actual theme based on system preference
  const resolveTheme = (themeValue) => {
    if (themeValue !== THEMES.SYSTEM) return themeValue;
    
    return typeof window !== 'undefined' && 
      window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEMES.DARK 
      : THEMES.LIGHT;
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    setTheme(savedTheme);
    setResolvedTheme(resolveTheme(savedTheme));
    
    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === THEMES.SYSTEM) {
        setResolvedTheme(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [defaultTheme, theme]);

  // Apply the theme class to the document
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const newResolvedTheme = resolveTheme(theme);
    setResolvedTheme(newResolvedTheme);
    
    if (newResolvedTheme === THEMES.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark (skipping system)
  const toggleTheme = () => {
    setTheme(prevTheme => {
      // If the current theme is system, choose based on the resolved theme
      if (prevTheme === THEMES.SYSTEM) {
        return resolvedTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      }
      return prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    });
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        resolvedTheme,
        toggleTheme,
        setTheme,
        isLight: resolvedTheme === THEMES.LIGHT,
        isDark: resolvedTheme === THEMES.DARK,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

