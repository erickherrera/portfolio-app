"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import {
  NAV_LINKS,
  RESUME_FILENAME,
  RESUME_PATH,
  SECTION_IDS,
} from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";

interface GtagWindow extends Window {
  gtag?: (
    command: string,
    action: string,
    parameters: { event_category?: string; event_label?: string }
  ) => void;
}

export default function NavBar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { colors } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS, {
    rootMargin: "-20% 0px -70% 0px",
    updateHash: true,
  });

  const isActive = (path: string): boolean => path === `#${activeSection}`;

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ): void => {
    e.preventDefault();

    const elementId = path.substring(1);
    document.getElementById(elementId)?.scrollIntoView({ behavior: "auto" });

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleResumeDownload = () => {
    if (typeof window === "undefined") return;
    (window as GtagWindow).gtag?.("event", "download", {
      event_category: "Resume",
      event_label: "Navbar Download",
    });
  };

  return (
    <nav
      className="w-full h-[72px] pl-6 sm:pl-10 pr-0 flex justify-between items-center shadow-sm fixed top-0 z-10 transition-colors duration-200"
      style={{ backgroundColor: colors.background, color: colors.foreground }}
    >
      {/* Logo and Name */}
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12">
          <Image src="/LOGO3.webp" alt="Logo" fill className="object-contain" priority />
          <div
            className="absolute inset-0 rounded mix-blend-overlay"
            style={{
              background: `linear-gradient(135deg, ${colors.background}30, ${colors.primary}20, ${colors.accent}15)`,
            }}
          />
        </div>

        <div className="hidden sm:block">
          <div className="font-bold text-lg leading-tight" style={{ color: colors.foreground }}>
            Erick Herrera
          </div>
          <div className="text-sm font-medium" style={{ color: colors.accent }}>
            Software Engineer
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center h-full">
        <div className="flex space-x-8 items-center mr-8 h-full">
          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => handleNavigation(e, link.path)}
              className="relative py-2 transition-all duration-300 hover:opacity-80"
              style={{
                color: isActive(link.path) ? colors.accent : colors.foreground,
                fontWeight: isActive(link.path) ? "600" : "400",
              }}
              aria-current={isActive(link.path) ? "true" : undefined}
            >
              {link.name}
              <span
                className="absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300"
                style={{
                  backgroundColor: colors.accent,
                  transform: isActive(link.path) ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </a>
          ))}
        </div>

        <a
          href={RESUME_PATH}
          download={RESUME_FILENAME}
          onClick={handleResumeDownload}
          className="flex items-center gap-2 px-6 h-full transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: colors.accent, color: colors.background }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.accent;
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-md font-bold">Resume</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden pr-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md transition-colors duration-200"
          style={{ color: colors.foreground }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            {NAV_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="py-3 px-4 my-1 rounded transition-all duration-200"
                style={{
                  color: isActive(link.path) ? colors.accent : colors.foreground,
                  fontWeight: isActive(link.path) ? "600" : "400",
                  backgroundColor: isActive(link.path) ? `${colors.accent}15` : "transparent",
                  borderLeft: isActive(link.path)
                    ? `3px solid ${colors.accent}`
                    : "3px solid transparent",
                }}
                onClick={(e) => handleNavigation(e, link.path)}
              >
                {link.name}
              </a>
            ))}

            <div className="border-t my-2 pt-2" style={{ borderColor: colors.border }}>
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                onClick={handleResumeDownload}
                className="flex items-center gap-2 py-3 px-4 my-1 rounded transition-all duration-200"
                style={{ backgroundColor: colors.accent, color: colors.background }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-md font-bold">Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
