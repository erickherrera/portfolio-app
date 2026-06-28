"use client";

import { useTheme } from "../app/ThemeContext";

export default function HomeSection() {
  const { colors } = useTheme();

  const createHoverHandlers = () => ({
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = colors.primary;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = colors.secondary;
    }
  });

  return (
    <section
      id="home"
      className="pt-16 pb-16 md:pt-20 md:pb-20 transition-colors duration-200 w-full min-h-[60vh] flex items-center"
      style={{
        background: `linear-gradient(to bottom, ${colors.background}, ${colors.background})`
      }}
    >
      <div className="max-w-4xl mx-auto my-25 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center w-full">
          <h1
            className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words"
            style={{ color: colors.foreground }}
          >
            Welcome to my portfolio.
          </h1>
          <h2
            className="mb-8 text-base sm:text-lg md:text-xl font-semibold px-2 break-words"
            style={{ color: colors.foreground }}
          >
            Learn more about my software engineering path.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 w-full max-w-md justify-center">
            <a
              href="https://github.com/erickherrera"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-bold rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-center w-full sm:w-auto"
              style={{
                backgroundColor: colors.secondary,
                color: 'white',
              }}
              {...createHoverHandlers()}
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="http://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-bold rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-center w-full sm:w-auto"
              style={{
                backgroundColor: colors.secondary,
                color: 'white'
              }}
              {...createHoverHandlers()}
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "auto" });
                }
              }}
              className="px-4 py-2 font-bold rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-center w-full sm:w-auto"
              style={{
                backgroundColor: colors.secondary,
                color: 'white'
              }}
              {...createHoverHandlers()}
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
