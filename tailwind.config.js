/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kannada: {
          red: '#E53935', // Karnataka flag red
          yellow: '#FDD835', // Karnataka flag yellow
          dark: '#1E293B',
          light: '#F8FAFC'
        }
      }
    },
  },
  plugins: [],
}