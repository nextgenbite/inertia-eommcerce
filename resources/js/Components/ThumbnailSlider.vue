<template>
    <div>
        <Swiper
            :style="{
                '--swiper-navigation-color': '#fff',
                '--swiper-navigation-size': '2rem',
            }"
            :loop="true"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="mySwiper2"
        >
            <SwiperSlide v-for="image in images" :key="image.src">
                <img
                    class="w-full rounded-lg"
                    :src="image.itemImageSrc"
                    :alt="image.alt || 'Image'"
                />
            </SwiperSlide>
        </Swiper>
        <Swiper
            @swiper="onThumbsSwiper"
            :loop="true"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            :breakpoints="breakpoints"
            class="mySwiper"
        >
   <SwiperSlide v-for="(image, index) in images" :key="image.src">
    <img
        class="rounded-lg shadow-md cursor-pointer file:w-full h-24"
        :class="{
            'border border-primary': thumbsSwiper && thumbsSwiper.realIndex === index,
        }"
        :alt="image.alt || 'Image thumbnail'"
        :src="image.itemImageSrc"
    />
</SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const modules = [Navigation, Thumbs, EffectCube];

const props = defineProps({
    images: {
        type: Array,
        default: () => [],
    },
    video: {
        type: String,
        default: "",
    },
    thumbnail: {
        type: String,
        default: "",
    },
});

const thumbsSwiper = ref(null);

const onThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
};

const breakpoints = {
    1200: { slidesPerView: 4 },
    992: { slidesPerView: 4 },
    768: { slidesPerView: 4 },
    576: { slidesPerView: 4, spaceBetween: 10 },
    0: { slidesPerView: 3 },
};
</script>

<style scoped>

@media (min-width: 320px){

.swiper-button-next,
.swiper-button-prev {
width: 30px;
height: 30px;
}
.swiper-button-next:after,
.swiper-button-prev:after {
content: "";
width: 25%;
height: 25%;
}
}
</style>
