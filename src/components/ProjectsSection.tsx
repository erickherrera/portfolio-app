import Image from "next/image";
import { useState } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string; // Optional image URL
  overview?: string;
  programmingLanguage?: string;
  frontend?: string;
  backend?: string;
  githubUrl?: string;
}

interface ThemeColors {
  background: string;
  foreground: string;
  hero: string;
  primary: string;
  secondary: string;
  accent: string;
}

interface ProjectsGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  onProjectClick?: (project: Project) => void;
  className?: string;
  showHeader?: boolean;
  colors?: ThemeColors; // Theme colors for styling
}

export default function ProjectsGrid({
  projects,
  title = "Personal Projects",
  subtitle = "A collection of my latest work and ongoing projects.",
  onProjectClick,
  className = "",
  showHeader = true,
  colors
}: ProjectsGridProps) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleProjectClick = (project: Project) => {
    // Toggle flip state
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(project.id)) {
        newSet.delete(project.id);
      } else {
        newSet.add(project.id);
      }
      return newSet;
    });

    // Call the original onClick handler if provided
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  const isFlipped = (projectId: number) => flippedCards.has(projectId);

  return (
    <div className={className}>
      {/* Conditional header - Now matches your homepage section style */}
      {showHeader && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="text-center">
            <h2 
              className="text-3xl font-extrabold mb-4"
              style={{ color: colors?.foreground || '#1F2937' }}
            >
              {title}
            </h2>
            <div 
              className="w-20 h-2 mx-auto rounded-full mb-6" 
              style={{ backgroundColor: colors?.accent || '#2563EB' }}
            ></div>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: colors?.foreground}}
            >
              {subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Grid structure for project cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-full max-w-sm h-96 md:h-80 cursor-pointer"
              onClick={() => handleProjectClick(project)}
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-gpu ${
                  isFlipped(project.id) ? 'rotate-y-180' : ''
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isFlipped(project.id) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute w-full h-full rounded-lg shadow-md overflow-hidden backface-hidden hover:shadow-xl transition-shadow duration-300"
                  style={{ 
                    backgroundColor: colors?.background || '#FFFFFF',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Project image or placeholder */}
                  <div 
                    className="h-48 flex items-center justify-center transition-colors duration-200 overflow-hidden rounded-t-lg"
                    style={{ 
                      backgroundColor: colors?.background === '#FFFFFF' ? '#E5E7EB' : '#374151'
                    }}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover object-center rounded-t-lg"
                      />
                    ) : (
                      <span 
                        className="transition-colors duration-200"
                        style={{ 
                          color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                        }}
                      >
                        Project Image Coming Soon
                      </span>
                    )}
                  </div>
                  
                   <div className="p-9">
                     <div className="flex items-center justify-between mb-2">
                       <h3
                         className="text-xl font-semibold transition-colors duration-200"
                         style={{ color: colors?.foreground || '#1F2937' }}
                       >
                         {project.title}
                       </h3>
                       {project.githubUrl && (
                         <a
                           href={project.githubUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-8 h-8 rounded-full flex items-center justify-center transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                           style={{
                             backgroundColor: colors?.accent ? `${colors.accent}20` : '#DBEAFE',
                             color: colors?.accent || '#2563EB'
                           }}
                           onClick={(e) => e.stopPropagation()}
                           aria-label={`View ${project.title} on GitHub`}
                         >
                           <svg
                             width="16"
                             height="16"
                             viewBox="0 0 24 24"
                             fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg"
                           >
                             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                           </svg>
                         </a>
                       )}
                     </div>
                    <p 
                      className="transition-colors duration-200 text-sm"
                      style={{ 
                        color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                      }}
                    >
                      {project.description}
                    </p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span 
                        className="font-medium transition duration-300 text-sm"
                        style={{ color: colors?.accent || '#2563EB' }}
                      >
                        Click to see more details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full rounded-lg shadow-md overflow-hidden p-6 hover:shadow-xl transition-shadow duration-300"
                  style={{ 
                    backgroundColor: colors?.background || '#FFFFFF',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h3 
                        className="text-lg font-semibold"
                        style={{ color: colors?.foreground || '#1F2937' }}
                      >
                        {project.title}
                      </h3>
                      <button
                        className="w-8 h-8 rounded-full flex items-center justify-center transition duration-300"
                        style={{
                          backgroundColor: colors?.accent ? `${colors.accent}20` : '#DBEAFE',
                          color: colors?.accent || '#2563EB'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                      >
                        ←
                      </button>
                    </div>

                    <div className="flex-1 space-y-4 text-sm">
                      {project.overview && (
                        <div>
                          <h4 
                            className="font-semibold mb-1"
                            style={{ color: colors?.foreground || '#1F2937' }}
                          >
                            Project Overview:
                          </h4>
                          <p 
                            style={{ 
                              color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                            }}
                          >
                            {project.overview}
                          </p>
                        </div>
                      )}

                      {project.programmingLanguage && (
                        <div>
                          <h4 
                            className="font-semibold mb-1"
                            style={{ color: colors?.foreground || '#1F2937' }}
                          >
                            Programming Language:
                          </h4>
                          <p 
                            style={{ 
                              color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                            }}
                          >
                            {project.programmingLanguage}
                          </p>
                        </div>
                      )}

                      {project.frontend && (
                        <div>
                          <h4 
                            className="font-semibold mb-1"
                            style={{ color: colors?.foreground || '#1F2937' }}
                          >
                            Frontend:
                          </h4>
                          <p 
                            style={{ 
                              color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                            }}
                          >
                            {project.frontend}
                          </p>
                        </div>
                      )}
                      {project.backend && (
                        <div>
                          <h4 
                            className="font-semibold mb-1"
                            style={{ color: colors?.foreground || '#1F2937' }}
                          >
                            Backend:
                          </h4>
                          <p 
                            style={{ 
                              color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                            }}
                          >
                            {project.backend}
                          </p>
                        </div>
                      )}

                      {!project.overview && !project.programmingLanguage && !project.frontend && !project.backend && (
                        <div className="flex items-center justify-center h-full">
                          <p 
                            className="text-center italic"
                            style={{ 
                              color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                            }}
                          >
                            No additional details available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}