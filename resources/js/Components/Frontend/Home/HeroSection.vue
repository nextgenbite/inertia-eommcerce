<template>
     <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 container">
      <!-- ---- Start Category  ----- -->
      <div
        class="w-full  bg-white py-3 divide-y divide-gray-300 divide-dashed max-h-96 overflow-y-hidden hidden lg:inline"
      >
        <!-- ---- Start single category ----- -->
        <a
          v-for="category in $page.props.categories"
          :key="category.id"
          :title="category.title"
          href="#"
          class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
        >
          <img
            :src="category.thumbnail || '/no-image.png'"
            :alt="category.title"
            class="w-5 h-5 object-contain"
          />
          <span class="ml-6 text-gray-700 text-sm font-semibold">
            {{ category.title }}</span
          >
        </a>
        <!-- ---- single category End ----- -->
      </div>
      <!-- ---- End Category  ----- -->
      <div class="md:col-span-3 lg:col-span-4">
        <!-- ---- Start Banner  ----- -->
          <swiper
          :modules="[Autoplay, EffectCreative, Pagination]"
          :autoplay="{
            delay: 10000,
            disableOnInteraction: false,
          }"
          :pagination="{ clickable: true }"
          :slides-per-view="1"
          :loop="true"
          :grabCursor="true"
          :effect="'creative'"
          :creativeEffect="{
            prev: {
              shadow: true,
              translate: ['-20%', 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="(image, index) in images" :key="index">
            <div
              class="bg-cover w-full bg-no-repeat bg-center py-6 lg:py-[6.26rem] xl:py-[5.75rem] relative text-center"

                       :style="{ backgroundImage: `url(${image.itemImageSrc})` }"

            >
              <div class="container">
                <!-- ---- Banner Content   ----- -->
                <h1
                  class="xl:text-4xl md:text-2xl text-lg text-gray-800 font-semibold mb-2 lg:mb-4"
                >
                  Best Collection For <br class="hidden sm:block" />
                  Home Decoration
                </h1>
                <p
                  class="text-xs text-gray-600 leading-4 line-clamp-2 lg:line-clamp-none"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vulputate
                  <br class="hidden sm:block" />
                  rhoncus pellentesque id integer neque, vel accumsan dolor
                  diam.
                </p>

                <div class="mt-3 lg:mt-12">
                  <a
                    title="title"
                    href="shop.html"
                    class="bg-primary border text-xs border-primary text-white px-3 py-1.5 lg:px-5 lg:py-2.5 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition duration-300 ease-in"
                  >
                    Shop Now
                  </a>
                </div>
                <!-- ---- Banner Content End  ----- -->
              </div>
            </div>
          </swiper-slide>

        </swiper>

        <!-- <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5"
    :showThumbnails="false" :showIndicators="true" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="true" containerClass=" max-h-96 rounded-none"  :autoPlay="true" :transitionInterval="5000" indicatorsPosition="bottom"  :circular="true" :showItemNavigators="true" :showItemNavigatorsOnHover="true">
    <template #item="slotProps">
<img :src="slotProps.item.itemImageSrc" class=" max-h-96 rounded-none" :alt="slotProps.item.alt" style="width: 100%; display: block" />

    </template>
</Galleria> -->


        <!-- ---- End Banner ----- -->
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { PhotoService } from "@/sakai//service/PhotoService";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
// import required modules
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};


onMounted(() => {
  PhotoService.getImages().then((data) => (images.value = data));
});

const images = ref();
const responsiveOptions = ref([
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);
</script>
