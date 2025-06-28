// Updated Homepage with Navigation Integration
"use client";

import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../ThemeContext";
import ProfileCard from "./components/ProfileCard";
import ProjectsGrid from "./components/ProjectsSection"; 
import TechStackSection from "./components/techsection";
import ContactMe from "./components/contactmesection";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Define the Project interface in your page file
  interface Project {
    id: number;
    title: string;
    description: string;
    image?: string;
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
      description: "Personal portfolio using NextJS with modern design patterns" 
    },
    { 
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
  ];

  const handleProjectClick = (project: Project) => {
    console.log(`Clicked on project: ${project.title}`);
    // Add navigation logic here, e.g.:
    // router.push(`/projects/${project.id}`);
  };

  // Handle contact form submission
  const handleContactSubmit = async (formData: any) => {
    // Here you would typically send the form data to your email service
    console.log('Contact form submitted:', formData);
    
    // Log the form data so you can see what's being submitted
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Company:', formData.company);
    console.log('Message:', formData.message);
    
    // TODO: Replace this with actual email sending logic
    // Options:
    // 1. EmailJS - Client-side email service
    // 2. Create Next.js API route with Nodemailer
    // 3. Use Formspree or similar form services
    // 4. Send to your backend API
    
    // Example of what you might do later:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   });
    //   
    //   if (!response.ok) throw new Error('Failed to send email');
    //   return await response.json();
    // } catch (error) {
    //   console.error('Error sending email:', error);
    //   throw error;
    // }
    
    // For now, just simulate a successful submission
    // This makes the form show "success" after 1 second
    return new Promise((resolve) => setTimeout(resolve, 1000));
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

  // Navigation sections
  const sections = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "tech", name: "Tech" },
    { id: "projects", name: "Projects" },
    { id: "contact", name: "Contact" }
  ];

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
          // Clear any existing timeout
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }
          // Show animation when section changes
          setShowAnimation(true);
          // Hide animation after 1 second
          animationTimeoutRef.current = setTimeout(() => {
            setShowAnimation(false);
          }, 1000);
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
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navigation Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.id} className="relative group">
            {/* Tooltip */}
            <div 
              className="absolute right-8 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
              style={{
                backgroundColor: colors.foreground === '#171717' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                color: colors.foreground === '#171717' ? '#FFFFFF' : '#000000'
              }}
            >
              {section.name}
            </div>
            
            {/* Navigation Dot */}
            <button
              onClick={() => scrollToSection(section.id)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                activeSection === section.id ? 'scale-110' : ''
              }`}
              style={{
                borderColor: activeSection === section.id ? colors.primary : colors.foreground === '#171717' ? '#D1D5DB' : '#4B5563',
                backgroundColor: activeSection === section.id ? colors.primary : 'transparent',
                boxShadow: activeSection === section.id ? `0 0 20px ${colors.primary}40` : 'none',
                animation: activeSection === section.id ? 'pulse 2s infinite' : 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.outlineColor = colors.primary;
              }}
              aria-label={`Navigate to ${section.name}`}
            />
          </div>
        ))}
      </div>

      {/* Mobile Navigation Indicator - Bottom of screen */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 flex md:hidden gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id ? 'scale-110 w-8' : ''
            }`}
            style={{
              borderColor: activeSection === section.id ? colors.primary : colors.foreground === '#171717' ? '#D1D5DB' : '#4B5563',
              backgroundColor: activeSection === section.id ? colors.primary : 'transparent',
              boxShadow: activeSection === section.id && showAnimation ? `0 0 15px ${colors.primary}40` : 'none'
            }}
            aria-label={`Navigate to ${section.name}`}
          />
        ))}
      </div>

      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>
      
      {/* Header/Welcome Section - Home Section */}
      <section 
        id="home" 
        className="pt-24 pb-16 md:pt-32 md:pb-24 transition-colors duration-200"
        style={{
          background: `linear-gradient(to bottom, ${colors.background}, ${colors.background})` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 
              className="mb-4 text-4xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: colors.foreground }}
            >
              Welcome to my portfolio.
            </h1>
            <h2 
              className="mb-6 text-lg sm:text-xl font-semibold"
              style={{ color: colors.foreground === '#171717' ? '#4B5563' : '#D1D5DB' }}
            >
              Here you will get to know more about my software engineering journey.
            </h2>
            
            <div className="flex space-x-6 mt-4">
              <a 
                href="https://github.com/erickherrera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 font-bold rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                className="px-4 py-2 font-bold rounded-md transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
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
        className="pt-20 pb-20 border-t-6 transition-colors duration-200 scroll-mt-20"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-extrabold mb-4"
              style={{ color: colors.foreground }}
            >
              About Me
            </h2>
            <div className="w-20 h-2 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Profile image with theme styling */}
            
              <ProfileCard/>
            
            {/* About text with theme support */}
            <div className="flex-1 mt-6 md:mt-0">
              <p 
                className="text-lg font-medium leading-relaxed mb-6"
                style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
              >
                <span style={{ color: colors.accent, fontWeight: 'bold' }}>Hello!</span> I&apos;m a passionate software engineer with expertise in building modern web applications. My journey in tech began with a deep curiosity about how digital products are created and has evolved into a career focused on crafting elegant solutions to complex problems.
              </p>
              <p 
                className="text-lg font-medium leading-relaxed"
                style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
              >
                I specialize in <span className="font-bold">JavaScript</span> and <span className="font-bold">TypeScript</span> development, with particular focus on <span className="font-bold">React</span>, <span className="font-bold">Next.js</span>, and <span className="font-bold">Node.js</span>. When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing what I&apos;ve learned through technical writing and mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack section */}
      <section 
        id="tech"
        className="pt-20 pb-20 border-t-6 transition-colors duration-200 scroll-mt-20"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        <TechStackSection 
          colors={colors}
          showFeatures={true}
        />
      </section>

      {/* My Projects Section */}
      <section 
        id="projects" 
        className="pt-20 pb-20 border-t-6 transition-colors duration-200 scroll-mt-20"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        <ProjectsGrid 
          projects={projects}
          title="My Projects"
          subtitle="Here are some of the projects I've worked on recently"
          colors={colors}
          onProjectClick={handleProjectClick}
          showHeader={true}
          className=""
        />
      </section>
      <section 
        id="contact" 
        className="pt-20 pb-20 border-t-6 transition-colors duration-200 scroll-mt-20"
        style={{
          backgroundColor: colors.hero,
          borderColor: colors.accent
        }}
      >
        <ContactMe 
          colors={colors}
          onSubmit={handleContactSubmit}
        />
      </section>
      {/* Add pulse animation to global styles */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 ${colors.primary}40;
          }
          50% {
            box-shadow: 0 0 0 15px ${colors.primary}20;
          }
          100% {
            box-shadow: 0 0 0 0 ${colors.primary}00;
          }
        }
      `}</style>
    </div>
  );
}