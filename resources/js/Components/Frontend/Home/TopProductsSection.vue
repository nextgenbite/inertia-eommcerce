<template>
       <div class="container pb-16">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
        Top Products
        <hr
          class="lg:w-1/4 min-h-0.5 my-4 bg-gray-300 border-0 rounded lg:my-1 dark:bg-gray-700"
        />
      </h2>
          <SwiperSlider :items="$page.props.products" :swiperOptions="productOptions">
      <template #default="{ item }">
        <ProductCard :product="item" badge='Top' />
      </template>
    </SwiperSlider>
    </div>
</template>
<script setup>
import SwiperSlider from '@/Components/Shared/SwiperSlider.vue';
import ProductCard from '@/Components/ProductCard.vue';
const productOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  }
};
</script>
