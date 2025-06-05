<template>
  <default-layout>

    <!-- ----  Hero ----- -->
  <hero-section/>
    <!-- ---- End Hero ----- -->
    <!-- ---- Start feature ----- -->

   <FeaturesSection />
    <!-- ---- End feature ----- -->

    <!-- ---- Start Flash Sale  ----- -->
    <flash-sale-section
    :flashSale="flashSaleProducts"
  />


    <!-- ---- End Flash Sale  ----- -->
    <!-- ---- Start Categories  ----- -->
 <CategoriesSection :categories="$page.props.categories" />
    <!-- ---- End Categories  ----- -->

    <!-- ---- Start Top Products  ----- -->

    <TopProductsSection/>

    <!-- ---- End Top Products  ----- -->
    <!-- ---- Start Top New Arrival  ----- -->

<TopArrivalsSection/>

    <!-- ---- End Top New Arrival  ----- -->

    <!-- ---- Start Brand  ----- -->
    <div class="container card">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase">
          Top Brands
        </h2>
        <a href="#" class="text-primary font-bold text-lg"
          >View All <span class="pi pi-chevron-right"></span
        ></a>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-6 divide-x-2 divide-primary-100 ">
        <!-- ---- Start Single Brand  ----- -->
        <a
            :title="category.title"
            href="#"
          v-for="category in $page.props.categories.slice(0, 6)"
          :key="category.id"
          class="p-4 group rounded-lg transition duration-300 ease-in-out text-center mb-2"
        >
          <div
            class="p-1 mb-2 w-24 h-24 flex items-center justify-center mx-auto group-hover:scale-95"
          >
            <img
              :src="category.thumbnail || '/no-image.png'"
              :alt="category.title"
              class="w-full h-full object-cover rounded-full group-hover:brightness-75 transition-all duration-300 ease-in-out"
            />
          </div>
          <div
            class="w-full text-center font-roboto font-semibold capitalize"
          >
            {{ category.title }}
          </div>
        </a>
        <!-- ---- End Single Brand  ----- -->
      </div>
    </div>
    <!-- ---- End Brand  ----- -->
  </default-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
import ProductCard from "@/Components/ProductCard.vue";
import HeroSection from "@/Components/Frontend/Home/HeroSection.vue";
import FeaturesSection from "@/Components/Frontend/Home/FeaturesSection.vue";
import FlashSaleSection from "@/Components/Frontend/Home/FlashSaleSection.vue";
import CategoriesSection from "@/Components/Frontend/Home/CategoriesSection.vue";
import TopProductsSection from "@/Components/Frontend/Home/TopProductsSection.vue";
import TopArrivalsSection from "@/Components/Frontend/Home/TopArrivalsSection.vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const flashSaleProducts = (props.products || []).slice(0, 10);





const bgColors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-orange-200",
];

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
.thumb {
  max-height: 100%;
  width: 100%;
  object-fit: cover;
}



/* Hero slider responsiveness */

.swiper-button-next,
.swiper-button-prev {
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  color: var(--primary-color);
  background: linear-gradient(145deg, #e2e8ec, #ffffff);
  /* box-shadow:  .5rem .5rem 1.5rem #D1D9E6, -0.5rem -.5rem 1.5rem #ffffff; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: opacity 0.3s;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 1.5rem;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  opacity: 0.8;
}

.swiper-pagination-bullet {
  background: #ffffff;
  opacity: 0.5;
  transition: opacity 0.3s;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.swiper-pagination-bullet:hover {
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: var(--primary-color);
  border-radius: 0.3rem;
  width: 1.5rem;
}

@media (min-width: 320px) {
  .swiper-button-next,
  .swiper-button-prev {
    width: 3rem;
    height: 3rem;
  }
}
</style>
