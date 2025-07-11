"use client";

import { useTheme, THEMES } from './ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, colors } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Get the appropriate label for accessibility
  const getThemeLabel = () => {
    const labels = {
      [THEMES.LIGHT]: 'Light',
      [THEMES.DARK]: 'Dark',
      [THEMES.SYSTEM]: 'System'
    };
    return `Current theme: ${labels[theme]}. Click to switch theme.`;
  };

  // Get button background color based on hover state
  const getBackgroundColor = () => {
    if (isHovered) {
      // Use a slightly different shade on hover
      return colors.primary;
    }
    return colors.accent;
  };

  return (
    <button
      onClick={cycleTheme}
      className="w-12 h-12 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300"
      style={{
        backgroundColor: getBackgroundColor(),
        color: colors.background,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={getThemeLabel()}
    >
      <span className="sr-only">{getThemeLabel()}</span>
      
      {/* Light mode icon (sun) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth={2} 
        stroke="currentColor" 
        className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
          theme === THEMES.LIGHT ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
        }`}
        style={{ color: colors.background }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
      
      {/* Dark mode icon (moon) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth={2} 
        stroke="currentColor" 
        className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
          theme === THEMES.DARK ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
        }`}
        style={{ color: colors.background }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
      
      {/* System preference icon (computer) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        strokeWidth={2} 
        stroke="currentColor" 
        className={`w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
          theme === THEMES.SYSTEM ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
        }`}
        style={{ color: colors.background }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
      
      {/* Placeholder to maintain button size */}
      <div className="w-5 h-5 opacity-0">
        <span className="sr-only">Spacer</span>
      </div>
    </button>
  );
}