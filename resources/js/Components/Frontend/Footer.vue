<template>
  <!-- Footer -->
  <footer class="bg-primary-800 text-white border-t border-gray-700">
    <div class="container mx-auto px-4 py-16 grid gap-12 lg:grid-cols-3">
      <!-- Logo + Description -->
      <div>
        <img
          :src="`/${$page.props.settings.logo}` || 'no-image.png'"
          :alt="$page.props.settings.app_name"
          class="h-12 mb-4"
        />
        <p class="text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida nibh vel velit auctor aliquet.
        </p>

        <!-- Social Icons -->
        <div class="mt-6 flex space-x-4">
          <a href="#" aria-label="Facebook" class="hover:text-primary-300">
            <i class="pi pi-facebook-f text-xl"></i>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-primary-300">
            <i class="pi pi-twitter text-xl"></i>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-primary-300">
            <i class="pi pi-instagram text-xl"></i>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-primary-300">
            <i class="pi pi-linkedin text-xl"></i>
          </a>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="grid grid-cols-2 gap-8 lg:col-span-2">
        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold uppercase tracking-wide mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-gray-300">Flash Deals</a></li>
            <li><a href="#" class="hover:text-gray-300">Featured Products</a></li>
            <li><a href="#" class="hover:text-gray-300">Best Selling Products</a></li>
            <li><a href="#" class="hover:text-gray-300">Truck Order</a></li>
          </ul>
        </div>

        <!-- Other Links -->
        <div>
          <h4 class="text-lg font-semibold uppercase tracking-wide mb-4">Support</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-gray-300">About Us</a></li>
            <li><a href="#" class="hover:text-gray-300">Terms & Conditions</a></li>
            <li><a href="#" class="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-gray-300">Return Policy</a></li>
            <li><a href="#" class="hover:text-gray-300">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="bg-gray-800 border-t border-gray-700 py-4">
      <div class="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-sm">
        <p>© {{ new Date().getFullYear() }} Nextgenbite. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
