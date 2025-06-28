"use client";

import Image from "next/image";
import { useTheme } from "../../ThemeContext";

interface ProfileCardProps {
  className?: string;
}

const ProfileCard = ({ className = "" }: ProfileCardProps) => {
  const { colors } = useTheme();

  const stats = [
    { label: "Born", value: "Puerto Rico" },
    { label: "Located", value: "Colorado Springs" },
    { label: "Age", value: "30" },
    { label: "Work", value: "Keysight Technologies" }
  ];

  const quote = '"In your actions, don\'t procrastinate. In your conversations, don\'t confuse. In your thoughts, don\'t wander. In your soul, don\'t be passive or aggressive. In your life, don\'t be all about business." – Marcus Aurelius';

  return (
    <div 
      className={`relative w-80 h-96 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${className}`}
      style={{
        backgroundColor: colors.card,
        borderColor: colors.accent,
        border: `2px solid ${colors.accent}`
      }}
    >
      {/* Profile Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src="/me.jpg"
          alt="Profile photo"
          fill
          className="object-cover"
          priority
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`
          }}
        />
      </div>

      {/* Stats Section */}
      <div className="px-6 py-4 space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span 
              className="text-sm font-medium font-semibold uppercase tracking-wide"
              style={{ color: colors.accent }}
            >
              {stat.label}:
            </span>
            <span 
              className="text-sm"
              style={{ color: colors.foreground }}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Scrolling Quote Footer */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden"
        style={{
          backgroundColor: colors.background,
          borderTop: `1px solid ${colors.border}`
        }}
      >
        <div className="relative h-full flex items-center">
          <div 
            className="animate-scroll whitespace-nowrap text-xs font-medium"
            style={{ color: colors.foreground }}
          >
            <span className="inline-block px-4">{quote}</span>
            <span className="inline-block px-4">{quote}</span>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;