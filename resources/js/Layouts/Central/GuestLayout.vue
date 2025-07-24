<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { Head, Link } from "@inertiajs/vue3";
import Header from "@/Components/Central/Header.vue";
import Footer from "@/Components/Central/Footer.vue";
</script>

<template>
  <Head>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </Head>
  <div>
    <!-- navbar -->
    <Header />
    <slot />

    <!-- footer -->
    <Footer />
  </div>
</template>
