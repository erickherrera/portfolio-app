import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      {/* Header/Welcome Section */}
      <section id="home" className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={200}
              height={50}
              priority
            />
            <h1 className="mb-2 mt-10 text-3xl font-bold">
              Welcome to my portfolio.
            </h1>
            <h2 className="mb-2 text-lg">Here you will get to know more about my software engineering journey.</h2>
            
            <div className="flex space-x-4 mt-2">
              <a 
                href="https://github.com/erickherrera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero/About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-gray-700 text-2xl font-bold mb-4">About Me</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile image */}
            <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 shadow-md">
              <Image
                src="/me.jpg"
                alt="Profile photo"
                width={192}
                height={192}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            {/* About text */}
            <div className="flex-1">
              <p className="text-gray-700 leading-relaxed mb-4">
                Hello! I'm a passionate software engineer with expertise in building modern web applications. My journey in tech began with a deep curiosity about how digital products are created and has evolved into a career focused on crafting elegant solutions to complex problems.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I specialize in JavaScript and TypeScript development, with particular focus on React, Next.js, and Node.js. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing what I've learned through technical writing and mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2025 ErickHerreraCabrera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}