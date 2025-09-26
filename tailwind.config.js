/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // New Aquatic Color Palette
        'primary': '#03045e',       // Midnight Blue (Deep Sea)
        'secondary': '#0077b6',     // Star Command Blue (Clear Water)
        'accent': '#00b4d8',        // Pacific Blue (Shallow Lagoon)
        'light-bg': '#caf0f8',      // Light Cyan (Surface)
        'text-dark': '#023e8a',      // Darker Blue for text
        'text-light': '#ffffff',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};