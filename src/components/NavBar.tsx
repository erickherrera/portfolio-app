"use client";

import { JSX, useState } from "react";
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
  const pathname = usePathname();
  const router = useRouter();
  const { colors, theme, resolvedTheme } = useTheme();
  
  // Determine if we're in dark mode based on theme or resolvedTheme
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const navLinks: NavLink[] = [
    { name: "Home", path: "/homepage", isHash: false },
    { name: "About", path: "#about", isHash: true },
    { name: "Projects", path: "/projectspage", isHash: false },
    { name: "Contact", path: "#contact", isHash: true },
  ];

  // Function to determine if a link is active
  const isActive = (path: string, isHash: boolean): boolean => {
    if (!isHash) {
      // For non-hash links (like Projects), check the pathname
      return pathname === path;
    }
    
    if (pathname === "/" && path === "#home") return true;
    if (path === "#home") return false; // Only highlight home when exactly at /
    
    // For other sections, check if the URL has the hash
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    return currentHash === path;
  };

  // Function to handle navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isHash: boolean): void => {
    e.preventDefault();
    
    if (isHash) {
      // For hash links, scroll to the section
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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
      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={(e) => handleNavigation(e, link.path, link.isHash)}
            className="transition-colors duration-300"
            style={{ 
              color: isActive(link.path, link.isHash) ? colors.accent : colors.foreground,
              fontWeight: isActive(link.path, link.isHash) ? 'medium' : 'normal',
              textDecoration: isActive(link.path, link.isHash) ? 'underline' : 'none',
              textUnderlineOffset: '4px'
            }}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
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
                className="py-3 border-b transition-colors duration-200"
                style={{ 
                  color: isActive(link.path, link.isHash) ? colors.accent : colors.foreground,
                  fontWeight: isActive(link.path, link.isHash) ? 'medium' : 'normal',
                  borderColor: isDark ? '#374151' : '#f3f4f6'
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