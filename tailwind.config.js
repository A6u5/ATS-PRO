/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkEditor: '#111c30',
        darkCanvas: '#0f172a',
        darkInput: '#1e293b',
      }
    },
  },
  plugins: [],
}