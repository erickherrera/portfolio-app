"use client";

import Image from "next/image";
import ThemeToggle from "../../components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow min-h-screen relative">
      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Header/Welcome Section with Dark Mode Support */}
      <section id="home" className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 mt-10 text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              Welcome to my portfolio.
            </h1>
            <h2 className="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
              Here you will get to know more about my software engineering journey.
            </h2>
            
            <div className="flex space-x-6 mt-4">
              <a 
                href="https://github.com/erickherrera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors shadow-md dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-900 transition-colors shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero/About Section with Dark Mode Support */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800 border-t-4 border-blue-600 dark:border-blue-400 transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-gray-800 dark:text-white text-3xl font-extrabold mb-4">About Me</h2>
            <div className="w-20 h-2 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile image with enhanced styling */}
            <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 shadow-lg border-4 border-blue-600 dark:border-blue-400">
              <Image
                src="/me.jpg"
                alt="Profile photo"
                width={224}
                height={224}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* About text with dark mode support */}
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed mb-6">
                <span className="text-blue-600 dark:text-blue-400 font-bold">Hello!</span> I'm a passionate software engineer with expertise in building modern web applications. My journey in tech began with a deep curiosity about how digital products are created and has evolved into a career focused on crafting elegant solutions to complex problems.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed">
                I specialize in <span className="font-bold">JavaScript</span> and <span className="font-bold">TypeScript</span> development, with particular focus on <span className="font-bold">React</span>, <span className="font-bold">Next.js</span>, and <span className="font-bold">Node.js</span>. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing what I've learned through technical writing and mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-auto border-t-4 border-blue-600 dark:border-blue-400 transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-semibold">© 2025 ErickHerreraCabrera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}