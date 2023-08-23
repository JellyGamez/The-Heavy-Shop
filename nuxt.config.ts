// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/tailwindcss']

})
