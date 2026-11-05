"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { IconType } from 'react-icons';
import { useTheme } from '../app/ThemeContext';
import SectionHeading from './SectionHeading';
import { ThemeColors } from '../types/theme';
// Frontend icons
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
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
  colors: ThemeColors;
  techStack?: Tech[];
  showFeatures?: boolean;
  className?: string;
}

const defaultTechStack: Tech[] = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
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

const featureCards = [
  {
    icon: "◈",
    title: "Fullstack Developer",
    copy: "End-to-end ownership: data model, API, interface and delivery.",
  },
  {
    icon: "⚡",
    title: "Speed Runner",
    copy: "Rapid iteration with modern tooling and battle-tested frameworks.",
  },
  {
    icon: "▲",
    title: "Scale Engineering",
    copy: "Systems designed to stay fast, observable and easy to extend.",
  },
];

const TechStackSection: React.FC<TechStackSectionProps> = ({
  title = "Tech Stack",
  subtitle = "Technologies I work with to build amazing digital experiences.",
  colors,
  techStack = defaultTechStack,
  showFeatures = true,
  className = "",
}) => {
  const { isCyber, tokens } = useTheme();
  const reduceMotion = useReducedMotion();

  const iconColor = isCyber ? colors.primary : colors.foreground;

  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <SectionHeading title={title} subtitle={subtitle} />

      {/* Achievement Grid - holographic badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mb-16">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="holo-card group relative flex flex-col items-center text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.9 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={reduceMotion ? undefined : { y: -6 }}
          >
            {/* Badge */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              {/* Orbiting prismatic ring */}
              <div className="holo-ring" aria-hidden="true" />
              <div className="holo-ring-mask" aria-hidden="true" />

              {/* Disc */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{
                  backgroundColor: colors.card,
                  border: `1px solid ${colors.border}`,
                  boxShadow: `inset 0 0 24px ${colors.glow}`,
                }}
              />

              {/* Specular sheen */}
              <div className="holo-sheen" aria-hidden="true" />

              {/* Icon */}
              <div className="relative z-10 holo-prism">
                {typeof tech.icon === 'string' ? (
                  <span className="text-3xl" style={{ color: iconColor }}>
                    {tech.icon}
                  </span>
                ) : (
                  tech.icon &&
                  React.createElement(tech.icon as IconType, {
                    className: "text-3xl sm:text-4xl",
                    style: { color: iconColor },
                  })
                )}
              </div>
            </div>

            {/* Label */}
            <div
              className="mt-4 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all duration-200"
              style={{
                backgroundColor: `${colors.card}E6`,
                border: `1px solid ${colors.border}`,
                color: colors.foreground,
                boxShadow: isCyber ? `0 0 18px -8px ${colors.glow}` : undefined,
              }}
            >
              {tech.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Features Section */}
      {showFeatures && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="holo-panel holo-card group relative p-6 rounded-xl text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              style={{
                backgroundColor: colors.card,
                boxShadow: tokens.shadow.md,
              }}
            >
              <div
                className="holo-surface absolute inset-0 rounded-xl"
                aria-hidden="true"
              />
              <div className="holo-sheen rounded-xl" aria-hidden="true" />

              <div
                className="relative z-10 text-3xl mb-3 inline-flex items-center justify-center w-12 h-12 rounded-lg"
                style={{
                  color: colors.primary,
                  backgroundColor: `${colors.primary}14`,
                  border: `1px solid ${colors.primary}33`,
                }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3
                className="relative z-10 font-bold text-lg mb-2"
                style={{ color: colors.foreground }}
              >
                {feature.title}
              </h3>
              <p className="relative z-10 text-sm" style={{ color: colors.muted }}>
                {feature.copy}
              </p>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechStackSection;
