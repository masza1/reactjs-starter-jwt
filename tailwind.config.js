/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6ee7b7', // Light green
          DEFAULT: '#10b981', // Green for healthcare
          dark: '#047857', // Dark green
        },
        secondary: {
          light: '#93c5fd', // Light blue
          DEFAULT: '#3b82f6', // Blue
          dark: '#1e3a8a', // Dark blue
        }
      }
    },
  },
  plugins: [],
}

