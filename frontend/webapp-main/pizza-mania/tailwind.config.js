/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: 'Oswald',
      },
      colors: {
        mainBlack: '212121',
        secondaryRed: '#E60A27',
        secondaryRedShade: '#ed5367',
        secondaryGreen: '#00A149',
        secondaryGold: '#FFC222',
      },
    },
  },
  plugins: [],
};
