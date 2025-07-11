<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <h3 class="text-lg font-medium mb-3 text-gray-800">{{ title }}</h3>
    <div class="text-gray-700 space-y-1 text-sm">
      <p v-if="address.name"><strong>Name:</strong> {{ address.name }}</p>
      <p v-if="address.email"><strong>Email:</strong> {{ address.email }}</p>
      <p v-if="address.phone"><strong>Phone:</strong> {{ address.phone }}</p>
      <p v-if="address.address"><strong>Address:</strong> {{ fullAddress }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  address: { type: Object, default: () => ({}) }
});

const fullAddress = computed(() => {
  const parts = [
    props.address.address,
    props.address.city,
    props.address.state,
    props.address.postal_code,
    props.address.country
  ].filter(Boolean);
  return parts.join(', ');
});
</script>
