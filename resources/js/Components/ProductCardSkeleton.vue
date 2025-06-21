<template>
  <div
    class="rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden"
  >
    <!-- Image Skeleton -->
    <div class="relative h-48 bg-white flex items-center justify-center">
      <Skeleton width="100%" height="100%" class="!rounded-none" />
    </div>

    <!-- Content Skeleton -->
    <div class="p-4 space-y-2">
      <!-- Rating -->
      <div class="flex items-center gap-2">
        <Skeleton width="60px" height="14px" />
        <Skeleton width="30px" height="12px" />
      </div>

      <!-- Title -->
      <Skeleton width="80%" height="16px" />

      <!-- Price -->
      <div class="flex items-baseline gap-2 mt-2">
        <Skeleton width="50px" height="20px" />
        <Skeleton width="40px" height="16px" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton'
</script>
