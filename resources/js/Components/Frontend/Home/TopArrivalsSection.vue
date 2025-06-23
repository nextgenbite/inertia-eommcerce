<template>
  <div class="container p-4 lg:p-6">
    <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
      Top New Arrival
      <hr
        class="lg:w-1/4 min-h-0.5 my-4 bg-gray-300 border-0 rounded lg:my-1 dark:bg-gray-700"
      />
    </h2>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6">
      <ProductCard
        v-for="product in allProducts"
        :key="product.id"
        :product="product"
        class="transition-transform transform hover:-translate-y-2 hover:shadow-lg"
      />


    </div>

    <!-- Load More Spinner (OUTSIDE grid!) -->
    <div ref="loadMoreRef" class="text-center mt-6" v-if="hasMore()">
 <div  class=" grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6 transition-opacity duration-300 opacity-100">

 <ProductCardSkeleton v-for="n in 5" :key="'skeleton-' + n" />
</div>
    </div>

    <div v-else class="text-center text-sm text-gray-500 mt-6">
      You've reached the end.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useIntersectionObserver } from '@vueuse/core'
import { router, usePage } from '@inertiajs/vue3'
import ProductCard from '@/Components/ProductCard.vue'
import ProductCardSkeleton from '@/Components/ProductCardSkeleton.vue'

const products = usePage().props.products

const allProducts = ref([...products.data])
const currentPage = ref(products.current_page)
const totalPages = ref(products.last_page)
const loading = ref(false)
const loadMoreRef = ref(null)

const hasMore = () => currentPage.value < totalPages.value

const loadMore = () => {
  if (loading.value || !hasMore()) return

  loading.value = true

  router.get(
    route('home'), // Make sure this is the correct named route for product list
    { page: currentPage.value + 1 },
    {
      preserveScroll: true,
      preserveState: true,
      only: ['products'],
      onSuccess: (page) => {
        const newProducts = page.props.products.data
        allProducts.value.push(...newProducts)
        currentPage.value = page.props.products.current_page
        totalPages.value = page.props.products.last_page
      },
      onFinish: () => {
        loading.value = false
      }
    }
  )
}

// 📌 Observe when spinner appears in viewport
useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) loadMore()
  },
  {
    threshold: 0.1, // or 0
  }
)
</script>
