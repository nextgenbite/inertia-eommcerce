import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.js'],
            refresh: true,
            ssr: 'resources/js/ssr.js', // Define the SSR entry point
        }),
        vue(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
    ],
    ssr: {
        noExternal: ['primevue', 'primeicons'], // Ensure PrimeVue and PrimeIcons are bundled in SSR
    },
    resolve: {
        alias: {
            '@': '/resources/js', // Simplify imports with @ alias
        },
    },
});
