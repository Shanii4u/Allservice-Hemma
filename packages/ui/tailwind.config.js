/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f4511e',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f3f4f6',
          foreground: '#111827',
        },
      },
    },
  },
  plugins: [],
} 