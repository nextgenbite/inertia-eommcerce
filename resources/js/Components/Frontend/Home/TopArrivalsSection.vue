<template>
      <div class="container pb-16">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
        Top New Arrival
        <hr
          class="lg:w-1/4 min-h-0.5 my-4 bg-gray-300 border-0 rounded lg:my-1 dark:bg-gray-700"
        />
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6">
        <template v-for="product in $page.props.products" :key="product.id">
          <!-- ---- Start Single Product  ----- -->
          <product-card :product="product" />
          <!-- ---- End Single Product  ----- -->
        </template>
      </div>
    </div>
</template>

<script setup>
import ProductCard from '@/Components/ProductCard.vue';

</script>

<style>

</style>
