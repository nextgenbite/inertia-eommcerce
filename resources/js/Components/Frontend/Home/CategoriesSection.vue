<template>
  <div class="container p-4 lg:p-6 bg-white/70">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase">
        Categories
      </h2>
      <Link href="/" class="text-primary font-bold text-lg"
        >View All <span class="pi pi-chevron-right"></span
      ></Link>
    </div>
    <SwiperSlider :items="categories" :swiperOptions="productOptions">
      <template #default="{ item }">
        <!-- ---- Start Single Category  ----- -->
        <Link :title="item.title" :href="`/shop?categories[]=${item.id}`">
          <div
            class="group rounded transition duration-300 ease-in-out text-center"
          >
            <!-- color bgColors -->
            <!-- <div class="rounded-full shadow-md p-4 mb-2 flex items-center justify-center  mx-auto overflow-hidden  group-hover:ring-4 group-hover:ring-primary group-hover:scale-95" :class="bgColors[index % bgColors.length]"> -->
            <div
              class="rounded-full p-3 mb-2 h-20 w-20 flex items-center justify-center mx-auto overflow-hidden group-hover:ring-4 group-hover:ring-primary-100 group-hover:scale-95 white-box"
            >
              <img
                :src="item.thumbnail || '/no-image.png'"
                :alt="item.title"
                class="w-full h-full object-cover rounded-full group-hover:brightness-75 transition-all duration-300 ease-in-out"
              />
            </div>
            <p class="w-full text-center font-roboto font-semibold capitalize">
              {{ item.title }}
            </p>
          </div>
        </Link>
        <!-- ---- End Single Category  ----- -->
      </template>
    </SwiperSlider>
    <div class="grid grid-cols-2 lg:grid-cols-8 gap-2 lg:gap-6"></div>
  </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import SwiperSlider from "@/Components/Shared/SwiperSlider.vue";
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const productOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 6 },
    1024: { slidesPerView: 8 },
  },
};
</script>

<style scoped>
.white-box {
  background: var(--gradient-box-w);
  box-shadow: var(--shadow-white-3);
}
.white-box:hover {
  box-shadow: 0.125rem 0.0625rem 0.375rem 0.125rem rgba(0, 0, 0, 0.1),
    0 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.06) !important;
}
</style>
