"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation links - updated to use section IDs instead of routes
  const navLinks = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" },
    { name: "Projects", path: "#projects" },
    { name: "Contact", path: "#contact" },
  ];

  // Function to determine if a link is active - simplified for hash links
  const isActive = (path) => {
    if (pathname === "/" && path === "#home") return true;
    if (path === "#home") return false; // Only highlight home when exactly at /
    
    // For other sections, check if the URL has the hash
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    return currentHash === path;
  };

  // Function to handle smooth scrolling
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="w-full py-4 px-6 sm:px-10 flex justify-between items-center shadow-sm bg-white dark:bg-black sticky top-0 z-10">
      {/* Logo/Brand Section */}
      <div className="flex items-center">
        <a 
          href="#home"
          className="flex items-center gap-2"
          onClick={(e) => scrollToSection(e, "#home")}
        >
          <Image
            src="/next.svg"
            alt="Erick Herrera logo"
            width={90}
            height={20}
            priority
            className="dark:invert"
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
            onClick={(e) => scrollToSection(e, link.path)}
            className={`transition-colors duration-300 hover:text-blue-600 ${
              isActive(link.path)
                ? "font-medium text-blue-600 underline underline-offset-4"
                : ""
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
        <div className="absolute top-16 right-0 left-0 bg-white dark:bg-black shadow-md z-50 md:hidden">
          <div className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`py-3 border-b border-gray-100 dark:border-gray-800 ${
                  isActive(link.path) ? "font-medium text-blue-600" : ""
                }`}
                onClick={(e) => scrollToSection(e, link.path)}
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