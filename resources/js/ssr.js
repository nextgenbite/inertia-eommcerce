import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// PrimeVue & your styles
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import VueSocialSharing from 'vue-social-sharing'; // Vue 3 compatible version!

import '@/sakai/assets/styles.scss';
import '@/sakai/assets/tailwind.css';

import { primaryColors, surfaces } from './bootstrap';
import { definePreset, updateSurfacePalette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';

const appName = import.meta.env.VITE_APP_NAME || 'Nexgenbite';

const getTheme = (themeMode) => themeMode === 'Lara' ? Lara : Aura;

const createThemePreset = (selectedColor, selectedTheme) => {
    return definePreset(selectedTheme, {
        semantic: {
            primary: selectedColor,
        }
    });
};

export default createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup({ App, props, plugin }) {
            const app = createSSRApp({ render: () => h(App, props) });

            const settings = props.initialPage.props.settings || {};
            const selectedColor = primaryColors[settings.primary_color] || primaryColors['noir'];
            const selectedSurface = surfaces[settings.surface_color] || surfaces['slate'];
            updateSurfacePalette(selectedSurface);
            const selectedTheme = getTheme(settings.theme_mode);
            const myPreset = createThemePreset(selectedColor, selectedTheme);

            app.use(plugin)
                .use(ZiggyVue, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                })
                .use(PrimeVue, {
                    theme: {
                        preset: myPreset,
                        options: { darkModeSelector: '.app-dark' },
                    },
                    ripple: true,
                })
                .use(ToastService)
                .use(ConfirmationService)
                .use(VueSocialSharing);

            app.mixin({
                methods: {
                    can(permissions) {
                        const allPermissions = app.config.globalProperties.$page.props.auth?.can || {};
                        return permissions.some(p => allPermissions[p]);
                    }
                }
            });

            return app;
        },
    })
);
