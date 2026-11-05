// Updated Homepage with Navigation Integration
"use client";

import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import ProjectsGrid from "../components/ProjectsSection";
import TechStackSection from "../components/techsection";
import ContactMe from "../components/contactmesection";
import TimelineSection from "../components/TimelineSection";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import CyberBackdrop from "../components/CyberBackdrop";
import { useState, useEffect, useRef, useMemo } from "react";

export default function Home() {
  const { colors, isCyber } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define the Project interface in your page file
  interface Project {
      id: number;
      title: string;
      description: string;
      year: number;
      image?: string;
      overview?: string;
      programmingLanguage?: string;
      frontend?: string;
      backend?: string;
      githubUrl?: string;
  }

  // Define interface for contact form data
  interface ContactFormData {
    name: string;
    email: string;
    message: string;
    subject?: string;
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "SaSS for HVAC",
      description: "SaSS application for an HVAC company to manage their business.",
      year: 2024,
      image: "/whitaker.png",
      overview: "This is an application currenlty being used by an HVAC company in Georgia",
      programmingLanguage: "Javascript",
      frontend: "React, Tailwind",
      backend: "MySQl, Express.JS, Node.JS",
    },
    {
      id: 2,
      title: "Personal Portfolio",
      description: "Personal portfolio using NextJS with modern design patterns",
      year: 2024,
      image: "/portfolio-screenshot-2.png",
      programmingLanguage: "TypeScript, Javascript",
      frontend: "React, NextJS, Tailwind",
      backend: "NextJS, Node.JS",
      githubUrl: "https://github.com/erickherrera/portfolio-app"
    },
    {
      id: 3,
      title: "Arduino Certification",
      description: "Completed the Arduino starter course. Passed the certification. Completed final project.",
      year: 2025,
      image: "/arduino.jpg",
      programmingLanguage: "C++",
    },

    {
      id: 4,
      title: "Crypto Wallet App",
      description: "Cryptocurrency and digital assets wallet for everyone.",
      year: 2025,
      image: "/criptogualet.png",
      programmingLanguage: "C++ with Clang Compiler",
      frontend: "QT, CMake",
      backend: "SQLite, SQLCipher",
      githubUrl: "https://github.com/erickherrera/CriptoGualet"
    },

    {
      id: 5,
      title: "CloudMG",
      description: "Cloud application for mobile phones that enables peer to peer mountain gear renting",
      year: 2026,
      image: "/cloudMG.png",
      programmingLanguage: "Typescript",
      frontend: "React Native, Tailwind",
      backend: "SupaBase, PostgreSQL",
      githubUrl: "https://github.com/erickherrera/CloudMG"
    },
    /*
    {
      id: 6,
      title: "API Documentation Tool",
      description: "Automated API documentation generator with live examples"
    },
  */
  ];

  const handleProjectClick = (project: Project) => {
    console.log(`Clicked on project: ${project.title}`);
    // Add navigation logic here, e.g.:
    // router.push(`/projects/${project.id}`);
  };

  // Handle contact form submission
  const handleContactSubmit = async (formData: ContactFormData) => {
    try {
      console.log('Contact form submitted:', formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Email sent successfully:', result);
      return result;

    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Re-throw so the form component can handle the error state
    }
  };

  // Navigation sections - memoized to prevent unnecessary re-renders
  const sections = useMemo(() => [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "timeline", name: "Journey" },
    { id: "tech", name: "Tech" },
    { id: "projects", name: "Projects" },
    { id: "contact", name: "Contact" }
  ], []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      // Show animation when manually navigating
      setShowAnimation(true);
      // Hide animation after 1 second
      animationTimeoutRef.current = setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
    }
  };

  // Scroll detection effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowAnimation(true);

          // Clear existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Hide animation 300ms after scrolling stops
          scrollTimeoutRef.current = setTimeout(() => {
            setShowAnimation(false);
          }, 300);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Set up intersection observer for section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup function
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
      // Clear timeout on unmount
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [sections]);

  // Shared styling for the section shells
  const sectionShell = {
    backgroundColor: colors.hero,
    borderColor: colors.accent,
    borderTopWidth: "2px",
    borderTopStyle: "solid" as const,
    boxShadow: isCyber ? `inset 0 1px 0 0 ${colors.glow}` : undefined,
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <CyberBackdrop />

      {/* Desktop Navigation Indicator */}
      <nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-5"
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div key={section.id} className="relative group">
              {/* Tooltip */}
              <div
                className={`absolute right-7 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 pointer-events-none border ${
                  showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                }`}
                style={{
                  backgroundColor: colors.card,
                  color: colors.foreground,
                  borderColor: colors.border,
                  boxShadow: colors.glow ? `0 6px 20px -8px ${colors.glow}` : undefined,
                }}
              >
                {section.name}
              </div>

              {/* Navigation Dot */}
              <button
                onClick={() => scrollToSection(section.id)}
                className="relative w-2.5 h-2.5 rounded-full border transition-transform duration-200 hover:scale-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  borderColor: isActive ? colors.primary : colors.borderStrong,
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  boxShadow: isActive ? `0 0 12px ${colors.glow}` : 'none',
                  outlineColor: colors.focus,
                }}
                aria-label={`Navigate to ${section.name}`}
                aria-current={isActive ? "true" : undefined}
              />

              {/* Active Section Line Indicator */}
              {isActive && showAnimation && (
                <div
                  className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-6 h-0.5 rounded-full"
                  style={{
                    backgroundColor: colors.primary,
                    boxShadow: `0 0 10px ${colors.glow}`
                  }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile Navigation Indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex md:hidden max-w-[90vw]">
        <div
          className="flex gap-2 px-3 py-2 rounded-full backdrop-blur-md border max-w-full"
          style={{
            backgroundColor: `${colors.background}E6`,
            borderColor: colors.border,
          }}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`rounded-full border-2 transition-all duration-200 touch-manipulation flex-shrink-0 ${
                  isActive ? 'w-7 h-2.5' : 'w-2.5 h-2.5'
                }`}
                style={{
                  borderColor: isActive ? colors.primary : colors.borderStrong,
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  boxShadow: isActive ? `0 0 8px ${colors.glow}` : 'none',
                  minWidth: isActive ? '28px' : '10px',
                  minHeight: '10px',
                }}
                aria-label={`Navigate to ${section.name}`}
                aria-current={isActive ? "true" : undefined}
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
            background: `linear-gradient(to bottom, ${colors.primary}00, ${colors.primary}80, ${colors.primary}00)`
          }}
        />
      )}

      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <HomeSection />
      <AboutSection />

      {/* Timeline Section */}
      <section
        id="timeline"
        className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-2 transition-colors duration-200 scroll-mt-20 w-full"
        style={sectionShell}
      >
        <div className="w-full overflow-hidden">
          <TimelineSection />
        </div>
      </section>

      {/* Tech Stack section */}
      <section
        id="tech"
        className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-2 transition-colors duration-200 scroll-mt-20 w-full"
        style={sectionShell}
      >
        <div className="w-full overflow-hidden">
          <TechStackSection
            colors={colors}
            showFeatures={true}
          />
        </div>
      </section>

      {/* My Projects Section */}
      <section
        id="projects"
        className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-2 transition-colors duration-200 scroll-mt-20 w-full"
        style={sectionShell}
      >
        <div className="w-full overflow-hidden">
          <ProjectsGrid
            projects={projects}
            title="My Projects"
            subtitle="Here are some of the projects I've worked on recently"
            colors={colors}
            onProjectClick={handleProjectClick}
            showHeader={true}
            className=""
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="pt-16 pb-20 md:pt-20 md:pb-20 border-t-2 transition-colors duration-200 scroll-mt-20 w-full"
        style={sectionShell}
      >
        <div className="w-full overflow-hidden">
          <ContactMe
            colors={colors}
            onSubmit={handleContactSubmit}
          />
        </div>
      </section>

      {/* Global layout rules */}
      <style jsx global>{`
        /* Prevent horizontal overflow */
        html, body {
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }

        * {
          box-sizing: border-box;
        }

        /* Ensure all containers respect viewport width */
        .container, .max-w-4xl, .max-w-5xl, .max-w-6xl, .max-w-7xl {
          max-width: 100vw !important;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        @media (min-width: 640px) {
          .container, .max-w-4xl, .max-w-5xl, .max-w-6xl, .max-w-7xl {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .container, .max-w-4xl, .max-w-5xl, .max-w-6xl, .max-w-7xl {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Text wrapping */
        p, h1, h2, h3, h4, h5, h6 {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }

        /* Image responsiveness */
        img {
          max-width: 100%;
          height: auto;
        }

        @keyframes pulseSmall {
          0% {
            box-shadow: 0 0 0 0 ${colors.primary}60;
          }
          50% {
            box-shadow: 0 0 0 8px ${colors.primary}20;
          }
          100% {
            box-shadow: 0 0 0 0 ${colors.primary}00;
          }
        }
      `}</style>
    </div>
  );
}
