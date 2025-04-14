"use client";

import Image from "next/image";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../ThemeContext";

export default function Home() {
  // Now we DO need to use the theme hook to access colors
  const { colors } = useTheme();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
      
      {/* Header/Welcome Section with Theme Colors */}
      <section 
        id="home" 
        className="py-16 md:py-24 transition-colors duration-200"
        style={{
          background: `linear-gradient(to bottom, ${colors.background}, ${colors.background})` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 
              className="mb-4 mt-10 text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: colors.foreground }}
            >
              Welcome to my portfolio
            </h1>
            <h2 
              className="mb-6 text-lg sm:text-xl font-semibold"
              style={{ color: colors.foreground === '#171717' ? '#4B5563' : '#D1D5DB' }}
            >
              Here you will get to know more about my software engineering journey.
            </h2>
            
            <div className="flex space-x-6 mt-4">
              <a 
                href="https://github.com/erickherrera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 font-bold rounded-md transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: colors.primary,
                  color: 'white'
                }}
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 font-bold rounded-md transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: colors.secondary,
                  color: 'white'
                }}
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero/About Section with Theme Colors */}
      <section 
        id="about" 
        className="py-20 border-t-4 transition-colors duration-200"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        
      </section>
    </div>
  );
}