"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../app/ThemeContext";
import type { ThemeColors } from "../types/theme";

const WELCOME_PHRASES = [
  { language: "English", code: "EN", locale: "en", text: "Welcome to my portfolio" },
  { language: "Mandarin", code: "中文", locale: "zh-CN", text: "欢迎来到我的作品集" },
  { language: "Portuguese", code: "PT", locale: "pt", text: "Bem-vindo ao meu portfólio" },
  { language: "Spanish", code: "ES", locale: "es", text: "Bienvenido a mi portafolio" },
  { language: "French", code: "FR", locale: "fr", text: "Bienvenue dans mon portfolio" },
] as const;

// Segment by grapheme so Hindi vowel marks and other combined characters are
// never typed or deleted as broken fragments.
function splitGraphemes(text: string) {
  if (typeof Intl.Segmenter === "function") {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

function TypewriterWelcome({ colors }: { colors: ThemeColors }) {
  const reduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = WELCOME_PHRASES[phraseIndex];
  const characters = useMemo(() => splitGraphemes(phrase.text), [phrase.text]);

  useEffect(() => {
    if (reduceMotion) return;

    const isComplete = !isDeleting && characterCount === characters.length;
    const isDeleted = isDeleting && characterCount === 0;
    let delay = isDeleting ? 34 : 62 + (characterCount % 4) * 12;

    if (isComplete) delay = 1800;
    else if (isDeleted || characterCount === 0) delay = 350;

    // One self-cleaning timer at a time keeps the work off the render loop and
    // prevents overlapping animations when the component unmounts.
    const timer = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
      } else if (isDeleted) {
        setPhraseIndex((current) => (current + 1) % WELCOME_PHRASES.length);
        setIsDeleting(false);
      } else {
        setCharacterCount((current) => current + (isDeleting ? -1 : 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [characterCount, characters.length, isDeleting, reduceMotion]);

  const activePhrase = reduceMotion ? WELCOME_PHRASES[0] : phrase;
  const visibleText = reduceMotion
    ? WELCOME_PHRASES[0].text
    : characters.slice(0, characterCount).join("");

  return (
    <div className="w-full mb-5">
      <div
        className="cyber-mono mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.18em]"
        style={{ color: colors.muted }}
        aria-hidden="true"
      >
        <span style={{ color: colors.primary }}>{"//"}</span>
        <span>LANG::{activePhrase.code}</span>
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colors.accent, boxShadow: `0 0 10px ${colors.accent}` }}
        />
        <span>{activePhrase.language}</span>
      </div>

      <h1
        className="cyber-display relative grid w-full text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words hyphens-none"
        style={{
          color: colors.foreground,
          textShadow: `0 0 28px ${colors.glow}`,
        }}
      >
        <span className="sr-only">Welcome to my portfolio.</span>

        {/* Invisible copies reserve the tallest translation, preventing layout shift. */}
        {WELCOME_PHRASES.map((item) => (
          <span
            key={item.code}
            className="invisible col-start-1 row-start-1 min-w-0"
            aria-hidden="true"
          >
            {item.text}
          </span>
        ))}

        <span
          className="col-start-1 row-start-1 min-w-0 text-center"
          lang={activePhrase.locale}
          aria-hidden="true"
        >
          {visibleText}
          <span
            className="typewriter-caret"
            style={{
              backgroundColor: colors.accent,
              boxShadow: `0 0 8px ${colors.accent}, 0 0 18px ${colors.accent}`,
              animation: reduceMotion ? "none" : undefined,
            }}
          />
        </span>
      </h1>
    </div>
  );
}

export default function HomeSection() {
  const { colors } = useTheme();

  const ctaClass =
    "hero-cta cyber-mono px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-center w-full sm:w-auto clip-corner-sm";

  return (
    <section
      id="home"
      className="pt-28 pb-20 md:pt-36 md:pb-28 transition-colors duration-200 w-full min-h-[70vh] flex items-center relative"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center w-full">
          <TypewriterWelcome colors={colors} />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full max-w-md justify-center">
            <a
              href="https://github.com/erickherrera"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="http://www.linkedin.com/in/erick-herrera-cabrera-b2268b1b4"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={ctaClass}
              aria-label="Contact Me"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
