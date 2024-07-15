/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#fceca4',
      'secondary': '#f69a0b',
      'white': '#fafafa',
      'black': '#0a0a0a',
      'grey': '#d4d4d8',
      'red': '#b91c1c'
    },
    extend: {},
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.title': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.medium'),
          letterSpacing: theme('letterSpacing.wider'),
          marginBottom: theme('margin.4'),
        },
        '.paragraph': {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.normal'),
          letterSpacing: theme('letterSpacing.wide'),
          textAlign: 'start'
        },
        '.paragraph-bold': {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.semibold'),
          letterSpacing: theme('letterSpacing.wide'),
          textAlign: 'start'
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
