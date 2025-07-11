"use client";

import Image from "next/image";
import { useTheme } from "../app/ThemeContext";

interface ProfileCardProps {
  className?: string;
}

const ProfileCard = ({ className = "" }: ProfileCardProps) => {
  const { colors } = useTheme();

  // Calculate age from birth date
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const birthDate = '1995-04-23'; // April 23, 1995
  const currentAge = calculateAge(birthDate);

  const stats = [
    { label: "Born", value: "Puerto Rico" },
    { label: "Located", value: "Colorado Springs" },
    { label: "Age", value: currentAge.toString() },
    { label: "Work", value: "Keysight Technologies" }
  ];

  const quote = '"In your actions, don\'t procrastinate. In your conversations, don\'t confuse. In your thoughts, don\'t wander. In your soul, don\'t be passive or aggressive. In your life, don\'t be all about business." – Marcus Aurelius';

  return (
    <div 
      className={`relative w-80 h-100 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${className}`}
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
        border: `2px solid ${colors.border}`
      }}
    >
      {/* Name Section */}
      <div className="px-6 py-4 text-center border-b" style={{ borderColor: colors.border }}>
        <h3 
          className="text-lg font-bold tracking-wide"
          style={{ color: colors.foreground }}
        >
          Erick Herrera Cabrera
        </h3>
      </div>

      {/* Profile Image Section */}
      <div className="relative h-36 w-full overflow-hidden">
        <Image
          src="/me.jpg"
          alt="Profile photo"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 65%' }}
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