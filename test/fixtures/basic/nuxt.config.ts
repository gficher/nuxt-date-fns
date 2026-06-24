import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  dateFns: {
    locales: ['ptBR'],
    defaultLocale: 'ptBR',
  },
})
