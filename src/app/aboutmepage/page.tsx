"use client";

import Image from "next/image";
import ThemeToggle from "../ThemeToggle";

export default function AboutMe() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Theme Toggle - Positioned fixed on screen */}
      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Hero/About Section with Theme Colors */}
      <section 
        id="about" 
        className="py-20 bg-hero border-t-4 border-accent transition-colors duration-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4 text-foreground">
              About Me
            </h2>
            <div className="w-20 h-2 mx-auto rounded-full bg-accent"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Profile image with theme styling */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-4 border-accent bg-hero/80 transition-colors duration-200">
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
              <p className="text-lg font-medium leading-relaxed mb-6 text-text">
                <span className="text-accent font-bold">Hello!</span> I'm a passionate software engineer with expertise in building modern web applications. My journey in tech began with a deep curiosity about how digital products are created and has evolved into a career focused on crafting elegant solutions to complex problems.
              </p>
              <p className="text-lg font-medium leading-relaxed text-text">
                I specialize in <span className="font-bold">JavaScript</span> and <span className="font-bold">TypeScript</span> development, with particular focus on <span className="font-bold">React</span>, <span className="font-bold">Next.js</span>, and <span className="font-bold">Node.js</span>. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing what I've learned through technical writing and mentorship.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Skills & Technologies</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Skill Pills */}
              {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'MongoDB'].map((skill, index) => (
                <div key={index} className="bg-background/80 border border-purple-500 dark:border-purple-400 rounded-full px-4 py-2 text-center text-text hover:bg-purple-400 dark:hover:bg-purple-900/20 transition-colors duration-200">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-foreground text-center">Experience</h3>
            
            <div className="space-y-8">
              {/* Experience Item 1 */}
              <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6 relative">
                <div className="absolute w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full -left-[10px] top-1"></div>
                <h4 className="text-xl font-bold text-foreground">Senior Software Engineer</h4>
                <p className="text-accent mb-2">Tech Company Inc. | 2022 - Present</p>
                <p className="text-text">Led the development of a next-generation web application using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.</p>
              </div>
              
              {/* Experience Item 2 */}
              <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6 relative">
                <div className="absolute w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full -left-[10px] top-1"></div>
                <h4 className="text-xl font-bold text-foreground">Software Developer</h4>
                <p className="text-accent mb-2">Digital Solutions Ltd. | 2019 - 2022</p>
                <p className="text-text">Developed and maintained multiple client-facing web applications. Collaborated with UX designers to implement responsive interfaces.</p>
              </div>
              
              {/* Experience Item 3 */}
              <div className="border-l-4 border-purple-500 dark:border-purple-400 pl-6 relative">
                <div className="absolute w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full -left-[10px] top-1"></div>
                <h4 className="text-xl font-bold text-foreground">Junior Developer</h4>
                <p className="text-accent mb-2">Startup Hub | 2018 - 2019</p>
                <p className="text-text">Built features for an e-commerce platform. Participated in agile development cycles and code reviews.</p>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Education</h3>
            
            <div className="bg-background/80 rounded-lg p-6 shadow-md border border-accent/20">
              <h4 className="text-xl font-bold text-foreground">Bachelor of Science in Computer Science</h4>
              <p className="text-accent mb-2">University of Technology | 2014 - 2018</p>
              <p className="text-text">Graduated with honors. Specialized in web development and software engineering.</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Let's Connect!</h3>
            <p className="text-text mb-6">Interested in working together or just want to say hi?</p>
            <div className="flex justify-center space-x-4">
              <a href="mailto:contact@example.com" className="btn btn-primary px-6 py-3 rounded-md">
                Email Me
              </a>
              <a href="/resume.pdf" download className="btn btn-outline px-6 py-3 rounded-md">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}