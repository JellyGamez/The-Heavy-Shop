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
        'red-primary'  : '#c70404',
        'red-dark'     : '#990000',
        'red-light'    : '#fb4242',
        
        'gray-primary' : '#262626',
        'gray-dark'    : '#171717',
        'gray-light'   : '#303030',
        'gray-lighter' : '#474747'
      },
      maxWidth: {
        '8xl' : '90rem',
        '9xl' : '110rem',
      },
      fontFamily: {
        'kanit'  : ['Kanit'],
        'ubuntu' : ['Ubuntu'],
      }
    },
  },
  plugins: [],
}
