<template>
     <div class="container">
      <div
        class="grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center border border-gray-200 divide-y-2 lg:divide-x-2 divide-gray-200 divide-double shadow shadow-primary/20"
      >
        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 transition text-center hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
          <BaseIcon
            customClass="mx-auto"
            name="truck"
            size="50px"
            fill="var(--p-primary-color)"
          />

          <h4 class="font-semibold capitalize lg:text-lg">
            Fast Delivery all across the country
          </h4>
        </div>
        <!-- ----End  Single Features  ----- -->

        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 text-center gap-3 transition hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
          <BaseIcon
            customClass="mx-auto"
            name="money"
            size="50px"
            fill="var(--p-primary-color)"
          />
          <div>
            <h4 class="font-semibold capitalize lg:text-lg">Safe Payment</h4>
          </div>
        </div>
        <!-- ----End  Single Features  ----- -->

        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 text-center transition hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
          <BaseIcon
            customClass="mx-auto"
            name="money_return"
            size="50px"
            fill="var(--p-primary-color)"
          />

          <div>
            <h4 class="font-medium capitalize text-sm lg:text-lg">
              7 Days Money Return
            </h4>
          </div>
        </div>
        <!-- ----End  Single Features  ----- -->
        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 text-center transition hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
          <BaseIcon
            customClass="mx-auto"
            name="shield"
            size="50px"
            fill="var(--p-primary-color)"
          />
          <div>
            <h4 class="font-medium capitalize text-sm lg:text-lg">
              100% Authentic Products
            </h4>
          </div>
        </div>
        <!-- ----End  Single Features  ----- -->
      </div>
    </div>
</template>
<script setup>
import BaseIcon from '@/Components/BaseIcon.vue';
</script>
