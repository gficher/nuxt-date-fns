export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  dateFns: {
    locales: ['ptBR', 'es', 'fr'],
    defaultLocale: 'ptBR',
  },
})
