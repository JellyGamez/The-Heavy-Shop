/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'red-primary': '#c70404',
        'red-dark': '#a60303',
        'gray-primary': '#6e6d6d',
        'gray-dark': '#404040'
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      screens: {
        '3xl': '1680px'
      }
    },
  },
  plugins: [],
}

