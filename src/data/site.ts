import type { NavLink, NavSection } from "@/types";

export const SITE = {
  name: "Erick Herrera",
  role: "Software Engineer",
  title: "Erick Herrera | Software Engineer",
  description:
    "Personal portfolio of Erick Herrera, a software engineer from Puerto Rico building modern web, mobile, and systems software.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://erickherrera.dev",
  email: "erickmherrera.jobs@outlook.com",
  socials: {
    github: "https://github.com/erickherrera",
    linkedin:
      "http://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4",
  },
} as const;

export const SECTIONS: NavSection[] = [
  { id: "home", name: "Home" },
  { id: "about", name: "About" },
  { id: "timeline", name: "Journey" },
  { id: "tech", name: "Tech" },
  { id: "projects", name: "Projects" },
  { id: "contact", name: "Contact" },
];

export const SECTION_IDS = SECTIONS.map((section) => section.id);

export const NAV_LINKS: NavLink[] = [
  { name: "Home", path: "#home", isHash: true },
  { name: "About", path: "#about", isHash: true },
  { name: "My Experience", path: "#timeline", isHash: true },
  { name: "Tech Stack", path: "#tech", isHash: true },
  { name: "Personal Projects", path: "#projects", isHash: true },
  { name: "Contact", path: "#contact", isHash: true },
];

export const RESUME_PATH = "/resume.pdf";
export const RESUME_FILENAME = "Erick_Herrera_Resume.pdf";
