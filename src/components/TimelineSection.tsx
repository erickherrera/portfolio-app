"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../app/ThemeContext';

interface TimelineItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'certification';
}

interface TimelineSectionProps {
  className?: string;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ className = "" }) => {
  const { colors } = useTheme();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: "Customer Service Representative",
      company: "Keysight Technologies",
      location: "Santa Rosa, CA",
      period: "2023 - Present",
      description: [
        "Maintain high customer satisfaction while developing technical solutions for complex product inquiries",
        "Collaborate with engineering teams to resolve technical issues and provide product feedback"
      ],
      type: 'work'
    },
    {
      id: 2,
      title: "Business Process Analyst",
      company: "Keysight Technologies",
      location: "Santa Rosa, CA",
      period: "2021 - 2023",
      description: [
        "Led automation initiatives for inbound email processing using Salesforce functionality, reducing manual processing time by 40%",
        "Saved 15+ work hours weekly through implementation of process improvements and workflow optimization",
        "Conducted waste walks and value stream mapping to identify and eliminate process inefficiencies",
        "Developed and maintained comprehensive documentation for critical business processes",
        "Collaborated with cross-functional teams to implement scalable solutions"
      ],
      type: 'work'
    },
    {
      id: 3,
      title: "Customer Service Representative / Customer Technical Assistant",
      company: "Keysight Technologies",
      location: "Santa Rosa, CA",
      period: "2019 - 2021",
      description: [
        "Provided technical support for complex electronic testing equipment",
        "Developed problem-solving skills through troubleshooting hardware and software issues"
      ],
      type: 'work'
    },
    {
      id: 4,
      title: "Intelligence Specialist",
      company: "U.S. Coast Guard",
      location: "United States",
      period: "2016 - 2018",
      description: [
        "Led a team of 4 junior personnel in daily operations and training initiatives",
        "Analyzed and compiled intelligence reports using specialized software tools",
        "Managed sensitive data while maintaining strict information security protocols",
        "Earned commendation for developing a streamlined information processing workflow"
      ],
      type: 'work'
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems(prev => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observerRef.current?.observe(item));

    return () => {
      timelineItems.forEach(item => observerRef.current?.unobserve(item));
      observerRef.current?.disconnect();
    };
  }, []);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a1 1 0 011 1v6.5M7 7h10v4l-2 2H9l-2-2V7z" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'certification':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return colors.primary;
      case 'education':
        return colors.secondary;
      case 'certification':
        return colors.accent;
      default:
        return colors.primary;
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4"
          style={{ color: colors.foreground }}
        >
          My Journey
        </h2>
        <div 
          className="w-16 sm:w-20 h-1 mx-auto rounded-full mb-4 sm:mb-6"
          style={{ backgroundColor: colors.accent }}
        ></div>
        <p 
          className="text-base sm:text-lg font-medium max-w-2xl mx-auto"
          style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
        >
          A timeline of my professional experience, education, and key achievements
        </p>
      </div>

      {/* Desktop / Tablet timeline (hidden on mobile) */}
      <div className="relative hidden md:block">
        {/* Central Timeline Line */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full"
          style={{ 
            background: `linear-gradient(to bottom, ${colors.accent}20, ${colors.accent}60, ${colors.accent}20)`
          }}
        ></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => {
            const isVisible = visibleItems.has(item.id);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                data-id={item.id}
                className={`timeline-item flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                  <div
                    className={`p-6 rounded-lg border-2 transition-all duration-700 transform motion-reduce:transition-none motion-reduce:transform-none ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-95'
                    }`}
                    style={{
                      backgroundColor: colors.card,
                      borderColor: getTypeColor(item.type),
                      boxShadow: isVisible ? `0 10px 25px ${getTypeColor(item.type)}20` : 'none',
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 
                          className="text-xl font-bold mb-1"
                          style={{ color: colors.foreground }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="font-semibold mb-1"
                          style={{ color: getTypeColor(item.type) }}
                        >
                          {item.company}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
                        >
                          {item.location}
                        </p>
                      </div>
                      <div
                        className="flex-shrink-0 p-2 rounded-full ml-3"
                        style={{ backgroundColor: `${getTypeColor(item.type)}20` }}
                        aria-hidden
                      >
                        <div style={{ color: getTypeColor(item.type) }}>
                          {getIconForType(item.type)}
                        </div>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{ 
                        backgroundColor: `${getTypeColor(item.type)}15`,
                        color: getTypeColor(item.type)
                      }}
                    >
                      {item.period}
                    </div>

                    {/* Description */}
                    <ul className="space-y-2">
                      {item.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className={`text-sm leading-relaxed transition-all duration-500 motion-reduce:transition-none ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                          }`}
                          style={{ 
                            color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB',
                            transitionDelay: `${(index * 200) + (descIndex * 100)}ms`
                          }}
                        >
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Circle */}
                <div className="relative z-10 flex items-center justify-center">
                  <div
                    className={`w-4 h-4 rounded-full border-4 transition-all duration-500 motion-reduce:transition-none ${
                      isVisible ? 'scale-110' : 'scale-100'
                    }`}
                    style={{
                      backgroundColor: isVisible ? getTypeColor(item.type) : colors.background,
                      borderColor: getTypeColor(item.type),
                      boxShadow: isVisible ? `0 0 20px ${getTypeColor(item.type)}40` : 'none'
                    }}
                  ></div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            );
          })}
        </div>

        {/* Timeline End Indicator */}
        <div className="flex justify-center mt-12">
          <div
            className="w-6 h-6 rounded-full border-4"
            style={{
              backgroundColor: colors.background,
              borderColor: colors.accent
            }}
          ></div>
        </div>
      </div>

      {/* Mobile Timeline (single-column, only on small screens) */}
      <div className="block md:hidden">
        <div className="relative pl-8 pr-2 overflow-x-hidden">
          {/* Mobile Timeline Line */}
          <div 
            className="absolute left-4 top-0 w-0.5 h-full rounded-full"
            style={{ 
              background: `linear-gradient(to bottom, ${colors.accent}20, ${colors.accent}60, ${colors.accent}20)`
            }}
          ></div>

          {/* Mobile Timeline Items */}
          <div className="space-y-6 sm:space-y-8">
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.has(item.id);
              
              return (
                <div
                  key={`mobile-${item.id}`}
                  data-id={item.id}
                  className="timeline-item relative"
                >
                  {/* Mobile Circle */}
                  <div
                    className={`absolute -left-3 top-2 w-3 h-3 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none ${
                      isVisible ? 'scale-110' : 'scale-100'
                    }`}
                    style={{
                      backgroundColor: isVisible ? getTypeColor(item.type) : colors.background,
                      borderColor: getTypeColor(item.type)
                    }}
                  ></div>

                  {/* Mobile Content */}
                  <div
                    className={`p-4 rounded-lg border-l-4 transition-all duration-700 transform motion-reduce:transition-none motion-reduce:transform-none ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-4'
                    }`}
                    style={{
                      backgroundColor: colors.card,
                      borderColor: getTypeColor(item.type),
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 
                          className="text-base sm:text-lg font-bold mb-1"
                          style={{ color: colors.foreground }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className="font-semibold text-sm mb-1"
                          style={{ color: getTypeColor(item.type) }}
                        >
                          {item.company}
                        </p>
                        <p 
                          className="text-xs mb-2"
                          style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
                        >
                          {item.location}
                        </p>
                      </div>
                      <div
                        className="p-1.5 rounded-full"
                        style={{ backgroundColor: `${getTypeColor(item.type)}20` }}
                        aria-hidden
                      >
                        <div className="w-4 h-4" style={{ color: getTypeColor(item.type) }}>
                          {getIconForType(item.type)}
                        </div>
                      </div>
                    </div>

                    <div 
                      className="inline-block px-2 py-1 rounded text-xs font-medium mb-3"
                      style={{ 
                        backgroundColor: `${getTypeColor(item.type)}15`,
                        color: getTypeColor(item.type)
                      }}
                    >
                      {item.period}
                    </div>

                    <ul className="space-y-1">
                      {item.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="text-xs leading-relaxed"
                          style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
                        >
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;