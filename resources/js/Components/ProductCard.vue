<script setup>
import { Link } from "@inertiajs/vue3";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  badge: {
    type: String,
  },
});
const discountPercentage = (price, discount) => {
  if (!price || !discount) return 0;
  return Math.round(((price - discount) / price) * 100);
};
</script>

<template>
  <div
    class="group rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 relative border border-gray-100 overflow-hidden"
  >
    <span
      v-if="product.discount_price"
      class="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold shadow"
    >
      {{ badge ?? "SALE" }}
      <span
        class="ml-1 bg-white text-red-500 rounded-full px-2 py-0.5 font-bold"
      >
        -{{ discountPercentage(product.price, product.discount_price) }}%
      </span>
    </span>
    <span
      v-else-if="badge"
      class="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gray-800 text-white text-xs font-semibold shadow"
    >
      {{ badge }}
    </span>

    <div
      class="relative overflow-hidden bg-white flex items-center justify-center"
    >
      <img
        :src="product.thumbnail ? `/${product.thumbnail}` : '/no-image.png'"
        :alt="product.title"
        class="object-contain transition-transform duration-300 group-hover:scale-105 bg-white p-2"
      />
      <div
        class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Link title="Quick view" :href="'/product/' + product.slug">
          <Button icon="pi pi-eye" severity="secondary" raised rounded size="small" />
        </Link>
        <Button
          icon="pi pi-cart-arrow-down"
          title="Add to cart"
          severity="secondary"
          raised
          rounded
          v-ripple size="small"
        />
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-center mb-2">
        <div class="flex gap-0.5 text-yellow-400 text-sm">
          <i
            v-for="i in 5"
            :key="i"
            class="pi"
            :class="i <= (product.rating ?? 0) ? 'pi-star-fill' : 'pi-star'"
          ></i>
        </div>
        <div class="text-xs text-gray-400 ml-2">
          ({{ product.rating_count ?? 0 }})
        </div>
      </div>
      <Link :href="'/product/' + product.slug" :title="product.title">
        <h4
          class="capitalize font-semibold mb-1 text-gray-900 group-hover:text-primary transition truncate"
        >
          {{ product.title }}
        </h4>
      </Link>
      <div class="flex items-baseline gap-2 mt-1">
        <span class="text-lg font-bold text-red-600">
          {{ formatCurrency(product.discount_price || product.price) }}
        </span>
        <span
          v-if="product.discount_price"
          class="text-sm font-medium text-gray-400 line-through"
        >
          {{ formatCurrency(product.price) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No custom CSS needed, all handled by Tailwind */
</style>
