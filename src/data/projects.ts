import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "SaaS for HVAC",
    description:
      "SaaS application for an HVAC company to manage their business.",
    year: 2024,
    image: "/whitaker.png",
    overview:
      "This is an application currently being used by an HVAC company in Georgia.",
    programmingLanguage: "JavaScript",
    frontend: "React, Tailwind",
    backend: "MySQL, Express.js, Node.js",
  },
  {
    id: 2,
    title: "Personal Portfolio",
    description:
      "Personal portfolio using Next.js with modern design patterns.",
    year: 2024,
    image: "/portfolio-screenshot-2.png",
    programmingLanguage: "TypeScript, JavaScript",
    frontend: "React, Next.js, Tailwind",
    backend: "Next.js, Node.js",
    githubUrl: "https://github.com/erickherrera/portfolio-app",
  },
  {
    id: 3,
    title: "Arduino Certification",
    description:
      "Completed the Arduino starter course. Passed the certification. Completed final project.",
    year: 2025,
    image: "/arduino.jpg",
    programmingLanguage: "C++",
  },
  {
    id: 4,
    title: "Crypto Wallet App",
    description: "Cryptocurrency and digital assets wallet for everyone.",
    year: 2025,
    image: "/criptogualet.png",
    programmingLanguage: "C++ with Clang Compiler",
    frontend: "Qt, CMake",
    backend: "SQLite, SQLCipher",
    githubUrl: "https://github.com/erickherrera/CriptoGualet",
  },
  {
    id: 5,
    title: "CloudMG",
    description:
      "Cloud application for mobile phones that enables peer-to-peer mountain gear renting.",
    year: 2026,
    image: "/cloudMG.png",
    programmingLanguage: "TypeScript",
    frontend: "React Native, Tailwind",
    backend: "Supabase, PostgreSQL",
    githubUrl: "https://github.com/erickherrera/CloudMG",
  },
];
