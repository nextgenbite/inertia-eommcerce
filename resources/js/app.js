import {primaryColors, surfaces} from './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import { createPinia } from 'pinia'
const pinia = createPinia()

import { definePreset, updateSurfacePalette } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/sakai/assets/styles.scss';
import '@/sakai/assets/tailwind.css';
const appName = import.meta.env.VITE_APP_NAME || 'Nextgen Shop';
// Function to get the theme based on settings
const getTheme = (themeMode) => themeMode === 'Lara' ? Lara : Aura;

// Function to create a PrimeVue preset
const createThemePreset = (selectedColor, selectedTheme) => {
    return definePreset(selectedTheme, {
        semantic: {
            primary: selectedColor,
            colorScheme: {
                light: {
                    primary: {
                        color: '{primary.500}',
                        contrastColor: '#ffffff',
                        hoverColor: '{primary.600}',
                        activeColor: '{primary.700}'
                    },
                    highlight: {
                        background: '{primary.50}',
                        focusBackground: '{primary.100}',
                        color: '{primary.700}',
                        focusColor: '{primary.800}'
                    }
                },
                dark: {
                    primary: {
                        color: '{primary.400}',
                        contrastColor: '{surface.900}',
                        hoverColor: '{primary.300}',
                        activeColor: '{primary.200}'
                    },
                    highlight: {
                        background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                        focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                        color: 'rgba(255,255,255,.87)',
                        focusColor: 'rgba(255,255,255,.87)'
                    }
                }
            }
        }
    });
};
createInertiaApp({
    title: title => `${title ? title + ' - ' : ''}${appName}`,
    resolve: name => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const settings = props.initialPage?.props?.settings || {};
        const selectedColor = primaryColors[settings.primary_color] || primaryColors.noir;
        const selectedSurface = surfaces[settings.surface_color] || surfaces.slate;

        updateSurfacePalette(selectedSurface);

        const selectedTheme = getTheme(settings.theme_mode);
        const myPreset = createThemePreset(selectedColor, selectedTheme);

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: myPreset,
                    options: {
                        darkModeSelector: '.app-dark',
                    },
                },
                 ripple: true
            })
            .use(ToastService)
            .use(ConfirmationService)
            .mixin({
                methods: {
                    can(permissions) {
                        const allPermissions = this.$page.props.auth.can;
                        return permissions.some(item => allPermissions[item]);
                    },
                    formatCurrency(amount) {
                        const currencySymbol = settings.currency_symbol || '$';
                        return `${currencySymbol}${Math.round(amount)}`;
                    },
                },
            })
            .mount(el);
    },
    progress: {
        color: 'var(--p-primary-color)',
    },
});
