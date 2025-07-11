<template>
  <li v-if="item.children">
    <div
      v-ripple
      v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-slidedown',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-slideup',
      }"
      class="flex items-center justify-between p-2 rounded cursor-pointer text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 transition-colors duration-150"
    >
      <div class="flex items-center gap-2">
        <i :class="item.icon"></i>
        <span class="font-medium">{{ item.label }}</span>
      </div>
      <template v-if="item.badge">
        <span
          class="ml-auto bg-primary text-primary-contrast rounded-full text-xs flex items-center justify-center"
          style="min-width: 1.5rem; height: 1.5rem"
        >
          {{ item.badge }}
        </span>
      </template>
      <i v-if="item.children" class="pi pi-chevron-down ml-auto"></i>
    </div>

    <ul
      v-if="item.children"
      class="list-none py-0 pl-4 pr-0 m-0 hidden  animate-duration-300  overflow-hidden transition-all duration-[400ms] ease-in-out"
    >
      <MenuItem v-for="(child, i) in item.children" :key="i" :item="child" />
    </ul>
  </li>
  <li v-else>
    <Link
      v-ripple
      :href="item.route"
      class="flex items-center justify-between p-4 rounded cursor-pointer text-surface-700 hover:bg-primary-200 dark:text-surface-0 dark:hover:bg-surface-800 transition-colors duration-150"
    >
      <div class="flex items-center gap-2">
        <i :class="item.icon"></i>
        <span class="font-medium">{{ item.label }}</span>
      </div>
      <template v-if="item.badge">
        <span
          class="ml-auto bg-primary text-primary-contrast rounded-full text-xs flex items-center justify-center"
          style="min-width: 1.5rem; height: 1.5rem"
        >
          {{ item.badge }}
        </span>
      </template>
    </Link>
  </li>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
// Name the component to make it self-registerable
defineOptions({ name: "MenuItem" });

// Import itself for recursion
import MenuItem from "./MenuItem.vue";

defineProps({
  item: Object,
});
</script>
