"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { SECTIONS, SECTION_IDS } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function SectionNav() {
  const { colors } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);
  const [showAnimation, setShowAnimation] = useState(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth" });

    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    setShowAnimation(true);
    animationTimeoutRef.current = setTimeout(() => setShowAnimation(false), 1000);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setShowAnimation(true);

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => setShowAnimation(false), 300);

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  const inactiveDotBorder =
    colors.background === "#FFFFFF" ? "#9CA3AF" : "#6B7280";

  return (
    <>
      {/* Desktop Navigation Indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <div key={section.id} className="relative group">
              <div
                className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  showAnimation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}
                style={{ backgroundColor: colors.foreground, color: colors.background }}
              >
                {section.name}
              </div>

              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-2 h-2 rounded-full border transition-all duration-300 hover:scale-150 focus:outline-none focus:ring-1 focus:ring-offset-1 ${
                  isActive ? "scale-125" : ""
                }`}
                style={{
                  borderColor: isActive ? colors.primary : colors.foreground,
                  backgroundColor: isActive ? colors.primary : "transparent",
                  boxShadow:
                    isActive && showAnimation
                      ? `0 0 12px ${colors.primary}60`
                      : "none",
                  animation:
                    isActive && showAnimation ? "pulseSmall 1.5s infinite" : "none",
                }}
                aria-label={`Navigate to ${section.name}`}
              />

              {isActive && showAnimation && (
                <div
                  className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-6 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 8px ${colors.primary}80`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Navigation Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex md:hidden max-w-[90vw]">
        <div
          className="flex gap-1.5 px-3 py-2 rounded-full backdrop-blur-sm border max-w-full"
          style={{ backgroundColor: `${colors.background}E6`, borderColor: colors.border }}
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`rounded-full border-2 transition-all duration-300 touch-manipulation flex-shrink-0 ${
                  isActive ? "w-6 h-2.5" : "w-2.5 h-2.5"
                }`}
                style={{
                  borderColor: isActive ? colors.primary : inactiveDotBorder,
                  backgroundColor: isActive ? colors.primary : "transparent",
                  boxShadow:
                    isActive && showAnimation ? `0 0 6px ${colors.primary}50` : "none",
                  minWidth: isActive ? "24px" : "10px",
                  minHeight: "10px",
                }}
                aria-label={`Navigate to ${section.name}`}
              />
            );
          })}
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      {showAnimation && (
        <div
          className="fixed right-1 top-1/4 w-0.5 h-1/2 z-30 hidden md:block"
          style={{
            background: `linear-gradient(to bottom, ${colors.primary}00, ${colors.primary}60, ${colors.primary}00)`,
          }}
        />
      )}
    </>
  );
}
