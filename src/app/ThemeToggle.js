"use client";

import { useTheme, THEMES } from './ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to cycle through the themes
  const cycleTheme = () => {
    const themeOrder = [THEMES.LIGHT, THEMES.DARK, THEMES.SYSTEM];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  // Don't render anything until component is mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
    >
      {/* Light mode icon (sun) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={`w-5 h-5 transition-opacity ${theme === THEMES.LIGHT ? 'opacity-100' : 'opacity-0 absolute'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
      
      {/* Dark mode icon (moon) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={`w-5 h-5 transition-opacity ${theme === THEMES.DARK ? 'opacity-100' : 'opacity-0 absolute'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
      
      {/* System preference icon (computer) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={`w-5 h-5 transition-opacity ${theme === THEMES.SYSTEM ? 'opacity-100' : 'opacity-0 absolute'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    </button>
  );
}