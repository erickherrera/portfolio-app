"use client";

import { useTheme, THEMES } from './ThemeContext';
import { useEffect, useState, useMemo } from 'react';

// Move SVG icons outside the component
const SunIcon = ({ isDarkMode, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={isDarkMode ? "#171717" :"none"}
    strokeWidth={1.5} 
    stroke={isDarkMode ? "#ededed" : "currentColor"}
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = ({ isDarkMode, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={isDarkMode ? "#171717" :"none"}
    strokeWidth={1.5} 
    stroke={isDarkMode ? "#ededed" : "currentColor"}
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const ComputerIcon = ({ isDarkMode, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={isDarkMode ? "#171717" :"none"}
    strokeWidth={1.5} 
    stroke={isDarkMode ? "#ededed" : "currentColor"}
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>
);

// Theme labels defined outside component
const THEME_LABELS = {
  [THEMES.LIGHT]: 'Light',
  [THEMES.DARK]: 'Dark',
  [THEMES.SYSTEM]: 'System'
};

// Theme cycle map for easier maintenance
const NEXT_THEME = {
  [THEMES.LIGHT]: THEMES.DARK,
  [THEMES.DARK]: THEMES.SYSTEM,
  [THEMES.SYSTEM]: THEMES.LIGHT
};

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simplified theme cycling using the map
  const cycleTheme = () => {
    setTheme(NEXT_THEME[theme]);
  };

  // Memoized theme label
  const themeLabel = useMemo(() => {
    return `Current theme: ${THEME_LABELS[theme]}. Click to switch theme.`;
  }, [theme]);
  
  // Next theme label for tooltip
  const nextThemeLabel = useMemo(() => {
    return `Switch to ${THEME_LABELS[NEXT_THEME[theme]]} theme`;
  }, [theme]);

  // Don't render anything until component is mounted to prevent hydration mismatch
  if (!mounted) return null;

  // Get actual icon classes based on theme state
  const getIconClasses = (iconTheme) => {
    return `w-5 h-5 absolute inset-0 m-auto transition-all duration-300 ${
      theme === iconTheme ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-75'
    }`;
  };

  // Special case for system theme - show which actual theme is applied
  const systemThemeIndicator = theme === THEMES.SYSTEM ? (
    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" 
      style={{ backgroundColor: resolvedTheme === THEMES.DARK ? '#fff' : '#000' }} 
      aria-hidden="true" 
    />
  ) : null;

  return (
    <div className="relative">
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {nextThemeLabel}
        </div>
      )}
      <button
        onClick={cycleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label={themeLabel}
      >
        <span className="sr-only">{themeLabel}</span>
        
        {/* Light mode icon */}
        <div className={getIconClasses(THEMES.LIGHT)}>
          <SunIcon />
        </div>
        
        {/* Dark mode icon */}
        <div className={getIconClasses(THEMES.DARK)}>
          <MoonIcon isDarkMode={resolvedTheme === THEMES.DARK} />
        </div>
        
        {/* System preference icon */}
        <div className={getIconClasses(THEMES.SYSTEM)}>
          <ComputerIcon />
        </div>
        
        {/* System theme indicator */}
        {systemThemeIndicator}
        
        {/* Placeholder to maintain button size */}
        <div className="w-5 h-5 opacity-0">
          <span className="sr-only">Spacer</span>
        </div>
      </button>
    </div>
  );
}