<template>
  <!-- ---- Start Header ----- -->
  <Toast />
  <Header />
  <!-- ---- End Header ----- -->
  <slot />
  <!-- ---- Start Footer ----- -->
  <Footer />
  <!-- ---- End Footer ----- -->
</template>

<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores/appStore";
import { useCartStore } from "@/stores/cartStore";

import Header from "@/Components/Frontend/Header.vue";
import Footer from "@/Components/Frontend/Footer.vue";

const store = useAppStore();
const cartStore = useCartStore();

onMounted(() => {
  store.loadSettings();
  store.loadCategories();
  cartStore.loadCart();
});
</script>

<style>
</style>
