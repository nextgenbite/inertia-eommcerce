<template>
       <div class="container  p-4 lg:p-6">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
        {{promotion.title}}
      <div class="lg:my-1">
          <div class="lg:w-1/4 h-1 bg-gray-200 rounded-md hover:bg-gray-300">
            <div class="h-1 bg-primary rounded-md hover:bg-primary-600" style="width: 50%"></div>
          </div>
      </div>
      </h2>

          <SwiperSlider :items="promotion.products" :swiperOptions="productOptions">
      <template #default="{ item }">
        <ProductCard :product="item" badge='Top' />
      </template>
    </SwiperSlider>
    </div>
</template>
<script setup>
import SwiperSlider from '@/Components/Shared/SwiperSlider.vue';
import ProductCard from '@/Components/ProductCard.vue';
const props = defineProps({
    promotion: {type:Object, required:true}

    })
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
