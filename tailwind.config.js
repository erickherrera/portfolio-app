/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' if you want to use system preference
  theme: {
    extend: {
      colors: {
        // Add your custom theme colors here
        primary: {
          light: '#3B82F6', // blue-500
          dark: '#60A5FA', // blue-400
        },
        secondary: {
          light: '#1F2937', // gray-800
          dark: '#374151', // gray-700
        },
        background: {
          light: '#FFFFFF', // white
          dark: '#1F2937', // gray-800
        },
        hero: {
          light: '#E5E7EB', // gray-200
          dark: '#1F2937', // gray-800
        },
        accent: {
          light: '#3B82F6', // blue-500
          dark: '#60A5FA', // blue-400
        },
        // Add foreground (text) colors
        foreground: {
          light: '#171717', // near black for light mode
          dark: '#ededed', // near white for dark mode
        },
        // Add secondary text colors for paragraphs
        text: {
          light: '#374151', // gray-700 for light mode
          dark: '#D1D5DB', // gray-300 for dark mode
        }
      },
    },
  },
  plugins: [],
}