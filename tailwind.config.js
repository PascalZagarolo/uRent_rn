/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", 
  "./components/**/*.{js,jsx,ts,tsx}", 
  "./components/_login/**/*.{js,jsx,ts,tsx}", 
  "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

