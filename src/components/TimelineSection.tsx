"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../app/ThemeContext';
import { MdWork, MdSchool, MdVerifiedUser } from 'react-icons/md';

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
      title: "Software Engineer",
      company: "Keysight Technologies",
      location: "Colorado Springs, CO",
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
      location: "Colorado Springs, CO",
      period: "2022 - Present",
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
      title: "Customer Support Specialist",
      company: "Keysight Technologies",
      location: "Colorado Springs, CO",
      period: "2019 - 2022",
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
      location: "Puerto Rico",
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
        return <MdWork className="w-full h-full" />;
      case 'education':
        return <MdSchool className="w-full h-full" />;
      case 'certification':
        return <MdVerifiedUser className="w-full h-full" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return colors.accent;
      case 'education':
        return colors.primary;
      case 'certification':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4"
          style={{ color: colors.foreground }}
        >
          My Experience
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
      <div className="relative hidden lg:block">
        {/* Central Timeline Line */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-1 h-full rounded-full"
          style={{ 
            background: `linear-gradient(to bottom, ${colors.accent}20, ${colors.accent}80, ${colors.accent}20)`
          }}
        ></div>

        {/* Timeline Items */}
        <div className="space-y-16">
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
                <div className={`w-5/12 ${isLeft ? 'pr-12' : 'pl-12'}`}>
                  <div
                    className={`relative p-8 rounded-xl border-2 transition-all duration-1000 transform motion-reduce:transition-none motion-reduce:transform-none ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
                        : `opacity-0 ${isLeft ? 'translate-x-16 -rotate-3' : '-translate-x-16 rotate-3'} translate-y-12 scale-90`
                    }`}
                    style={{
                      backgroundColor: colors.card,
                      borderColor: getTypeColor(item.type),
                      boxShadow: isVisible ? `0 20px 40px ${getTypeColor(item.type)}25, 0 0 0 1px ${getTypeColor(item.type)}10` : 'none',
                      transitionDelay: `${index * 300}ms`
                    }}
                  >
                    {/* Floating Icon */}
                    <div
                      className={`absolute ${isLeft ? '-right-4' : '-left-4'} -top-4 w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                        isVisible ? 'scale-110 rotate-0' : 'scale-0 rotate-180'
                      }`}
                      style={{
                        backgroundColor: colors.card,
                        borderColor: getTypeColor(item.type),
                        boxShadow: isVisible ? `0 8px 20px ${getTypeColor(item.type)}30` : 'none',
                        transitionDelay: `${index * 300 + 200}ms`
                      }}
                    >
                      <div className="w-6 h-6" style={{ color: getTypeColor(item.type) }}>
                        {getIconForType(item.type)}
                      </div>
                    </div>

                    {/* Header */}
                    <div className="mb-4">
                      <h3 
                        className="text-2xl font-bold mb-2"
                        style={{ color: colors.foreground }}
                      >
                        {item.title}
                      </h3>
                      <p 
                        className="font-semibold text-lg mb-1"
                        style={{ color: getTypeColor(item.type) }}
                      >
                        {item.company}
                      </p>
                      <p 
                        className="text-sm opacity-80"
                        style={{ color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF' }}
                      >
                        {item.location}
                      </p>
                    </div>

                    {/* Period Badge */}
                    <div 
                      className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6"
                      style={{ 
                        backgroundColor: `${getTypeColor(item.type)}20`,
                        color: getTypeColor(item.type),
                        border: `2px solid ${getTypeColor(item.type)}30`
                      }}
                    >
                      {item.period}
                    </div>

                    {/* Description with custom bullets */}
                    <div className="space-y-3">
                      {item.description.map((desc, descIndex) => (
                        <div
                          key={descIndex}
                          className={`flex items-start gap-3 text-sm leading-relaxed transition-all duration-800 motion-reduce:transition-none ${
                            isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? 'translate-x-8' : '-translate-x-8'}`
                          }`}
                          style={{ 
                            transitionDelay: `${(index * 300) + (descIndex * 150) + 400}ms`
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: getTypeColor(item.type) }}
                          ></div>
                          <span style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}>
                            {desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Center Node */}
                <div className="relative z-20 flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full border-4 transition-all duration-800 motion-reduce:transition-none ${
                      isVisible ? 'scale-125 rotate-180' : 'scale-75 rotate-0'
                    }`}
                    style={{
                      backgroundColor: isVisible ? getTypeColor(item.type) : colors.background,
                      borderColor: getTypeColor(item.type),
                      boxShadow: isVisible ? `0 0 30px ${getTypeColor(item.type)}60, 0 0 60px ${getTypeColor(item.type)}30` : 'none',
                      transitionDelay: `${index * 300 + 100}ms`
                    }}
                  >
                    {/* Pulsing ring */}
                    {isVisible && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          backgroundColor: getTypeColor(item.type),
                          opacity: 0.3
                        }}
                      ></div>
                    )}
                  </div>
                </div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Timeline End */}
        <div className="flex justify-center mt-16 mb-8">
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full border-4 animate-pulse"
              style={{
                backgroundColor: colors.background,
                borderColor: colors.accent,
                boxShadow: `0 0 20px ${colors.accent}40`
              }}
            ></div>
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: colors.accent,
                opacity: 0.2
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Timeline - Card Stack Design (hidden on desktop) */}
      <div className="block lg:hidden">
        {/* Card Stack Layout */}
        <div className="relative">
          {/* Stacked Cards */}
          <div className="space-y-4">
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.has(item.id);
              
              return (
                <div
                  key={`mobile-${item.id}`}
                  data-id={item.id}
                  className="timeline-item relative"
                >
                  {/* Card with dramatic entrance */}
                  <div
                    className={`relative p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-1200 transform motion-reduce:transition-none motion-reduce:transform-none ${
                      isVisible 
                        ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
                        : 'opacity-0 translate-y-16 scale-95 rotate-2'
                    }`}
                    style={{
                      backgroundColor: `${colors.card}f0`,
                      borderColor: getTypeColor(item.type),
                      transitionDelay: `${index * 400}ms`,
                      marginLeft: `${index * 4}px`,
                      marginRight: `${(timelineData.length - index - 1) * 4}px`
                    }}
                  >
                    {/* Floating icon badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-12 h-12 rounded-full border-3 flex items-center justify-center transition-all duration-1200 ${
                        isVisible ? 'scale-110 rotate-0' : 'scale-0 rotate-180'
                      }`}
                      style={{
                        backgroundColor: colors.card,
                        borderColor: getTypeColor(item.type),
                        boxShadow: isVisible ? `0 10px 25px ${getTypeColor(item.type)}30` : 'none',
                        transitionDelay: `${index * 400 + 300}ms`
                      }}
                    >
                      <div className="w-6 h-6" style={{ color: getTypeColor(item.type) }}>
                        {getIconForType(item.type)}
                      </div>
                    </div>

                    {/* Content with staggered animation */}
                    <div className="relative z-10">
                      {/* Header section */}
                      <div className="mb-4">
                        <h3 
                          className={`text-lg md:text-xl font-bold mb-2 transition-all duration-800 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                          style={{ 
                            color: colors.foreground,
                            transitionDelay: `${index * 400 + 400}ms`
                          }}
                        >
                          {item.title}
                        </h3>
                        <p 
                          className={`font-semibold text-base mb-1 transition-all duration-800 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                          style={{ 
                            color: getTypeColor(item.type),
                            transitionDelay: `${index * 400 + 500}ms`
                          }}
                        >
                          {item.company}
                        </p>
                        <p 
                          className={`text-sm opacity-80 transition-all duration-800 ${
                            isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                          style={{ 
                            color: colors.foreground === '#171717' ? '#6B7280' : '#9CA3AF',
                            transitionDelay: `${index * 400 + 600}ms`
                          }}
                        >
                          {item.location}
                        </p>
                      </div>

                      {/* Period badge with glow */}
                      <div 
                        className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 transition-all duration-800 ${
                          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                        style={{ 
                          backgroundColor: `${getTypeColor(item.type)}25`,
                          color: getTypeColor(item.type),
                          border: `2px solid ${getTypeColor(item.type)}40`,
                          transitionDelay: `${index * 400 + 700}ms`
                        }}
                      >
                        {item.period}
                      </div>

                      {/* Enhanced descriptions */}
                      <div className="space-y-3">
                        {item.description.map((desc, descIndex) => (
                          <div
                            key={descIndex}
                            className={`flex items-start gap-3 transition-all duration-800 ${
                              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                            }`}
                            style={{ 
                              transitionDelay: `${index * 400 + 800 + (descIndex * 200)}ms`
                            }}
                          >
                            {/* Animated bullet */}
                            <div 
                              className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 transition-all duration-500 ${
                                isVisible ? 'scale-100' : 'scale-0'
                              }`}
                              style={{ 
                                backgroundColor: getTypeColor(item.type),
                                transitionDelay: `${index * 400 + 900 + (descIndex * 200)}ms`
                              }}
                            >
                              {/* Ripple effect */}
                              {isVisible && (
                                <div
                                  className="absolute inset-0 rounded-full animate-ping"
                                  style={{
                                    backgroundColor: getTypeColor(item.type),
                                    opacity: 0.4,
                                    animationDelay: `${descIndex * 0.5}s`
                                  }}
                                ></div>
                              )}
                            </div>
                            <span 
                              className="text-sm leading-relaxed flex-1"
                              style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
                            >
                              {desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile timeline end */}
          <div className="flex justify-center mt-12 mb-6">
            <div className="relative">
              <div
                className="w-6 h-6 rounded-full border-3 animate-pulse"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.accent,
                  boxShadow: `0 0 15px ${colors.accent}40`
                }}
              ></div>
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: colors.accent,
                  opacity: 0.3
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;