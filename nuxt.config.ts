// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  googleFonts: {
    families: {
      Kanit: [200, 300, 400, 500],
      Ubuntu: [400, 700]
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    pageTransition: {
      name: 'page', mode: 'out-in'
    }
  },

  stripe: {
    client: {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
      options: {
        // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      }
    },
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        // your api options override for stripe server side https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      }
    }
  },

  devtools: {
    enabled: true
  },

  build: {
    transpile: ['vue-toastification'],
  },

  runtimeConfig: {
    public: {
      authOrigin: process.env.AUTH_ORIGIN,
      perPage: 20
    }
  },

  modules: [
    '@sidebase/nuxt-auth',
    'nuxt-headlessui',
    '@vue-email/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/robots',
    '@nuxtjs/google-fonts',
    '@unlok-co/nuxt-stripe'
  ],

  compatibilityDate: '2024-09-08'
})