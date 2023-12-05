/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        garamond: "EB Garamond, EB Garamond Placeholder, serif",
        inter: "Inter",
      },
      colors: {
        dark: {
          heading: '#181811B',
          title: '#27272a',
          body: '#52525B',
          secondary: '#71717A'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

