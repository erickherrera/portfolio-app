// Updated Homepage with Navigation Integration
"use client";

import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import ProfileCard from "../components/ProfileCard";
import ProjectsGrid from "../components/ProjectsSection"; 
import TechStackSection from "../components/techsection";
import ContactMe from "../components/contactmesection";
import { useState, useEffect, useRef, useMemo } from "react";

export default function Home() {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Define the Project interface in your page file
  interface Project {
    id: number;
    title: string;
    description: string;
    image?: string;
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
      description: "SaSS application for an HVAC company to manage their business."
    },
    { 
      id: 2, 
      title: "Personal Portfolio", 
      description: "Personal portfolio using NextJS with modern design patterns",
      image: "/portfolio-screenshot-2.png"
    },
  /*{ 
      id: 3, 
      title: "E-commerce Platform", 
      description: "Full-stack e-commerce solution with React and Node.js" 
    },
    { 
      id: 4, 
      title: "Task Management App", 
      description: "Collaborative task management tool with real-time updates" 
    },
    { 
      id: 5, 
      title: "Weather Dashboard", 
      description: "Interactive weather dashboard with data visualization" 
    },
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

  // Add this helper function inside your Home component, before the return statement
  const createHoverHandlers = () => ({
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = colors.primary;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.backgroundColor = colors.secondary;
    }
  });

  // Navigation sections - memoized to prevent unnecessary re-renders
  const sections = useMemo(() => [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
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

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Desktop Navigation Indicator - Smaller Version */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.id} className="relative group">
            {/* Tooltip */}
            <div 
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 pointer-events-none ${
                showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
              style={{
                backgroundColor: colors.foreground,
                color: colors.background
              }}
            >
              {section.name}
            </div>
            
            {/* Navigation Dot - Smaller */}
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-2 rounded-full border transition-all duration-300 hover:scale-150 focus:outline-none focus:ring-1 focus:ring-offset-1 ${
                activeSection === section.id ? 'scale-125' : ''
              }`}
              style={{
                borderColor: activeSection === section.id ? colors.primary : colors.foreground,
                backgroundColor: activeSection === section.id ? colors.primary : 'transparent',
                boxShadow: activeSection === section.id && showAnimation ? `0 0 12px ${colors.primary}60` : 'none',
                animation: activeSection === section.id && showAnimation ? 'pulseSmall 1.5s infinite' : 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.outlineColor = colors.primary;
              }}
              aria-label={`Navigate to ${section.name}`}
            />
            
            {/* Active Section Line Indicator */}
            {activeSection === section.id && showAnimation && (
              <div 
                className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-6 h-0.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: colors.primary,
                  boxShadow: `0 0 8px ${colors.primary}80`
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navigation Indicator - Bottom of screen */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex md:hidden max-w-[90vw]">
        <div 
          className="flex gap-1.5 px-3 py-2 rounded-full backdrop-blur-sm border max-w-full"
          style={{
            backgroundColor: `${colors.background}E6`,
            borderColor: colors.foreground === '#171717' ? '#E5E7EB' : '#374151'
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`rounded-full border-2 transition-all duration-300 touch-manipulation flex-shrink-0 ${
                activeSection === section.id ? 'w-6 h-2.5' : 'w-2.5 h-2.5'
              }`}
              style={{
                borderColor: activeSection === section.id ? colors.primary : colors.foreground === '#171717' ? '#9CA3AF' : '#6B7280',
                backgroundColor: activeSection === section.id ? colors.primary : 'transparent',
                boxShadow: activeSection === section.id && showAnimation ? `0 0 6px ${colors.primary}50` : 'none',
                minWidth: activeSection === section.id ? '24px' : '10px',
                minHeight: '10px'
              }}
              aria-label={`Navigate to ${section.name}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      {showAnimation && (
        <div 
          className="fixed right-1 top-1/4 w-0.5 h-1/2 z-30 hidden md:block"
          style={{
            background: `linear-gradient(to bottom, ${colors.primary}00, ${colors.primary}60, ${colors.primary}00)`
          }}
        />
      )}

      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
      
      {/* Header/Welcome Section - Home Section */}
      <section 
        id="home" 
        className="pt-16 pb-16 md:pt-20 md:pb-20 transition-colors duration-200 w-full min-h-[60vh] flex items-center"
        style={{
          background: `linear-gradient(to bottom, ${colors.background}, ${colors.background})` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center w-full">
            <h1 
              className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words"
              style={{ color: colors.foreground }}
            >
              Welcome to my portfolio.
            </h1>
            <h2 
              className="mb-8 text-base sm:text-lg md:text-xl font-semibold px-2 break-words"
              style={{ color: colors.foreground}}
            >
              Learn more about my software engineering journey.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 w-full max-w-sm justify-center">
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
                href="https://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4/" 
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
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section 
        id="about" 
        className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-6 transition-colors duration-200 scroll-mt-20 w-full"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8 md:mb-12">
            <h2 
              className="text-2xl sm:text-3xl font-extrabold mb-4"
              style={{ color: colors.foreground }}
            >
              About Me
            </h2>
            <div className="w-20 h-2 mx-auto rounded-full mb-15" style={{ backgroundColor: colors.accent }}></div>
          </div>
          
          {/* Centered container for profile card and text */}
          <div className="flex justify-center w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 max-w-5xl w-full">
              {/* Profile Card */}
              <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                <ProfileCard/>
              </div>
              
              {/* About text with max width constraint */}
              <div className="w-full md:flex-1 md:max-w-2xl">
                <p 
                  className="text-base sm:text-lg font-medium leading-relaxed mb-4 md:mb-6 break-words"
                  style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
                >
                  <span style={{ color: colors.accent, fontWeight: 'bold' }}>Hello!</span> I&apos;m a passionate software engineer with expertise in building modern web applications. My journey in tech began with a deep curiosity about how modern applications are created and has evolved into a career focused on crafting elegant solutions to complex problems.
                </p>
                <p 
                  className="text-base sm:text-lg font-medium leading-relaxed break-words"
                  style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
                >
                  I specialize in <span className="font-bold">JavaScript</span> and <span className="font-bold">TypeScript</span> development, with particular focus on <span className="font-bold">React</span>, <span className="font-bold">Next.js</span>, and <span className="font-bold">Node.js</span>. When I&apos;m not coding, you can find me exploring the outdoors, learning and teaching new technologies, or attending tech meetups in town.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack section */}
      <section 
        id="tech"
        className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-6 transition-colors duration-200 scroll-mt-20 w-full"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
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
        className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-6 transition-colors duration-200 scroll-mt-20 w-full"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
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
        className="pt-16 pb-20 md:pt-20 md:pb-20 border-t-6 transition-colors duration-200 scroll-mt-20 w-full"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        <div className="w-full overflow-hidden">
          <ContactMe 
            colors={colors}
            onSubmit={handleContactSubmit}
          />
        </div>
      </section>
      {/* Add pulse animation to global styles */}
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
        .container, .max-w-4xl, .max-w-6xl {
          max-width: 100vw !important;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        @media (min-width: 640px) {
          .container, .max-w-4xl, .max-w-6xl {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .container, .max-w-4xl, .max-w-6xl {
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