import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@components/components/NavBar";
import { ThemeProvider } from "./ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EHC Portfolio",
  description: "Personal portfolio of Erick Herrera, a developer from Puerto Rico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider>
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 px-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            <div className="container mx-auto text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Erick Herrera. All rights reserved.
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}