<template>
  <default-layout>
             <MetaTags :title="meta?.title" :description="meta?.description" :og_image="meta?.og_image" />

    <!-- ----  Hero ----- -->
    <hero-section :categories="$page.props.categories" />
    <!-- ---- End Hero ----- -->
    <!-- ---- Start feature ----- -->
    <FeaturesSection />
    <!-- ---- End feature ----- -->

    <!-- ---- Start Flash Sale  ----- -->
    <FlashSaleSection
      v-if="$page.props.flashSales && $page.props.flashSales.products.length"
      :flashSale="$page.props.flashSales"
    />
    <!-- ---- Start Flash Sale  ----- -->

    <!-- ---- End Flash Sale  ----- -->
    <!-- ---- Start Categories  ----- -->
    <CategoriesSection :categories="$page.props.categories" />
    <!-- ---- End Categories  ----- -->

    <!-- ---- Start Top Products  ----- -->
    <template v-if="$page.props.promotions && $page.props.promotions.length">
      <PromotionsSection
        v-for="promotion in $page.props.promotions"
        :key="promotion"
        :promotion="promotion"
      />
    </template>
    <!-- <TopProductsSection /> -->

    <!-- ---- End Top Products  ----- -->
    <!-- ---- Start Top New Arrival  ----- -->

    <TopArrivalsSection />

    <!-- ---- End Top New Arrival  ----- -->

    <!-- ---- Start Brand  ----- -->
    <section class="container p-4 lg:p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">
          Top Brands
        </h2>
        <a
          href="#"
          class="inline-flex items-center text-primary-600 hover:underline font-medium transition"
        >
          View All
          <svg
            class="ml-1 w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        <a
          v-for="brand in $page.props.brands"
          :key="brand.id"
          :title="brand.title"
          href="#"
          class="group flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-4"
        >
          <div
            class="w-20 h-20 flex items-center justify-center mb-3 rounded-full bg-gray-50 overflow-hidden group-hover:scale-105 transition"
          >
            <img
              :src="brand.thumbnail || '/no-image.png'"
              :alt="brand.title"
              class="w-full h-full object-cover"
            />
          </div>
          <span
            class="mt-1 text-base font-semibold text-gray-800 capitalize group-hover:text-primary-600 transition"
          >
            {{ brand.title }}
          </span>
        </a>
      </div>
    </section>
    <!-- ---- End Brand  ----- -->
  </default-layout>
</template>

<script setup>
import { ref } from "vue";
import MetaTags from "@/Components/MetaTags.vue";
import DefaultLayout from "@/Layouts/Default.vue";
import HeroSection from "@/Components/Frontend/Home/HeroSection.vue";
import FeaturesSection from "@/Components/Frontend/Home/FeaturesSection.vue";
import FlashSaleSection from "@/Components/Frontend/Home/FlashSaleSection.vue";
import CategoriesSection from "@/Components/Frontend/Home/CategoriesSection.vue";
import PromotionsSection from "@/Components/Frontend/Home/PromotionsSection.vue";
import TopArrivalsSection from "@/Components/Frontend/Home/TopArrivalsSection.vue";

// const FrontendMarquee = defineAsyncComponent(() =>
//   import("@/Components/marquee.vue")
// );

const props = defineProps({

  categories: {
    type: Array,
    default: () => [],
  },
  settings: {
    type: Object,
  },
});

const meta = {
  title: props.settings?.title || "IT Software Solutions for Businesses",
  description:
    props.settings?.description ||
    "We provide innovative IT solutions for businesses, including custom software development, cloud services, and more.",
  og_image: props.settings?.og_image,
};
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
