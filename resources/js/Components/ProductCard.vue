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
  let discountAmount = price - discount;
  return Math.round((discountAmount / price) * 100);
};
</script>
<template>
  <div
    class="group rounded bg-white shadow overflow-hidden hover:shadow-lg transition duration-300 ease-in-out relative"
  >
    <span v-if="product.discount_price" class="badge-custom">
      {{ badge ?? "OFF" }}
      <span class="box ml-1 mr-0">
        &nbsp;{{
          discountPercentage(product.price, product.discount_price)
        }}%</span
      ></span
    >
    <span v-else-if="badge" class="badge-custom">{{ badge }}</span>

    <div class="relative overflow-hidden p-2">
      <img
        :src="product.thumbnail ? `/${product.thumbnail}` : '/no-image.png'"
        :alt="product.title"
        class="w-full group-hover:brightness-75 group-hover:scale-110 transition-all duration-300 ease-in-out rounded-lg"
      />
      <div
        class="absolute top-2 -right-12 group-hover:right-0 rounded text-gray-600 bg-white duration-300 ease-in-out"
      >
        <Link
          :href="'/product/' + product.id"
          title="Quick view"
          class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
        >
          <i class="pi pi-eye"></i>
        </Link>
        <a
          href="#"
          title="Add to cart"
          class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
        >
          <i class="pi pi-cart-arrow-down"></i>
        </a>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-center">
        <div class="flex gap-1 text-sm text-yellow-400">
          <span><i class="pi pi-star"></i></span>
          <span><i class="pi pi-star"></i></span>
          <span><i class="pi pi-star"></i></span>
          <span><i class="pi pi-star"></i></span>
          <span><i class="pi pi-star"></i></span>
        </div>
        <div class="text-xs text-gray-500 ml-3">(99)</div>
      </div>
      <Link :href="'/product/' + product.id" :title="product.title">
        <h4
          class="capitalize font-semibold mb-2 px-1 text-gray-800 group-hover:text-primary transition duration-300 ease-in truncate"
        >
          {{ product.title }}
        </h4>
      </Link>
      <div class="flex justify-left items-baseline space-x-3">
        <p class="text-lg font-bold text-red-600 font-roboto">
          ${{ product.discount_price || product.price }}
        </p>
        <p
          v-if="product.discount_price"
          class="font-bold text-gray-400 font-roboto line-through"
        >
          ${{ product.price }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.badge-custom {
  display: inline-block;
  padding: 0.1875rem; /* 3px converted to rem */
  font-size: 0.6875rem; /* 11px converted to rem */
  border-radius: 0 3.125rem 3.125rem 0; /* 50px converted to rem */
  color: #ff0000;
  font-weight: 600;
  line-height: 1.625rem; /* 26px converted to rem */
  position: absolute;
  background: #fff;
  z-index: 1;
  top: 1rem;
  box-shadow: 0.125rem 0.0625rem 0.375rem 0.125rem rgba(0, 0, 0, 0.1),
    0 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.06) !important;
}

.badge-custom .box {
  height: 1.625rem; /* 26px converted to rem */
  width: 1.625rem; /* 26px converted to rem */
  background: #ff0000;
  color: #fff;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
}
</style>
