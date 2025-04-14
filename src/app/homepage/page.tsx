"use client";

import ThemeToggle from "../ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
      
      {/* Header/Welcome Section with Theme Colors */}
      <section 
        id="home" 
        className="py-16 md:py-24 bg-background transition-colors duration-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 mt-10 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Welcome to my portfolio
            </h1>
            <h2 className="mb-6 text-lg sm:text-xl font-semibold text-text">
              Here you will get to know more about my software engineering journey.
            </h2>
            
            <div className="flex space-x-6 mt-4">
              <a 
                href="https://github.com/erickherrera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary px-4 py-2 font-bold rounded-md transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary px-4 py-2 font-bold rounded-md transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
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
        className="py-20 bg-hero border-t-4 border-accent transition-colors duration-200"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
        </div>
      </section>
    </div>
  );
}