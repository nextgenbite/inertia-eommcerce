<!--
  SummaryList.vue
  Description: Displays a vertical list of key-value financial or status info.
  Props:
    - items (Array): Each object should have `label`, `value`, and optional `bold` (Boolean).
-->

<template>
  <ul class="divide-y divide-gray-200">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="py-2 flex justify-between text-sm"
    >
      <!-- Label column -->
      <span :class="item.bold ? 'font-bold text-base text-gray-800' : 'text-gray-600'">
        {{ item.label }}
      </span>

      <!-- Value column -->
      <span :class="item.bold ? 'font-bold text-base text-gray-900' : 'text-gray-800'">
        {{ item.value }}
      </span>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
/* Subtle hover or interaction styles can be added later */
</style>
