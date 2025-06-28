// TechStackSection.tsx
import React from 'react';
import { IconType } from 'react-icons';
// Frontend icons
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { FaMobileAlt } from 'react-icons/fa';
// Backend icons
import { SiNodedotjs, SiExpress, SiPython } from 'react-icons/si';
// Database icons
import { SiMysql, SiMongodb, SiSqlite } from 'react-icons/si';
// DevOps icons
import { SiDocker } from 'react-icons/si';
import { COLORS } from '@components/app/ThemeContext';

interface Tech {
  name: string;
  category: string;
  icon?: string | IconType;
}

interface TechStackSectionProps {
  title?: string;
  subtitle?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    hero: string;
  };
  techStack?: Tech[];
  showFeatures?: boolean;
  className?: string;
}

const defaultTechStack: Tech[] = [
  // Frontend
  { name: "JavaScript", category: "Frontend", icon: SiJavascript },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript },
  { name: "React", category: "Frontend", icon: SiReact },
  { name: "React Native", category: "Frontend", icon: FaMobileAlt },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss },
  // Backend
  { name: "Node.js", category: "Backend", icon: SiNodedotjs },
  { name: "Express.js", category: "Backend", icon: SiExpress },
  { name: "Python", category: "Backend", icon: SiPython },
  // Database
  { name: "MySQL", category: "Database", icon: SiMysql },
  { name: "MongoDB", category: "Database", icon: SiMongodb },
  { name: "SQLite", category: "Database", icon: SiSqlite },
  // DevOps & Tools
  { name: "Docker", category: "DevOps & Tools", icon: SiDocker },
];

const TechStackSection: React.FC<TechStackSectionProps> = ({
  title = "Tech Stack",
  subtitle = "Technologies I work with to build amazing digital experiences",
  colors,
  techStack = defaultTechStack,
  showFeatures = true,
  className = ""
}) => {
  // Group tech by category
  const techByCategory = techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Tech[]>);

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 
          className="text-3xl font-extrabold mb-4"
          style={{ color: colors.foreground }}
        >
          {title}
        </h2>
        <div className="w-20 h-2 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
        <p 
          className="mt-6 text-lg"
          style={{ color: colors.primary}}
        >
          {subtitle}
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(techByCategory).map(([category, techs]) => (
          <div key={category} className="space-y-4">
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colors.foreground }}
            >
              {category}
            </h3>
            <div className="space-y-3">
              {techs.map((tech) => (
                <div
                  key={tech.name}
                  className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer tech-card-hover"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.primary}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 0 20px ${colors.primary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.foreground === '#171717' ? '#E5E7EB' : '#374151';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="flex items-center space-x-3">
                    {typeof tech.icon === 'string' ? (
                      <span className="text-2xl">{tech.icon}</span>
                    ) : (
                      tech.icon && React.createElement(tech.icon as IconType, {
                        className: "text-2xl",
                        style: { color: colors.secondary }
                      })
                    )}
                    <span 
                      className="font-medium"
                      style={{ color: colors.foreground }}
                    >
                      {tech.name}
                    </span>
                  </div>
                  
                  {/* Animated background gradient on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Tech Stack Features */}
      {showFeatures && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.foreground === '#171717' ? '#F3F4F6' : '#1F2937',
              border: `2px solid ${colors.accent}`
            }}
          >
            <div 
              className="text-3xl mb-3"
              style={{ color: colors.primary }}
            >
              🚀
            </div>
            <h4 
              className="font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              Full-Stack Development
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
            >
              End-to-end application development from database to deployment
            </p>
          </div>

          <div 
            className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.foreground === '#171717' ? '#F3F4F6' : '#1F2937',
              border: `2px solid ${colors.accent}`
            }}
          >
            <div 
              className="text-3xl mb-3"
              style={{ color: colors.primary }}
            >
              💡
            </div>
            <h4 
              className="font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              Modern Frameworks
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
            >
              Leveraging cutting-edge tools for optimal performance
            </p>
          </div>

          <div 
            className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.foreground === '#171717' ? '#F3F4F6' : '#1F2937',
              border: `2px solid ${colors.accent}`
            }}
          >
            <div 
              className="text-3xl mb-3"
              style={{ color: colors.primary }}
            >
              📈
            </div>
            <h4 
              className="font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              Scalable Solutions
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
            >
              Building applications that grow with your business needs
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .tech-card-hover:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TechStackSection;