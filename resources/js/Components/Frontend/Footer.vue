<template>
    <!-- ---- Start Footer  ----- -->
    <footer class="bg-primary-950 pt-16 pb-12 border-t border-gray-100">
      <div class="container">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <img
              :src="`/${$page.props.settings.logo}` || 'no-image.png'"
              :alt="$page.props.settings.app_name"
              class="h-12"
            />
            <p class="text-white text-base font-roboto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              consectetur adipiscing.
            </p>
            <div class="flex space-x-5">
              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-facebook-f"></i>
              </a>

              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-twitter"></i>
              </a>

              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-instagram"></i>
              </a>

              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-linkedin-in"></i>
              </a>
            </div>
          </div>

          <!-- ---- Footer link   ----- -->

          <div class="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
            <div class="grid grid-cols-2 gap-8">
              <div>
                <h3
                  class="text-sm lg:text-base font-semibold text-white tracking-wide uppercase"
                >
                  Quick links
                </h3>
                <div class="mt-4 space-y-2">
                  <a
                    title="Flash Deals"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Flash Deals
                  </a>
                  <a
                    title="Featured Products"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Featured Products
                  </a>
                  <a
                    title="Best Selling Products"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Best Selling Products
                  </a>
                  <a
                    title=" Truck Order"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Truck Order
                  </a>
                </div>
              </div>

              <div class="">
                <h3
                  class="text-sm lg:text-base font-semibold text-white tracking-wide uppercase"
                >
                  Other
                </h3>
                <div class="mt-4 space-y-2">
                  <a
                    title="About Us"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    About Us
                  </a>
                  <a
                    title="Terms And Conditions"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Terms And Conditions
                  </a>
                  <a
                    title="title"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Privacy Policy
                  </a>
                  <a
                    title="title"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Return Policy
                  </a>
                  <a
                    title="title"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            <!-- <div class="md:grid md:grid-cols-2 md:gap-8 ">
          <div>
               <h3 class="text-sm font-semibold text-gray-400 tracking-wide uppercase " > Company </h3>
               <div class="mt-4 space-y-4 ">
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         About
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Blog
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Jobs
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Service
                    </a>
               </div>
          </div>



          <div class="mt-12 md:mt-0">
               <h3 class="text-sm font-semibold text-gray-400 tracking-wide uppercase " > Legal </h3>
               <div class="mt-4 space-y-4 ">
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Claim
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Privacy
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Policy
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                        Terms
                    </a>
               </div>
          </div>


     </div> -->
          </div>
          <!-- ----End Footer link   ----- -->
        </div>
      </div>
    </footer>
    <!-- ---- End Footer   ----- -->

    <!-- ---- Copyright  ----- -->
    <div class="bg-gray-800 py-4">
      <div class="container flex items-center justify-between">
        <p class="text-white font-semibold">© Nextgenbite 2024</p>

        <div>
          <img alt="image" src="/images/methods.png" class="h-5" />
        </div>
      </div>
    </div>

    <!-- ---- End Copyright   ----- -->
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>
