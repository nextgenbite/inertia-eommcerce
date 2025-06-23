import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
     darkMode: ['selector', '[class*="app-dark"]'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {
            fontFamily: {
             sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
          },
        },
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        },
            rotate: {
            '360': '360deg', // Add custom rotation value
          },
          container : {
            center : true,
            // padding : '0.5rem'  // 16px
          },
    },

    plugins: [forms, require('tailwindcss-primeui')],
};
