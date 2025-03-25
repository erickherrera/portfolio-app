"use client"

import Image from "next/image";

export default function ProjectPage() {
  // Sample project data - replace with your actual projects
  const projects = [
    { id: 1, title: "SaSS for HVAC", description: "SaSS application for an HVAC company to manage their business." },
    { id: 2, title: "Personal Portfolio", description: "Personal portfolio using NextJS" },
    { id: 3, title: "Project Three", description: "Description for project three" },
    { id: 4, title: "Project Four", description: "Description for project four" },
    { id: 5, title: "Project Five", description: "Description for project five" },
    { id: 6, title: "Project Six", description: "Description for project six" },
  ];

  const handleProjectClick = (id: number) => {
    // You can add navigation or modal functionality here
    console.log(`Project ${id} clicked`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Large styled header with readable background */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-green-600 py-16 mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            My Projects
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mt-6"></div>
          <p className="text-white text-center mt-4 text-lg max-w-2xl mx-auto">
            A collection of my latest work and ongoing projects.
          </p>
        </div>
      </header>

      {/* Grid structure for project cards */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Placeholder for project image */}
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Project Image</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600">{project.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-medium transition duration-300 group-hover:text-blue-800">
                    Learn more
                  </span>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white">
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}