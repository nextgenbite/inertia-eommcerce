<script setup>
import { Head } from "@inertiajs/vue3";
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;
const props = defineProps({
  title: {
    type: String,
    default: "IT Software Solutions for Businesses",
  },
  description: {
    type: String,
    default: "We provide innovative IT solutions for businesses, including custom software development, cloud services, and more.",
  },
  og_image: {
    type: String,
    default: 'images/default-og-image.png',
  },
});


</script>
<template>
       <Head :title="title">
            <!-- Meta Description for SEO -->
            <meta name="description" :content="description" />


            <!-- Open Graph (OG) Meta Tags for social media previews -->
            <meta property="og:title" :content="props.title || 'IT Software Solutions for Businesses'">
            <meta property="og:description" :content="props.description || 'We provide innovative IT solutions for businesses, including custom software development, cloud services, and more.'">
            <meta property="og:image" :content="$page.props.ziggy.url+(props.og_image ||  'images/default-og-image.png')">
            <meta property="og:url" :content="apiUrl">
            <meta property="og:site_name" :content="$page.props.settings?.title || appName">
            <meta property="og:locale" content="en_US">
            <meta property="og:type" content="website">
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="630">
            <!-- Twitter Card Meta Tags -->
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" :content="props.title || 'IT Software Solutions for Businesses'">
            <meta name="twitter:description" :content="props.description || 'We provide innovative IT solutions for businesses, including custom software development, cloud services, and more.'">>
            <meta name="twitter:image" :content="$page.props.ziggy.url+ (props.og_image ||  'images/default-og-image.png')">
            <!-- <meta name="twitter:site" content="@your_twitter_handle">
            <meta name="twitter:creator" content="@your_twitter_handle"> -->
            <!-- Canonical URL -->
            <link rel="canonical" :href="$page.props.ziggy.location">

        </Head>
</template>
