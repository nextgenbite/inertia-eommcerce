<template>
  <GuestLayout>
    <div class="container mx-auto py-16 px-4 lg:px-8">
      <!-- Success Header -->
      <div class="flex flex-col items-center text-center mb-12 animate-fade-in">
        <div class="rounded-full bg-green-100 p-6 shadow-inner mb-5">
          <i class="pi pi-check-circle text-green-600 text-6xl"></i>
        </div>
        <h1 class="text-4xl font-extrabold text-gray-800 mb-3">Welcome, {{ tenant.company_name }}!</h1>
        <p class="text-lg text-gray-600">Your tenant has been successfully registered.</p>
      </div>

      <!-- Tenant Info Tags -->
      <div class="flex flex-wrap gap-3 justify-center mb-10 text-sm text-gray-700">
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
          <i class="pi pi-hashtag mr-2"></i> ID: {{ tenant.id }}
        </div>
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
          <i class="pi pi-calendar mr-2"></i> Created: {{ formattedDate }}
        </div>
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
          <i class="pi pi-envelope mr-2"></i> Email: {{ tenant.email }}
        </div>
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
          <i class="pi pi-globe mr-2"></i> Domain: {{ tenant.domains || tenant.domain || 'N/A' }}
        </div>
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
          <i class="pi pi-tags mr-2"></i> Plan ID: {{ tenant.plan_id }}
        </div>
      </div>

      <!-- Next Actions -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <p class="text-xl text-gray-800 font-semibold mb-6">Next Steps</p>
        <div class="flex flex-col lg:flex-row gap-4 justify-center">
          <Link v-ripple href="/" class="p-button p-ripple">
            <i class="pi pi-home mr-2"></i>Go to Home
          </Link>
                 <Button
                  icon="pi pi-globe"
                  as="a"
                  label="Go to Your Tenant"
                  :href="`http://${tenant.domain}${
                    central_domain == 'localhost' ? ':8000' : ''
                  }`"
                  target="_blank"
                  rel="noopener"
                  outlined
                />
        </div>
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/Central/GuestLayout.vue';
import { Link } from "@inertiajs/vue3";
import { computed } from 'vue';

const props = defineProps({
  tenant: Object,
  central_domain: String
});

// Format the ISO datetime string
const formattedDate = computed(() => {
  if (!props.tenant?.created_at) return 'N/A';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(props.tenant.created_at));
});
</script>

<style scoped>
.container {
  max-width: 768px;
}
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
