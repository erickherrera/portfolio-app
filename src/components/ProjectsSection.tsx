import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  image?: string; // Optional image URL
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
  const handleProjectClick = (project: Project) => {
    if (onProjectClick) {
      onProjectClick(project);
    } else {
      console.log(`Project ${project.id} clicked`);
    }
  };

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
              style={{ 
                color: colors?.foreground === '#171717' ? '#374151' : '#D1D5DB' 
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Grid structure for project cards */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: colors?.background || '#FFFFFF' }}
              onClick={() => handleProjectClick(project)}
            >
              {/* Project image or placeholder */}
              <div 
                className="h-48 flex items-center justify-center transition-colors duration-200"
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
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span 
                    className="transition-colors duration-200"
                    style={{ 
                      color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                    }}
                  >
                    Project Image
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-2 transition-colors duration-200"
                  style={{ color: colors?.foreground || '#1F2937' }}
                >
                  {project.title}
                </h3>
                <p 
                  className="transition-colors duration-200"
                  style={{ 
                    color: colors?.foreground === '#171717' ? '#6B7280' : '#9CA3AF' 
                  }}
                >
                  {project.description}
                </p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span 
                    className="font-medium transition duration-300"
                    style={{ color: colors?.accent || '#2563EB' }}
                  >
                    Learn more
                  </span>
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center transition duration-300 hover:text-white"
                    style={{
                      backgroundColor: colors?.accent ? `${colors.accent}20` : '#DBEAFE',
                      color: colors?.accent || '#2563EB'
                    }}
                    onMouseEnter={(e) => {
                      if (colors?.accent) {
                        e.currentTarget.style.backgroundColor = colors.accent;
                        e.currentTarget.style.color = 'white';
                      } else {
                        e.currentTarget.style.backgroundColor = '#2563EB';
                        e.currentTarget.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (colors?.accent) {
                        e.currentTarget.style.backgroundColor = `${colors.accent}20`;
                        e.currentTarget.style.color = colors.accent;
                      } else {
                        e.currentTarget.style.backgroundColor = '#DBEAFE';
                        e.currentTarget.style.color = '#2563EB';
                      }
                    }}
                  >
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}