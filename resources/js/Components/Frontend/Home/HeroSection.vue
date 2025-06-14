<template>
  <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 container">
    <!-- ---- Start Category  ----- -->
    <div class="bg-white border border-gray-100 hidden lg:block">
      <ul class="divide-y divide-gray-100">
        <li
          v-for="category in $page.props.categories"
          :key="category.id"
          class="group relative"
        >
          <button
            class="w-full flex items-center justify-between px-5 py-2.5 text-left hover:bg-primary/10 transition-colors font-medium focus:outline-none"
          >
            <div class="flex items-center gap-4">
              <img
                :src="category.thumbnail || '/no-image.png'"
                :alt="category.title"
                class="w-6 h-6 object-cover rounded"
              />
              <span class="text-gray-800 text-base font-semibold">
                {{ category.title }}
              </span>
            </div>
            <i
              v-if="category.sub_categories && category.sub_categories.length"
              class="pi pi-angle-right text-gray-400 text-lg"
            ></i>
          </button>
          <!-- Mega Menu -->
          <div
            v-if="category.sub_categories && category.sub_categories.length"
            class="absolute top-0 left-full min-w-[32rem] bg-white rounded-r-xl shadow-lg border border-l-0 border-gray-100 hidden group-hover:block z-10"
          >
            <div class="grid grid-cols-3 gap-6 p-6">
              <div v-for="sub in category.sub_categories" :key="sub.id">
                <h4 class="font-semibold text-gray-700 mb-3">
                  {{ sub.title }}
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="subsub in sub.sub_sub_categories || []"
                    :key="subsub.id"
                  >
                    <a
                      :href="`/category/${subsub.slug}`"
                      class="block px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition"
                    >
                      {{ subsub.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- ---- End Category  ----- -->
    <div class="md:col-span-3 lg:col-span-4">
      <!-- ---- Start Banner  ----- -->
         <!-- <swiper
                :modules="[Autoplay, EffectCreative, Pagination]"
                :autoplay="{
                    delay: 7000,
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
                class=" overflow-hidden shadow-lg"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <swiper-slide v-for="(image, index) in images" :key="index">
                    <div
                        class="relative bg-cover bg-center  min-h-[25rem] flex items-center justify-center"
                        :style="{ backgroundImage: `url(${image.itemImageSrc})` }"
                    >
                        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                        <div class="relative z-10 text-left px-8 py-10 max-w-xl">
                            <h1 class="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
                                Best Collection For <br class="hidden sm:block" />
                                Home Decoration
                            </h1>
                            <p class="text-base text-gray-100 mb-6 drop-shadow">
                                Discover unique pieces to elevate your space.<br class="hidden sm:block" />
                                Shop the latest trends in home decor.
                            </p>
                            <a
                                title="Shop Now"
                                href="shop.html"
                                class="inline-block bg-primary hover:bg-primary/80 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </swiper-slide>
            </swiper> -->


      <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5"
    :showThumbnails="false" :showIndicators="true" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="true" containerClass=" max-h-[28rem] rounded-none"  :autoPlay="true" :transitionInterval="5000" indicatorsPosition="bottom"  :circular="true" :showItemNavigators="true" :showItemNavigatorsOnHover="true">
    <template #item="slotProps">
<img :src="slotProps.item.itemImageSrc" class=" max-h-[28rem] rounded-none" :alt="slotProps.item.alt" style="width: 100%; display: block" />

    </template>
</Galleria>

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
    breakpoint: "991px",
    numVisible: 4,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);
</script>
