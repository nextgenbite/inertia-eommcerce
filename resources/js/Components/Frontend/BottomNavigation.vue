<template>
  <transition name="fade-slide">
    <div
      v-show="showNav"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md mx-auto bg-white/50   backdrop-blur-sm border border-gray-200 shadow-lg rounded-2xl px-6 py-2 flex justify-between items-center lg:hidden transition-all duration-300"
    >
      <Link
        href="/"
        title="Home"
        class="flex flex-col items-center text-sm text-gray-700 hover:text-primary transition"
      >
        <i class="pi pi-home text-xl mb-1"></i>
        <span class="text-[11px] font-medium">Home</span>
      </Link>

      <Link
        href="/search"
        title="Search"
        class="flex flex-col items-center text-sm text-gray-700 hover:text-primary transition"
      >
        <i class="pi pi-search text-xl mb-1"></i>
        <span class="text-[11px] font-medium">Search</span>
      </Link>

      <Link
        href="/wishlist"
        title="Wishlist"
        class="flex flex-col items-center text-sm text-gray-700 hover:text-primary transition"
      >
        <i class="pi pi-heart text-xl mb-1"></i>
        <span class="text-[11px] font-medium">Wishlist</span>
      </Link>

      <Link
        href="/checkout"
        title="Cart"
        class="relative flex flex-col items-center text-sm text-gray-700 hover:text-primary transition"
      >
        <span
          class="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm"
        >
          {{cartStore.cartCount}}
        </span>
        <i class="pi pi-cart-plus text-xl mb-1"></i>
        <span class="text-[11px] font-medium">Cart</span>
      </Link>

      <Link
        href="/account"
        title="Account"
        class="flex flex-col items-center text-sm text-gray-700 hover:text-primary transition"
      >
        <i class="pi pi-user text-xl mb-1"></i>
        <span class="text-[11px] font-medium">Account</span>
      </Link>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch  } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useCartStore } from "@/stores/cartStore";
import { useWindowScroll } from '@vueuse/core'
const cartStore = useCartStore();

const showNav = ref(true)
const lastScrollY = ref(0)

const { y: scrollY } = useWindowScroll()

watch(scrollY, (currentScroll) => {
  // Avoid micro scrolls
  if (Math.abs(currentScroll - lastScrollY.value) < 10) return

  // Show nav if scrolling up OR near the top of page
  showNav.value = currentScroll < lastScrollY.value || currentScroll < 80

  lastScrollY.value = currentScroll
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
