"use client";

import Image from "next/image";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../ThemeContext";

export default function Home() {
  // Now we DO need to use the theme hook to access colors
  const { colors } = useTheme();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Hero/About Section with Theme Colors */}
      <section 
        id="about" 
        className="py-20 border-t-4 transition-colors duration-200"
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
            <div 
              className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-4 transition-colors duration-200"
              style={{ 
                backgroundColor: colors.background === '#FFFFFF' ? '#E5E7EB' : '#374151',
                borderColor: colors.accent
              }}
            >
              <Image
                src="/me.jpg"
                alt="Profile photo"
                width={224}
                height={224}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* About text with theme support */}
            <div className="flex-1 mt-6 md:mt-0">
              <p 
                className="text-lg font-medium leading-relaxed mb-6"
                style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
              >
                <span style={{ color: colors.accent, fontWeight: 'bold' }}>Hello!</span> I'm a passionate software engineer with expertise in building modern web applications. My journey in tech began with a deep curiosity about how digital products are created and has evolved into a career focused on crafting elegant solutions to complex problems.
              </p>
              <p 
                className="text-lg font-medium leading-relaxed"
                style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
              >
                I specialize in <span className="font-bold">JavaScript</span> and <span className="font-bold">TypeScript</span> development, with particular focus on <span className="font-bold">React</span>, <span className="font-bold">Next.js</span>, and <span className="font-bold">Node.js</span>. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing what I've learned through technical writing and mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}