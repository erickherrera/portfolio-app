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
  title = "My Projects",
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
                    <h3 
                      className="text-xl font-semibold mb-2 transition-colors duration-200"
                      style={{ color: colors?.foreground || '#1F2937' }}
                    >
                      {project.title}
                    </h3>
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