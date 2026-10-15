"use client";

import React from "react";
import type { IconType } from "react-icons";
import { useTheme } from "@/components/ThemeProvider";
import { techStack as defaultTechStack } from "@/data/tech-stack";
import { THEMES } from "@/lib/theme";
import type { Tech } from "@/types";

interface TechStackSectionProps {
  title?: string;
  subtitle?: string;
  techStack?: Tech[];
  showFeatures?: boolean;
  className?: string;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({
  title = "Tech Stack",
  subtitle = "Technologies I work with to build amazing digital experiences. ",
  techStack = defaultTechStack,
  showFeatures = true,
  className = "",
}) => {
  const { colors, resolvedTheme } = useTheme();
  const iconColor = resolvedTheme === THEMES.LIGHT ? "#000000" : "#ffffff";

  const features = [
    { emoji: "🏆", title: "Fullstack Developer", copy: "Full-stack achievement unlocked" },
    { emoji: "⚡", title: "Speed Runner", copy: "Rapid development with modern frameworks" },
    { emoji: "🚀", title: "Scale Engineering", copy: "Building applications that scale infinitely" },
  ];

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-4" style={{ color: colors.foreground }}>
          {title}
        </h2>
        <div className="w-20 h-2 mx-auto rounded-full" style={{ backgroundColor: colors.accent }} />
        <p className="mt-6 text-lg" style={{ color: colors.foreground }}>
          {subtitle}
        </p>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
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
                boxShadow: `0 0 20px ${colors.accent}40, inset 0 0 20px ${colors.accent}20`,
              }}
            >
              {/* Glowing ring effect */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                style={{
                  background: `conic-gradient(from 0deg, ${colors.accent}, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full" style={{ backgroundColor: colors.background }} />
              </div>

              {/* Icon */}
              <div className="relative z-8 floating-icon spinning-icon">
                {typeof tech.icon === "string" ? (
                  <span className="text-3xl" style={{ color: iconColor }}>
                    {tech.icon}
                  </span>
                ) : (
                  tech.icon &&
                  React.createElement(tech.icon as IconType, {
                    className: "text-3xl spinning-icon",
                    style: { color: iconColor },
                  })
                )}
              </div>
            </div>

            {/* Achievement Label */}
            <div
              className="text-center achievement-label"
              style={{
                background: `linear-gradient(135deg, ${colors.background}90 0%, ${colors.hero}90 100%)`,
                borderRadius: "8px",
                padding: "4px 8px",
                border: `1px solid ${colors.accent}50`,
                backdropFilter: "blur(10px)",
              }}
            >
              <span className="text-sm font-bold" style={{ color: colors.foreground }}>
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Features Section */}
      {showFeatures && (
        <div className="mt-16 mb-6 mx-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg transition-transform duration-300 hover:scale-105 achievement-feature"
              style={{
                background: `linear-gradient(135deg, ${colors.hero} 0%, ${colors.background} 100%)`,
                border: `2px solid ${colors.accent}`,
                boxShadow: `0 0 15px ${colors.accent}30`,
              }}
            >
              <div className="text-4xl mb-3" style={{ color: colors.primary }}>
                {feature.emoji}
              </div>
              <h4 className="font-bold mb-2 text-lg" style={{ color: colors.foreground }}>
                {feature.title}
              </h4>
              <p className="text-sm" style={{ color: colors.textMuted }}>
                {feature.copy}
              </p>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes spin {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px color-mix(in srgb, var(--accent, #51273c) 25%, transparent),
              inset 0 0 20px color-mix(in srgb, var(--accent, #51273c) 12%, transparent);
          }
          50% {
            box-shadow: 0 0 30px color-mix(in srgb, var(--accent, #51273c) 38%, transparent),
              inset 0 0 30px color-mix(in srgb, var(--accent, #51273c) 19%, transparent);
          }
        }

        .spinning-icon {
          transition: transform 0.3s ease;
        }

        .achievement-badge:hover .spinning-icon {
          animation: spin 1s linear infinite;
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }

        .achievement-badge:hover {
          animation: pulseGlow 2s ease-in-out infinite;
          transform: scale(1.1);
        }

        .achievement-label {
          opacity: 0.9;
          transition: all 0.3s ease;
        }

        .achievement-feature:hover {
          animation: float 3s ease-in-out infinite;
        }

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
