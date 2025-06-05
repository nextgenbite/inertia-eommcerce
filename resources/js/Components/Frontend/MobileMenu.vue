<template>
  <div class="md:hidden bg-white shadow-md">
    <div class="flex flex-col space-y-4 p-4 text-gray-700 text-base font-medium">
      <Link href="/" @click="close" class="hover:text-primary">Home</Link>
      <Link href="/about" @click="close" class="hover:text-primary">About</Link>
      <Link href="/services" @click="close" class="hover:text-primary">Services</Link>
      <Link href="/portfolio" @click="close" class="hover:text-primary">Portfolio</Link>
      <Link href="/contact" @click="close" class="hover:text-primary">Contact</Link>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
const emit = defineEmits(['close']);
const close = () => emit('close');
</script>
