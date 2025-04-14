"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "../app/ThemeContext";

// Define types for our nav links
interface NavLink {
  name: string;
  path: string;
}

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { colors, theme, resolvedTheme } = useTheme();
  
  // Determine if we're in dark mode based on theme or resolvedTheme
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const navLinks: NavLink[] = [
    { name: "Home", path: "/homepage"},
    { name: "About", path: "/aboutmepage"},
    { name: "Projects", path: "/projectspage"},
    { name: "Contact", path: "/contactpage"},
  ];

  // Function to determine if a link is active
  const isActive = (path: string): boolean => {
    // Check if the current pathname matches the link path
    if (pathname === path) return true;
    
    // Special case for homepage
    if (pathname === "/" && path === "/homepage") return true;
    
    return false;
  };

  // Function to handle navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string): void => {
    e.preventDefault();
    
    // Navigate to the page using the Next.js router
    router.push(path);
    
    // Close the mobile menu if it's open
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
      {/* Logo/Brand Section */}
      <div className="flex items-center">
        <a 
          href="/homepage"
          className="flex items-center gap-2"
          onClick={(e) => handleNavigation(e, "/homepage")}
          style={{ color: colors.foreground }}
        >
          <Image
            src="/next.svg"
            alt="Erick Herrera logo"
            width={90}
            height={20}
            priority
            className={isDark ? "invert" : ""}
          />
          <span className="font-semibold text-xl ml-2 hidden sm:inline">Erick Herrera Cabrera</span>
        </a>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <a
            key={link.path}
            href={link.path}
            onClick={(e) => handleNavigation(e, link.path)}
            className="transition-colors duration-300"
            style={{ 
              color: isActive(link.path) ? colors.accent : colors.foreground,
              fontWeight: isActive(link.path) ? 'medium' : 'normal',
              textDecoration: isActive(link.path) ? 'underline' : 'none',
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
                  color: isActive(link.path) ? colors.accent : colors.foreground,
                  fontWeight: isActive(link.path) ? 'medium' : 'normal',
                  borderColor: isDark ? '#374151' : '#f3f4f6'
                }}
                onClick={(e) => handleNavigation(e, link.path)}
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