import type { IconType } from "react-icons";

export interface Project {
  id: number;
  title: string;
  description: string;
  year: number;
  image?: string;
  overview?: string;
  programmingLanguage?: string;
  frontend?: string;
  backend?: string;
  githubUrl?: string;
}

export type TimelineItemType = "work" | "education" | "certification";

export interface TimelineItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: TimelineItemType;
}

export interface Tech {
  name: string;
  icon?: string | IconType;
}

export interface NavSection {
  id: string;
  name: string;
}

export interface NavLink {
  name: string;
  path: string;
  isHash: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}
