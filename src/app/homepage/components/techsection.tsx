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

interface Tech {
  name: string;
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
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  //{ name: "React Native", icon: FaMobileAlt },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Python", icon: SiPython },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "SQLite", icon: SiSqlite },
  { name: "Docker", icon: SiDocker },
];

const TechStackSection: React.FC<TechStackSectionProps> = ({
  title = "Tech Stack",
  subtitle = "Technologies I work with to build amazing digital experiences. ",
  colors,
  techStack = defaultTechStack,
  showFeatures = true,
  className = ""
}) => {
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
          style={{ color: colors.foreground}}
        >
          {subtitle}
        </p>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mb-16">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className="group relative flex flex-col items-center"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Achievement Badge */}
            <div 
              className="achievement-badge relative w-20 h-20 rounded-full flex items-center justify-center mb-3 cursor-pointer transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.background}15 100%)`,
                border: `3px solid ${colors.accent}`,
                boxShadow: `0 0 20px ${colors.accent}40, inset 0 0 20px ${colors.accent}20`
              }}
            >
              {/* Glowing ring effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                style={{
                  background: `conic-gradient(from 0deg, ${colors.accent}, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  padding: '2px'
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: colors.background }}
                />
              </div>
              
              {/* Icon */}
              <div className="relative z-8 floating-icon spinning-icon">
                {typeof tech.icon === 'string' ? (
                  <span className="text-3xl">{tech.icon}</span>
                ) : (
                  tech.icon && React.createElement(tech.icon as IconType, {
                    className: "text-3xl spinning-icon",
                    style: { color: colors.secondary }
                  })
                )}
              </div>
            </div>
            
            {/* Achievement Label */}
            <div 
              className="text-center achievement-label"
              style={{
                background: `linear-gradient(135deg, ${colors.background}90 0%, ${colors.hero}90 100%)`,
                borderRadius: '8px',
                padding: '4px 8px',
                border: `1px solid ${colors.accent}50`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <span 
                className="text-sm font-bold"
                style={{ color: colors.foreground }}
              >
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Features Section */}
      {showFeatures && (
        <div className="mt-16 mx-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105 achievement-feature"
            style={{
              background: `linear-gradient(135deg, ${colors.hero} 0%, ${colors.background} 100%)`,
              border: `2px solid ${colors.accent}`,
              boxShadow: `0 0 15px ${colors.accent}30`
            }}
          >
            <div 
              className="text-4xl mb-3"
              style={{ color: colors.primary }}
            >
              🏆
            </div>
            <h4 
              className="font-bold mb-2 text-lg"
              style={{ color: colors.foreground }}
            >
              Fullstack Developer
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
            >
              Full-stack achievement unlocked
            </p>
          </div>

          <div 
            className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105 achievement-feature"
            style={{
              background: `linear-gradient(135deg, ${colors.hero} 0%, ${colors.background} 100%)`,
              border: `2px solid ${colors.accent}`,
              boxShadow: `0 0 15px ${colors.accent}30`
            }}
          >
            <div 
              className="text-4xl mb-3"
              style={{ color: colors.primary }}
            >
              ⚡
            </div>
            <h4 
              className="font-bold mb-2 text-lg"
              style={{ color: colors.foreground }}
            >
              Speed Runner
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
            >
              Rapid development with modern frameworks
            </p>
          </div>

          <div 
            className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105 achievement-feature"
            style={{
              background: `linear-gradient(135deg, ${colors.hero} 0%, ${colors.background} 100%)`,
              border: `2px solid ${colors.accent}`,
              boxShadow: `0 0 15px ${colors.accent}30`
            }}
          >
            <div 
              className="text-4xl mb-3 "
              style={{ color: colors.primary }}
            >
              🚀
            </div>
            <h4 
              className="font-bold mb-2 text-lg"
              style={{ color: colors.foreground }}
            >
              Scale Engineering
            </h4>
            <p 
              className="text-sm"
              style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
            >
              Building applications that scale infinitely
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Floating animation for achievement badges */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        /* Spinning animation for icons */
        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
        
        /* Pulse glow animation */
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px var(--accent-color, #51273c)40, inset 0 0 20px var(--accent-color, #51273c)20;
          }
          50% {
            box-shadow: 0 0 30px var(--accent-color, #51273c)60, inset 0 0 30px var(--accent-color, #51273c)30;
          }
        }
        
        /* Icon spinning on hover only */
        .spinning-icon {
          transition: transform 0.3s ease;
        }
        
        .achievement-badge:hover .spinning-icon {
          animation: spin 1s linear infinite;
        }
        
        /* Floating icon */
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Achievement badge hover effect */
        .achievement-badge:hover {
          animation: pulseGlow 2s ease-in-out infinite;
          transform: scale(1.1);
        }
        
        /* Achievement label animation */
        .achievement-label {
          opacity: 0.9;
          transition: all 0.3s ease;
        }
        
        /* Feature cards enhancement */
        .achievement-feature:hover {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
          .achievement-badge {
            width: 60px;
            height: 60px;
          }
          
          .achievement-badge .text-3xl {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TechStackSection;