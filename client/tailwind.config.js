/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // darkMode: "class",
    theme: {
      colors:{
        'primary':'#fceca4',      
        'secondary':'#f69a0b',
        'white':'#fafafa',
        'black':'#0a0a0a',
        'grey':'#d4d4d8'
      },
      extend: {},
    },
    plugins: [],
  }