# Nuxt date-fns Module

A seamless Nuxt 3/4 integration for the `date-fns` library. This module provides highly optimized auto-imports for `date-fns` functions and locales, allowing you to format and manipulate dates effortlessly in your Nuxt applications without worrying about manual imports or Server-Side Rendering (SSR) issues.

## Features

- ⚡️ **Zero-config auto-imports** for all `date-fns` utilities.
- 🌳 **Fully tree-shakeable**: Only the functions you actually use are included in your final bundle.
- 🌍 **Locale auto-imports**: Access language packs effortlessly.
- 🛡 **SSR Safe**: Uses pure function auto-imports to prevent dangerous cross-request state pollution.
- ⚙️ **Configurable**: Prefixing support to prevent namespace collisions.

## Installation

```bash
# Using npm
npm install date-fns nuxt-date-fns

# Using pnpm
pnpm add date-fns nuxt-date-fns

# Using yarn
yarn add date-fns nuxt-date-fns
```
*(Note: `date-fns` should be installed as a peer dependency alongside the module).*

## Setup

Add `nuxt-date-fns` to the `modules` section of your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    'nuxt-date-fns'
  ],
  dateFns: {
    // Configuration options (see below)
  }
})
```

## Configuration

You can configure the module via the `dateFns` key in your `nuxt.config.ts`. Here are the available options and their defaults:

```typescript
export default defineNuxtConfig({
  dateFns: {
    /**
     * A prefix to apply to all auto-imported date-fns methods.
     * Default: 'df'
     * Example: 'format' becomes 'dfFormat'
     */
    prefix: 'df',

    /**
     * An array of specific functions you want to auto-import. 
     * If left empty, ALL date-fns functions are registered (Vite will still tree-shake unused ones).
     * Default: []
     */
    methods: ['format', 'parseISO'],

    /**
     * An array of date-fns locales you want to auto-import.
     * Default: []
     */
    locales: ['ptBR', 'es'],

    /**
     * Default locale to be used globally by date-fns.
     * This dynamically generates a Nuxt plugin to set the default options.
     */
    defaultLocale: 'es',

    /**
     * @deprecated Fallback locale is no longer supported with static auto-imports.
     * Please use `defaultLocale` instead.
     */
    fallbackLocale: 'enUS'
  }
})
```

## Usage Examples

Because this module utilizes Nuxt's auto-import feature, you can use `date-fns` functions directly in your components without importing them.

### Basic Formatting
Assuming the default prefix `df` is used:

```vue
<script setup>
const date = new Date()

// 'dfFormat' is automatically imported!
const formattedDate = dfFormat(date, 'EEEE, MMMM do yyyy')
</script>

<template>
  <p>{{ formattedDate }}</p>
</template>
```

### Using Auto-Imported Locales

If you configured `locales: ['ptBR']` in your `nuxt.config.ts`, the `ptBR` object is auto-imported and ready to use without any import statements:

```vue
<script setup>
const date = new Date()
const dateInPortuguese = dfFormat(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
</script>

<template>
  <p>{{ dateInPortuguese }}</p>
</template>
```

### Global Default Locale

If you configure `defaultLocale: 'es'` in your `nuxt.config.ts`, the module will generate a runtime plugin to apply this locale globally to all `date-fns` functions:

```vue
<script setup>
const date = new Date()

// Uses 'es' by default, no need to pass `{ locale: es }`!
const formattedDate = dfFormat(date, "EEEE, d 'de' MMMM 'de' yyyy")
</script>

<template>
  <p>{{ formattedDate }}</p>
</template>
```

*(Note: The `fallbackLocale` option from the old Nuxt 2 module is now deprecated, as static auto-imports eliminate the need for runtime fallback resolution).*

### Vue Reactivity Note

Remember that `date-fns` functions are pure JavaScript utilities. If you are calculating relative time (e.g., `dfFormatDistanceToNow`) and want the string to update automatically as seconds/minutes pass on the screen, you must pair it with a reactive timer (such as `useNow()` from `@vueuse/core`):

```vue
<script setup>
import { useNow } from '@vueuse/core'

const createdAt = new Date('2024-01-01T12:00:00Z')
const now = useNow({ interval: 60000 }) // Updates every minute

// This computed property will recalculate automatically every minute!
const timeAgo = computed(() => dfFormatDistance(createdAt, now.value, { addSuffix: true }))
</script>
```

## Future Plans

- **`@nuxtjs/i18n` Integration**: We plan to introduce a seamless integration with Nuxt i18n. This will include a dedicated wrapper composable (e.g., `useDateFns()`) that automatically detects the current user's locale from Nuxt i18n and injects it into all date formatting functions, providing a fully dynamic, SSR-safe translation experience without manually passing the `{ locale }` object.
