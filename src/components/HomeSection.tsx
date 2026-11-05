"use client";

import { useTheme } from "../app/ThemeContext";

export default function HomeSection() {
  const { colors } = useTheme();

  const primaryCta = {
    backgroundColor: colors.primary,
    color: colors.onPrimary,
    boxShadow: `0 10px 24px -12px ${colors.glow}`,
  };

  const secondaryCta = {
    backgroundColor: colors.secondary,
    color: colors.onSecondary,
    boxShadow: `inset 0 0 0 1px ${colors.borderStrong}`,
  };

  return (
    <section
      id="home"
      className="pt-28 pb-20 md:pt-36 md:pb-28 transition-colors duration-200 w-full min-h-[70vh] flex items-center relative"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center w-full">
          <h1
            className="cyber-display mb-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words"
            style={{
              color: colors.foreground,
              textShadow: `0 0 28px ${colors.glow}`,
            }}
          >
            Welcome to my portfolio.
          </h1>

          <p
            className="mb-10 text-base sm:text-lg md:text-xl max-w-2xl break-words"
            style={{ color: colors.muted }}
          >
            Learn more about my software engineering path.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full max-w-md justify-center">
            <a
              href="https://github.com/erickherrera"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-center w-full sm:w-auto clip-corner-sm"
              style={primaryCta}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="http://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-center w-full sm:w-auto clip-corner-sm"
              style={secondaryCta}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-5 py-3 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-center w-full sm:w-auto clip-corner-sm"
              style={{
                backgroundColor: "transparent",
                color: colors.foreground,
                border: `1px solid ${colors.borderStrong}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.borderStrong;
                e.currentTarget.style.color = colors.foreground;
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-label="Contact Me"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
