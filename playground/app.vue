<template>
  <div style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto;">
    <h1>Nuxt date-fns Module Playground</h1>

    <div style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 8px;">
      <h3 style="margin-top: 0;">
        Interactive Controls
      </h3>
      <p>Test Vue reactivity with date-fns auto-imports!</p>
      <div style="display: flex; gap: 0.5rem;">
        <button @click="subtractDay">
          - 1 Day
        </button>
        <button @click="subtractMonth">
          - 1 Month
        </button>
        <button @click="resetToToday">
          Reset to Today
        </button>
        <button @click="addMonth">
          + 1 Month
        </button>
        <button @click="addDay">
          + 1 Day
        </button>
      </div>
    </div>

    <section style="margin-top: 2rem;">
      <h2>Basic Format (Global Default 'es')</h2>
      <p>Selected Date is: <strong>{{ formattedToday }}</strong></p>
    </section>

    <section style="margin-top: 2rem;">
      <h2>With Locales</h2>
      <p>Portuguese (Brazil): <strong>{{ formattedTodayPtBR }}</strong></p>
      <p>Spanish: <strong>{{ formattedTodayEs }}</strong></p>
      <p>French: <strong>{{ formattedTodayFr }}</strong></p>
    </section>

    <section style="margin-top: 2rem;">
      <h2>Distance in Words</h2>
      <p>New Year is in: <strong>{{ timeToNewYear }}</strong></p>
      <p>Selected Date is in: <strong>{{ timeToDate }}</strong></p>
    </section>

    <section style="margin-top: 2rem;">
      <h2>Other Functions</h2>
      <p>Is the selected date a weekend? <strong>{{ isWeekendToday ? 'Yes' : 'No' }}</strong></p>
      <p>Parsed ISO string (2024-01-01): <strong>{{ parsedExample }}</strong></p>
    </section>
  </div>
</template>

<script setup lang="ts">
// Use a ref to test Vue reactivity with the auto-imported date-fns methods
const selectedDate = ref(new Date())

// Computed properties automatically re-evaluate when `selectedDate` changes
const formattedToday = computed(() => dfFormat(selectedDate.value, 'EEEE, d \'de\' MMMM \'de\' yyyy'))

const formattedTodayPtBR = computed(() => dfFormat(selectedDate.value, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: ptBR }))
const formattedTodayEs = computed(() => dfFormat(selectedDate.value, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es }))
const formattedTodayFr = computed(() => dfFormat(selectedDate.value, 'EEEE, d MMMM yyyy', { locale: fr }))

const nextYear = computed(() => new Date(selectedDate.value.getFullYear() + 1, 0, 1))
const timeToNewYear = computed(() => dfFormatDistanceToNow(nextYear.value, { addSuffix: true }))
const timeToDate = computed(() => dfFormatDistanceToNow(selectedDate.value, { addSuffix: true }))

const isWeekendToday = computed(() => dfIsWeekend(selectedDate.value))

// Static example
const parsedExample = dfFormat(dfParseISO('2024-01-01T12:00:00Z'), 'MMMM do, yyyy')

// Methods to mutate the reactive date using date-fns utilities
function addDay() {
  selectedDate.value = dfAddDays(selectedDate.value, 1)
}

function subtractDay() {
  selectedDate.value = dfSubDays(selectedDate.value, 1)
}

function addMonth() {
  selectedDate.value = dfAddMonths(selectedDate.value, 1)
}

function subtractMonth() {
  selectedDate.value = dfSubMonths(selectedDate.value, 1)
}

function resetToToday() {
  selectedDate.value = new Date()
}
</script>
