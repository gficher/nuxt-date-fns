import { defineNuxtModule, addImports, addPluginTemplate } from '@nuxt/kit'
import * as dateFns from 'date-fns'

export interface ModuleOptions {
  /**
   * Prefix to be used for the imported methods.
   * @default 'df'
   */
  prefix?: string

  /**
   * Specific methods to import from date-fns. If empty, imports all available functions.
   * @default []
   */
  methods?: string[]

  /**
   * Locales to auto-import from date-fns/locale.
   * e.g. ['ptBR', 'es']
   * @default []
   */
  locales?: string[]

  /**
   * Default locale to be used globally by date-fns.
   * e.g. 'ptBR'
   */
  defaultLocale?: string

  /**
   * @deprecated Fallback locale is no longer supported with static auto-imports.
   * Please use `defaultLocale` instead.
   */
  fallbackLocale?: string
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    dateFns?: ModuleOptions
  }
  interface NuxtOptions {
    dateFns: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-date-fns',
    configKey: 'dateFns',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  defaults: {
    prefix: 'df',
    methods: [],
    locales: [],
  },
  setup(options, _nuxt) {
    // 1. Auto-import date-fns functions
    const defaultMethods = Object.keys(dateFns).filter(key => key !== 'default')
    const methodsToImport = options.methods?.length ? options.methods : defaultMethods

    const imports = methodsToImport.map((method) => {
      let asName = method
      // Apply prefix if provided
      if (options.prefix) {
        // Capitalize the first letter of the method to follow camelCase
        const capitalizedMethod = method.charAt(0).toUpperCase() + method.slice(1)
        asName = `${options.prefix}${capitalizedMethod}`
      }

      return {
        name: method,
        as: asName,
        from: 'date-fns',
      }
    })

    addImports(imports)

    // 2. Auto-import locales
    if (options.locales && options.locales.length > 0) {
      const localeImports = options.locales.map((locale) => {
        // The user specifies locales like 'ptBR', 'es'
        return {
          name: locale,
          as: locale,
          from: 'date-fns/locale',
        }
      })

      addImports(localeImports)
    }

    // 3. Set global default locale via plugin
    if (options.fallbackLocale) {
      console.warn('[nuxt-date-fns] `fallbackLocale` is no longer supported with static auto-imports. Please use `defaultLocale` instead.')
    }

    if (options.defaultLocale) {
      addPluginTemplate({
        filename: 'date-fns-plugin.mjs',
        getContents: () => `
import { setDefaultOptions } from 'date-fns'
import { ${options.defaultLocale} } from 'date-fns/locale'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  setDefaultOptions({ locale: ${options.defaultLocale} })
})
        `,
      })
    }
  },
})
