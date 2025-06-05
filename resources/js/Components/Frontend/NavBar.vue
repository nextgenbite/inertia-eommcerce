<template>
  <nav class="flex space-x-6 text-sm font-medium text-gray-700">
    <Link href="/" class="hover:text-primary">Home</Link>
    <Link href="/about" class="hover:text-primary">About</Link>
    <Link href="/services" class="hover:text-primary">Services</Link>
    <Link href="/portfolio" class="hover:text-primary">Portfolio</Link>
    <Link href="/contact" class="hover:text-primary">Contact</Link>
  </nav>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
