
<script setup>
    import AppLayout from "@/sakai/layout/AppLayout.vue";
import { Head } from "@inertiajs/vue3";
    const props = defineProps({
        users: Number,
        roles: Number,
        permissions: Number,
    });
</script>

<template>
    <Head>
       <!-- Primary Meta Tags -->
<title>Dashboard</title>
<meta name="title" content="Nextgen Shop" />
<meta name="description" content="test" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ecomnuxt.nextgenbite.xyz/" />
<meta property="og:title" content="Nextgen Shop" />
<meta property="og:description" content="test" />
<meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://ecomnuxt.nextgenbite.xyz/" />
<meta property="twitter:title" content="Nextgen Shop" />
<meta property="twitter:description" content="test" />
<meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />

<!-- Meta Tags Generated with https://metatags.io -->
    </Head>
    <app-layout>
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 lg:col-span-6 xl:col-span-4">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">User</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ props.users }}</div>
                        </div>
                        <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-users text-blue-500 !text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-4">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Role</span>
                            <div class=" text-primary dark:text-surface-0 font-medium text-xl">{{ props.roles }}</div>
                        </div>
                        <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-unlock text-orange-500 !text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6 xl:col-span-4">
                <div class="card mb-0">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-muted-color font-medium mb-4">Permission</span>
                            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ props.permissions }}</div>
                        </div>
                        <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                            <i class="pi pi-key text-cyan-500 !text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<style scoped lang="scss">

</style>
