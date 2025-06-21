<template>
    <section class="container p-4 lg:p-6 bg-white/70">
        <div class=" px-4">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl shadow-lg border border-gray-100 bg-gray-50"
            >
                <FeatureCard
                    v-for="feature in features"
                    :key="feature.icon"
                    :icon="feature.icon"
                    :title="feature.title"
                    :subtitle="feature.subtitle"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';
import FeatureCard from './FeatureCard.vue'

const features = [
    {
        icon: 'truck',
        title: 'Fast Delivery',
        subtitle: 'All across the country',
    },
    {
        icon: 'money',
        title: 'Safe Payment',
        subtitle: 'Secure & trusted',
    },
    {
        icon: 'money_return',
        title: '7 Days Return',
        subtitle: 'Money-back guarantee',
    },
    {
        icon: 'shield',
        title: '100% Authentic',
        subtitle: 'Genuine products only',
    },
];

// Define FeatureCard as a local component using <script setup>

</script>


