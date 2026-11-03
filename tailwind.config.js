/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FBBF24',
          red: '#EF4444',
          dark: '#1E293B',
          gray: '#F8FAFC',
        },
        card: {
          yellow: '#FEF3C7',
          blue: '#E0F2FE',
          green: '#DCFCE7',
          purple: '#F3E8FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}