"use client";

import { useEffect, useState } from "react";

interface ActiveSectionOptions {
  rootMargin?: string;
  updateHash?: boolean;
}

export function useActiveSection(
  sectionIds: readonly string[],
  { rootMargin = "-50% 0px -50% 0px", updateHash = false }: ActiveSectionOptions = {}
) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveSection(entry.target.id);
          if (updateHash) {
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { root: null, rootMargin, threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin, updateHash]);

  return activeSection;
}
