import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HomeSection from "@/components/HomeSection";
import ProjectsGrid from "@/components/ProjectsSection";
import Section from "@/components/Section";
import SectionNav from "@/components/SectionNav";
import TechStackSection from "@/components/TechStackSection";
import ThemeToggle from "@/components/ThemeToggle";
import TimelineSection from "@/components/TimelineSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <SectionNav />

      <div className="fixed bottom-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <HomeSection />
      <AboutSection />

      <Section id="timeline" variant="background">
        <TimelineSection />
      </Section>

      <Section id="tech">
        <TechStackSection showFeatures />
      </Section>

      <Section id="projects">
        <ProjectsGrid
          projects={projects}
          title="My Projects"
          subtitle="Here are some of the projects I've worked on recently"
          showHeader
        />
      </Section>

      <Section id="contact">
        <ContactSection />
      </Section>
    </div>
  );
}
