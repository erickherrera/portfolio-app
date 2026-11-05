import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import NavBar from "@components/components/NavBar";
import { ThemeProvider } from "./ThemeContext";
import ThemedFooter from "@components/components/ThemedFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EHC Portfolio",
  description: "Personal portfolio of Erick Herrera, a developer from Puerto Rico",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F2F6FA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the persisted theme before first paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var stored = window.localStorage.getItem('ehc-portfolio-theme');
                if (stored === 'cyber') stored = 'dark'; // migrate the retired cyberpunk theme
                var theme = (stored === 'light' || stored === 'dark')
                  ? stored
                  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
                document.documentElement.style.colorScheme = theme;
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider>
          <NavBar />
          <main className="flex-grow pb-16 relative z-10">
            {children}
          </main>
          <ThemedFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
