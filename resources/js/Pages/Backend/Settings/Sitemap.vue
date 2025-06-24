<template>

  <Head title="Sitemap" />
  <app-layout>
    <div class="container">
      <div class="w-3/4 mx-auto ">
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 class="text-2xl font-bold mb-4">Sitemap Genarate</h2>
        <Button asChild v-slot="slotProps" outlined>
    <Link href="/admin/update-sitemap" :class="slotProps.class">Genarate</Link>
</Button>
        </div>

      </div>
    </div>
  </app-layout>
</template>

<script setup>
import AppLayout from "@/sakai/layout/AppLayout.vue";
import { Link, Head } from "@inertiajs/vue3";
import { loadToast } from "@/composables/loadToast";
loadToast();


</script>
