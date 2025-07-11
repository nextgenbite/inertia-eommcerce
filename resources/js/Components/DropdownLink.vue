<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    href: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Link
        :href="href"
        class="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-primary-100 hover:text-primary-700 focus:outline-none focus:bg-primary-200 focus:text-primary-800 rounded transition-colors duration-150 ease-in-out cursor-pointer"
        tabindex="0"
        @keydown.enter="$el.click()"
        @keydown.space.prevent="$el.click()"
    >
        <slot />
    </Link>
</template>
