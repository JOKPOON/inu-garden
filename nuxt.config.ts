export default defineNuxtConfig({
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],

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
  devtools: false,
  seo: {
    fallbackTitle: false,
    automaticDefaults: false,
  },

  compatibilityDate: "2024-10-29",
});
