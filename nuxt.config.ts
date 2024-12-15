export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/fonts",
    "@nuxt/pinia",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],

  plugins: ["@/plugins/vue-chartjs.js"],

  tailwindcss: { exposeConfig: true },
  i18n: {
    defaultLocale: "en",
    strategy: "prefix_and_default",
    trailingSlash: true,
    locales: [
      { code: "en", language: "en", name: "English" },
      { code: "th", language: "th", name: "ไทย" },
    ],
  },

  fonts: {
    families: [{ name: "Noto Sans Thai", fallbacks: ["Arial"], global: true }],
  },

  sitemap: {
    autoI18n: true,
    debug: true,
    sitemaps: false,
  },
  devtools: {
    enabled: false,
  },
  seo: {
    fallbackTitle: false,
    automaticDefaults: false,
  },
  compatibilityDate: "2024-10-29",
});
