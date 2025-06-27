"use client";

import { JSX, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../app/ThemeContext";

// Define types for our nav links
interface NavLink {
  name: string;
  path: string;
  isHash: boolean;
}

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("#home");
  const router = useRouter();
  const { colors, theme, resolvedTheme } = useTheme();
  
  // Determine if we're in dark mode based on theme or resolvedTheme
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const navLinks: NavLink[] = [
    { name: "Home", path: "#home", isHash: true },
    { name: "About", path: "#about", isHash: true },
    { name: "Tech Stack", path: "#tech", isHash: true },
    { name: "My Projects", path: "#projects", isHash: true },
    { name: "Contact", path: "#contact", isHash: true },
  ];

  // Set up intersection observer for section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
          // Update URL hash without scrolling
          window.history.replaceState(null, '', `#${entry.target.id}`);
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = ['home', 'about', 'projects', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Check initial hash
    const currentHash = window.location.hash || '#home';
    setActiveSection(currentHash);

    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Function to determine if a link is active
  const isActive = (path: string): boolean => {
    return activeSection === path;
  };

  // Function to handle navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isHash: boolean): void => {
    e.preventDefault();
    
    if (isHash) {
      // For hash links, scroll to the section
      const elementId = path.substring(1); // Remove the #
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(path);
      }
    } else {
      // For non-hash links (like Projects), use the router
      router.push(path);
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav 
      className="w-full py-4 px-6 sm:px-10 flex justify-between items-center shadow-sm sticky top-0 z-10 transition-colors duration-200"
      style={{ 
        backgroundColor: colors.background,
        color: colors.foreground
      }}
    >

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8 ml-auto items-center">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={(e) => handleNavigation(e, link.path, link.isHash)}
            className="relative py-2 transition-all duration-300 hover:opacity-80"
            style={{ 
              color: isActive(link.path) ? colors.accent : colors.foreground,
              fontWeight: isActive(link.path) ? '600' : '400',
            }}
          >
            {link.name}
            {/* Animated underline */}
            <span 
              className="absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300"
              style={{
                backgroundColor: colors.accent,
                transform: isActive(link.path) ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden ml-auto">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md transition-colors duration-200"
          style={{ 
            color: colors.foreground,
            backgroundColor: 'transparent',
          }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div 
          className="absolute top-16 right-0 left-0 shadow-md z-50 md:hidden"
          style={{ backgroundColor: colors.background }}
        >
          <div className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="py-3 px-4 my-1 rounded transition-all duration-200"
                style={{ 
                  color: isActive(link.path) ? colors.accent : colors.foreground,
                  fontWeight: isActive(link.path) ? '600' : '400',
                  backgroundColor: isActive(link.path) ? `${colors.accent}15` : 'transparent',
                  borderLeft: isActive(link.path) ? `3px solid ${colors.accent}` : '3px solid transparent',
                }}
                onClick={(e) => handleNavigation(e, link.path, link.isHash)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}