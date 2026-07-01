"use client";

import { useTheme } from "../app/ThemeContext";
import ProfileCard from "./ProfileCard";

export default function AboutSection() {
  const { colors } = useTheme();

  return (
    <section
      id="about"
      className="pt-16 pb-16 md:pt-20 md:pb-20 border-t-6 transition-colors duration-200 scroll-mt-20 w-full"
      style={{
        backgroundColor: colors.hero,
        borderColor: colors.accent
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-4"
            style={{ color: colors.foreground }}
          >
            About Me
          </h2>
          <div className="w-20 h-2 mx-auto rounded-full mb-15" style={{ backgroundColor: colors.accent }}></div>
        </div>

        <div className="flex justify-center w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 max-w-5xl w-full">
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
              <ProfileCard />
            </div>

            <div className="w-full md:flex-1 md:max-w-2xl">
              <p
                className="text-base sm:text-lg font-medium leading-relaxed mb-4 md:mb-6 break-words"
                style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
              >
                <span style={{ color: colors.accent, fontWeight: 'bold' }}>
                  Hello!</span> I&apos;m a passionate software engineer with expertise in building modern software applications.
                My journey in tech began with a deep curiosity about how modern software is created and has evolved into a career focused
                on crafting elegant solutions to complex problems.
              </p>
              <p
                className="text-base sm:text-lg font-medium leading-relaxed break-words"
                style={{ color: colors.foreground === '#171717' ? '#374151' : '#D1D5DB' }}
              >
                I specialize in TypeScript development, with particular focus on React,
                Next.js, and SQL.
                Additionally I&apos;m learning C++, embedded systems and cryptography as part of a personal project so checkout my Github! When I&apos;m not coding, you can find me exploring the outdoors, learning and teaching new technologies, or attending tech meetups in town.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
