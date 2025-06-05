<template>
  <Swiper
    v-bind="swiperOptions"
    class="w-full"
  >
    <SwiperSlide v-for="(item, index) in items" :key="index">
      <slot :item="item" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  swiperOptions: {
    type: Object,
    default: () => ({
      modules: [Autoplay, Pagination, Navigation],
      spaceBetween: 16,
      slidesPerView: 1,
      pagination: { clickable: true },
      navigation: true,
      autoplay: { delay: 3000 },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      },
    })
  }
});
</script>
