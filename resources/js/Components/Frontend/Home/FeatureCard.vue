
<script setup>
import BaseIcon from '@/Components/BaseIcon.vue';
const props= defineProps({
        icon: String,
        title: String,
        subtitle: String,
    },)

</script>
<template>
    <div class="flex flex-col items-center bg-white rounded-lg p-6 transition hover:shadow-xl hover:bg-primary/5 duration-200">
            <BaseIcon
                :name="icon"
                size="48px"
                fill="var(--p-primary-color)"
                class="mb-4"
            />
            <h4 class="font-semibold text-lg text-gray-800 mb-1">{{ title }}</h4>
            <p class="text-sm text-gray-500">{{ subtitle }}</p>
        </div>
</template>
