<script setup>
import { Link, Head } from "@inertiajs/vue3";
import FloatingConfigurator from '@/sakai/components/FloatingConfigurator.vue';
    const props = defineProps({
    code: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    });
</script>

<template>
    <Head :title="props.code.toString()" />
    <!-- <FloatingConfigurator /> -->
    <div class="flex items-center justify-center min-h-screen overflow-hidden my-16 container mx-auto">
        <div class="flex flex-col items-center justify-center">
         <img
                v-if="$page.props.settings?.favicon"
                :src="'/' + $page.props.settings?.favicon"
                :alt="$page.props.settings?.app_name"
                class="h-8 mr-0 lg:mr-2"
              />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                    <span class="text-primary font-bold text-3xl">{{ props.code }}</span>
                    <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">{{ props.message }}</h1>
                    <div class="text-surface-600 dark:text-surface-200 mb-8">Requested resource is not available.</div>
                    <Link href="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                        <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-table !text-2xl"></i>
                        </span>
                        <span class="ml-6 flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">Frequently Asked Questions</span>
                            <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Ultricies mi quis hendrerit dolor.</span>
                        </span>
                    </Link>
                    <Link href="/" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                        <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-question-circle !text-2xl"></i>
                        </span>
                        <span class="ml-6 flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Solution Center</span>
                            <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Phasellus faucibus scelerisque eleifend.</span>
                        </span>
                    </Link>
                    <Link href="/" class="w-full flex items-center mb-8 py-8 border-surface-300 dark:border-surface-500 border-b">
                        <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                            <i class="pi pi-fw pi-unlock !text-2xl"></i>
                        </span>
                        <span class="ml-6 flex flex-col">
                            <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0">Permission Manager</span>
                            <span class="text-surface-600 dark:text-surface-200 lg:text-xl">Accumsan in nisl nisi scelerisque</span>
                        </span>
                    </Link>
<Button onclick="history.back()" icon="pi pi-arrow-left" outlined raised label="Back"/>
                </div>
            </div>
        </div>
    </div>
</template>
