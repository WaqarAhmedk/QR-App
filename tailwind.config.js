/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        375: '150px',
        500: '500px',
        1320: '1320px',
        1440: '1440px',
        1620: '1620px',
        1720: '1720px',
      },
      colors: {
        primary: 'rgba(58, 87, 236, 1)',
        secondary: 'rgba(207, 213, 255, 1)',
        purple: 'rgba(127, 106, 255, 1)',
        t1: '#52525B',
        t2: '#303038',
        grey: 'rgba(217, 217, 217, 1)',
        light: 'rgba(248, 250, 252, 1)',
        red: '#FD264E',
        brown: '#B03D41',
        lightGrey: '#CBD5E1',
      },
      borderRadius: {
        primary: '20px',
      },
      fontSize: {
        heading: '32px',
      },
      backgroundImage: {
        purpleBanner: '/public/assets/svgs/LandingPage/purple_banner.svg',
      },
      boxShadow: {
        main: '0px 2px 4px rgba(0, 0, 0, 0.15), 0px -2px 4px rgba(0, 0, 0, 0.15);',
        secondary: [
          '0px -2px 4px rgba(0, 0, 0, 0.1)',
          '0px 2px 4px rgba(0, 0, 0, 0.1)',
        ],
        inner:
          ' inset 0px 1px 2px rgba(97, 97, 97, 0.2), inset 0px 2px 4px rgba(97, 97, 97, 0.2)',
        thin: '0px 1px 4px rgba(0, 0, 0, 0.05), 0px 0px 4px rgba(0, 0, 0, 0.01);',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addBase, addUtilities, addComponents, addVariant }) {
      addUtilities({});
    },
  ],
};
