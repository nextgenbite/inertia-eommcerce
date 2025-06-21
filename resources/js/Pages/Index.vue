<template>
  <default-layout>

    <!-- ----  Hero ----- -->
  <hero-section :categories="$page.props.categories"/>
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
<!-- <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Products</h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="product in allProducts"
        :key="product.id"
        class="border p-2 rounded"
      >
        <img
          :src="product.thumbnail"
          alt=""
          class="w-full h-40 object-cover mb-2"
        />
        <h3 class="font-semibold">{{ product.title }}</h3>
        <p class="text-gray-600">${{ product.price }}</p>
      </div>
    </div>

    <div
      ref="loadMoreRef"
      class="text-center mt-6"
      v-if="hasMore && !loading"
    >
      <ProgressSpinner style="width: 40px; height: 40px" />
    </div>

    <div v-if="!hasMore" class="text-center text-sm text-gray-500 mt-6">
      You've reached the end.
    </div>
  </div> -->
    <!-- ---- Start Brand  ----- -->
    <section class="container p-4 lg:p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Top Brands</h2>
        <a href="#" class="inline-flex items-center text-primary-600 hover:underline font-medium transition">
          View All
          <svg class="ml-1 w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <a
          v-for="category in $page.props.categories.slice(0, 6)"
          :key="category.id"
          :title="category.title"
          href="#"
          class="group flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-4"
        >
          <div class="w-20 h-20 flex items-center justify-center mb-3 rounded-full bg-gray-50 overflow-hidden group-hover:scale-105 transition">
            <img
              :src="category.thumbnail || '/no-image.png'"
              :alt="category.title"
              class="w-full h-full object-cover"
            />
          </div>
          <span class="mt-1 text-base font-semibold text-gray-800 capitalize group-hover:text-primary-600 transition">
            {{ category.title }}
          </span>
        </a>
      </div>
    </section>
    <!-- ---- End Brand  ----- -->
  </default-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useIntersectionObserver } from '@vueuse/core'
import { router } from '@inertiajs/vue3'
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
  pagination: {
    type: Object,
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



const allProducts = ref([...props.pagination.data])
const currentPage = ref(props.pagination.current_page)
const totalPages = ref(props.pagination.last_page)
const loading = ref(false)
const hasMore = ref(currentPage.value < totalPages.value)
const loadMoreRef = ref(null)

const loadMore = () => {
  if (loading.value || !hasMore.value) return
  loading.value = true

  router.get(
    route('home'),
    { page: currentPage.value + 1 },
    {
      preserveScroll: true,
      preserveState: true,
      only: ['pagination'],
      onSuccess: (page) => {
        const newProducts = page.props.pagination.data
        allProducts.value.push(...newProducts)
        currentPage.value = page.props.pagination.current_page
        hasMore.value = currentPage.value < totalPages.value
      },
      onFinish: () => {
        loading.value = false
      }
    }
  )
}

// 🔍 VueUse Intersection Observer
useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadMore()
    }
  },
  {
    threshold: 1.0
  }
)
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
