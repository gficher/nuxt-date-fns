<template>
  <div>
    <div id="format">
      {{ formattedDate }}
    </div>
    <div id="locale">
      {{ ptBR.code }}
    </div>
  </div>
</template>

<script setup>
const date = dfParseISO('2024-01-01T12:00:00Z')
const formattedDate = dfFormat(date, 'EEEE')
</script>
