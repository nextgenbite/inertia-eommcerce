<template>
  <default-layout>
    <div class="container mx-auto px-4 py-8">
      <section class="">
        <div class="">
          <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="slider-box w-full h-full max-lg:mx-auto mx-0">
<Galleria
  class="w-full"
 v-if="galleryData.length"
  :value="galleryData"
 :activeIndex="activeIndex"
  :responsiveOptions="responsiveOptions"
  :numVisible="5"
  :circular="true"

  :showItemNavigators="true"
  :showItemNavigatorsOnHover="true"
>
  <template #item="slotProps">
    <img
      :src="slotProps.item.itemImageSrc"
      :alt="slotProps.item.alt"
      style="width: 100%; display: block"
    />
  </template>
  <template #thumbnail="slotProps">
    <img
      :src="slotProps.item.thumbnailImageSrc"
      :alt="slotProps.item.alt"
      class=" rounded-lg  h-20"

    />
  </template>
</Galleria>
          <img v-else
            :src="`/${product.thumbnail}` || '/no-image.png'"
            alt="Product Image"
            class="w-full h-auto rounded-lg shadow-lg"
          />
            </div>
            <div class="flex justify-center items-center">
              <div
                class="w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8"
              >
                <div class="flex items-center justify-between gap-6 mb-6">
                  <div class="text">
                    <h1
                      class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize"
                    >
                     {{ product.title}}
                    </h1>
                    <p class="font-normal text-base text-gray-500 capitalize">
                       {{ product.category?.title || 'Uncategorized' }}
                    </p>
                  </div>
                <Button
                    raised
                    outlined
                    rounded
                    size="large"
                    icon="pi pi-heart"
                    aria-label="Add to Wishlist"
                 />
                </div>

                <div
                  class="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3"
                >
                  <div class="flex items-center">
                    <h5
                      class="font-manrope font-semibold text-2xl leading-6 text-gray-900"
                    >
                      $ {{product.price}}
                    </h5>
                    <span class="ml-3 font-semibold text-lg text-primary-600"
                      >30% off</span
                    >
                  </div>
           <span class=" text-gray-200 mx-5 max-[400px]:hidden">|</span>
                  <button
                    class="flex items-center gap-1 rounded-lg bg-amber-400 text py-1.5 px-2.5 w-max"
                  >
<i class="pi pi-star-fill text-white"></i>
                    <span class="text-base font-medium text-white">4.8</span>
                  </button>
                </div>
                <p class="font-medium text-lg text-gray-900 mb-2">Color</p>
                <div class="grid grid-cols-6 gap-3 mb-6">
                    <div
                        class="color-box group cursor-pointer"
                        v-for="color in colors"
                        :key="color.id"
                        @click="selectedColor = color.id"
                    >
                        <div>
                            <img
                                :src="color.image || '/no-image.png'"
                                :alt="color.name || 'Image'"
                                class="aspect-square border-2 rounded-xl transition-all duration-500 object-cover shadow-sm shadow-gray-200 group-hover:shadow-primary-300"
                                :class="selectedColor === color.id ? 'border-primary-600' : 'border-gray-200'"
                            />
                            <p
                                class="font-normal text-sm leading-6 text-gray-400 text-center mt-2 group-hover:text-primary-600"
                                :class="selectedColor === color.id ? 'text-primary-600 font-semibold' : ''"
                            >
                                {{ color.name }}
                            </p>

                            <div class="flex justify-center mt-1">
                                <input
                                    type="radio"
                                    :value="color.id"
                                    v-model="selectedColor"
                                    class="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <p class="font-medium text-lg text-gray-900 mb-2">Size</p>
                <div
                  class="grid grid-cols-4 min-[400px]:grid-cols-6 gap-3 mb-3 min-[400px]:mb-8"
                >
                  <button
                    v-for="size in sizes"
                    :key="size"
                    @click="selectedSize = size"
                    :class="[
                      'border border-gray-200 whitespace-nowrap text-gray-900 text-sm leading-6 py-1 rounded-full text-center w-full font-semibold shadow-sm shadow-transparent transition-all duration-300 hover:bg-gray-50 hover:shadow-primary-300',
                      selectedSize === size
                        ? 'bg-primary-50 border-primary-600 text-primary-600'
                        : '',
                    ]"
                    type="button"
                  >
                    {{ size }}
                  </button>
                </div>

                <div
                  class="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8"
                >
                   <div
                  class="flex  mx-auto text-gray-600 border rounded-full border-gray-300 divide-x divide-gray-300 lg:mx-0 w-max"
                >
                  <div
                    @click="quantity > 1 ? quantity-- : ''"
                    class="relative rounded-l-full px-5 py-1 overflow-hidden font-medium text-gray-600 shadow-inner cursor-pointer group"
                  >
                    <span
                      class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"
                    ></span>
                    <span
                      class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"
                    ></span>
                    <span
                      class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"
                    ></span>
                    <span
                      class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"
                    ></span>
                    <span
                      class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"
                    ></span>
                    <span
                      class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
                      >-</span
                    >
                  </div>
                  <div class="flex items-center justify-center w-10 h-8">
                    {{ quantity }}
                  </div>
                  <div
                    @click="quantity < 10 ? quantity++ : ''"
                    class="relative px-5  py-1  rounded-r-full overflow-hidden font-medium text-gray-600 shadow-inner cursor-pointer group"
                  >
                    <span
                      class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"
                    ></span>
                    <span
                      class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"
                    ></span>
                    <span
                      class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"
                    ></span>
                    <span
                      class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"
                    ></span>
                    <span
                      class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"
                    ></span>
                    <span
                      class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
                      >+</span
                    >
                  </div>
                </div>
                <Button raised outlined rounded size="small" class="w-full" label="Add to Cart" icon="pi  pi-shopping-bag" />

                </div>
            <Button
              raised
              rounded
              icon="pi pi-shopping-cart"
              class="w-full"
              label="Buy Now" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="card mt-4">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Overview</Tab>
            <Tab value="1">Reviews & Ratings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div v-html="product.description"></div>
            </TabPanel>
            <TabPanel value="1">
              <section class="py-12 relative">
                <div class="w-full max-w-4xl px-4 md:px-5 mx-auto">
                  <h2
                    class="font-bold text-2xl md:text-3xl text-black mb-8 text-center"
                  >
                    Our customer reviews
                  </h2>
                  <!-- Ratings Summary -->
                  <div
                    class="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8 border-b border-gray-100"
                  >
                    <div class="flex flex-col gap-y-4 w-full">
                      <div
                        v-for="n in 5"
                        :key="n"
                        class="flex items-center w-full"
                      >
                        <p class="font-medium text-lg text-black mr-1">
                          {{ 6 - n }}
                        </p>
                        <span class="text-yellow-400 mr-2">
                          <i class="pi pi-star-fill"></i>
                        </span>
                        <div
                          class="h-2 w-full sm:min-w-[120px] rounded-3xl bg-amber-50 ml-2 mr-3"
                        >
                          <span
                            class="h-full rounded-3xl bg-amber-400 flex"
                            :style="{ width: ratingPercent(6 - n) + '%' }"
                          ></span>
                        </div>
                        <p class="font-medium text-lg text-black mr-1">
                          {{ ratingCount(6 - n) }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col"
                    >
                      <h2 class="font-bold text-4xl text-amber-400 mb-4">
                        {{ averageRating.toFixed(1) }}
                      </h2>
                      <div class="flex items-center justify-center gap-2 mb-2">
                        <i
                          v-for="n in 5"
                          :key="n"
                          class="pi"
                          :class="
                            n <= Math.round(averageRating)
                              ? 'pi-star-fill text-yellow-400 text-2xl'
                              : 'pi-star text-gray-300 text-2xl'
                          "
                        ></i>
                      </div>
                      <p class="font-medium text-lg text-gray-900 text-center">
                        {{ totalRatings }} Ratings
                      </p>
                    </div>
                  </div>
                  <!-- Reviews List -->
                  <div v-if="reviews && reviews.length" class="pt-8 space-y-8">
                    <div
                      v-for="review in reviews"
                      :key="review.id"
                      class="border-b pb-6"
                    >
                      <div class="flex items-center gap-3 mb-2">
                        <span class="text-yellow-400 flex">
                          <i
                            v-for="n in 5"
                            :key="n"
                            class="pi"
                            :class="
                              n <= review.rating
                                ? 'pi-star-fill'
                                : 'pi-star text-gray-300'
                            "
                          ></i>
                        </span>
                      </div>
                      <h3 class="font-semibold text-lg text-black mb-2">
                        {{ review.title || "Customer Review" }}
                      </h3>
                      <div
                        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2"
                      >
                        <div class="flex items-center gap-2">
                          <img
                            v-if="review.avatar"
                            :src="review.avatar"
                            :alt="review.author"
                            class="w-8 h-8 rounded-full object-cover"
                          />
                          <span class="font-semibold text-primary-600">{{
                            review.author
                          }}</span>
                        </div>
                        <span class="text-gray-400 text-sm">{{
                          review.date
                        }}</span>
                      </div>
                      <p class="text-gray-700">{{ review.comment }}</p>
                    </div>
                  </div>
                  <p v-else class="text-gray-600 py-8 text-center">
                    No reviews yet.
                  </p>
                </div>
              </section>

              <!-- <div>
            <h3 class="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div v-if="reviews && reviews.length">
              <div v-for="review in reviews" :key="review.id" class="mb-6 border-b pb-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold">{{ review.author }}</span>
                  <span class="text-xs text-gray-400">{{ review.date }}</span>
                </div>
                <div class="flex items-center gap-1 text-yellow-400 mb-1">
                  <i v-for="n in 5" :key="n" class="pi pi-star" :class="{ 'text-gray-300': n > review.rating }"></i>
                </div>
                <p class="text-gray-700">{{ review.comment }}</p>
              </div>
            </div>
            <p v-else class="text-gray-600 mb-2">No reviews yet.</p>
            <Button label="Write a Review" icon="pi pi-pencil" outlined />
            <h3 class="text-lg font-semibold mt-8 mb-4">Ratings</h3>
            <div class="flex items-center gap-2">
              <span class="text-yellow-400">
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
              </span>
              <span class="text-gray-600">(5.0)</span>
            </div>
            <p class="text-gray-600 mt-2">Based on 99 ratings</p>
            <div class="mt-4">
              <h4 class="text-md font-semibold mb-2">Rate this product:</h4>
              <div class="flex items-center gap-2">
                <span class="text-yellow-400 cursor-pointer">
                  <i class="pi pi-star" @click="selectedRating = 1"></i>
                  <i class="pi pi-star" @click="selectedRating = 2"></i>
                  <i class="pi pi-star" @click="selectedRating = 3"></i>
                  <i class="pi pi-star" @click="selectedRating = 4"></i>
                  <i class="pi pi-star" @click="selectedRating = 5"></i>
                </span>
              </div>
            </div>
          </div> -->
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>

    <div class="container pb-16">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
        Top Related Products
        <hr
          class="lg:w-1/4 min-h-0.5 my-4 bg-gray-300 border-0 rounded lg:my-1 dark:bg-gray-700"
        />
      </h2>
      <SwiperSlider :items="relatedProducts" :swiperOptions="productOptions">
        <template #default="{ item }">
          <ProductCard :product="item" />
        </template>
      </SwiperSlider>
    </div>
  </default-layout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import SwiperSlider from "@/Components/Shared/SwiperSlider.vue";
import ProductCard from "@/Components/ProductCard.vue";
import { PhotoService } from "@/sakai//service/PhotoService";
import BaseIcon from "@/Components/BaseIcon.vue";
const props = defineProps({
  product: Object,
  relatedProducts: Array,
});
onMounted(() => {
  PhotoService.getImages().then((data) => (images.value = data));
});

const images = ref();
const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 3,
  },
]);
const productOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  },
};

const feature = ref([
  { id: "2", name: " Fast Delivery all across the country", icon: "truck" },
  { id: "1", name: "Safe Payment", icon: "money" },
  { id: "3", name: "Money Return", icon: "money_return" },
  { id: "4", name: "Authentic Products", icon: "shield" },
  //   { id: "5", name: "Fast Delivery", icon: "truck" },
  //   { id: "6", name: "24/7 Support", icon: "headset" },
  //   { id: "7", name: "Secure Checkout", icon: "lock" },
]);

const selectedSize = ref(null);

const sizes = ["XS", "S", "M", "L", "XL"];

const selectedColor = ref(null);
const activeIndex = ref(0);
const galleryData = ref([]);

const colors = ref([
  { id: '1', name: 'Red', image: 'https://pagedone.io/asset/uploads/1700472379.png' },
  { id: '2', name: 'Blue', image: 'https://pagedone.io/asset/uploads/1700472517.png' },
  { id: '3', name: 'Yellow', image: 'https://pagedone.io/asset/uploads/1700472529.png' },
]);

const productImages = ref([]);

onMounted(() => {
  try {
    if (props.product?.images?.length) {
      const parsed = typeof props.product.images === 'string'
        ? JSON.parse(props.product.images.replace(/,\s*\]/, ']'))
        : props.product.images;

      productImages.value = parsed;
    }
  } catch (e) {
    console.error("Failed to parse product images:", e);
  }

  galleryData.value = [
    ...productImages.value.map((img, index) => ({
      itemImageSrc: img,
      thumbnailImageSrc: img,
      alt: `Product Image ${index + 1}`,
    })),
    ...colors.value.map((color) => ({
      itemImageSrc: color.image,
      thumbnailImageSrc: color.image,
      alt: color.name,
    })),
  ];
});

watch(selectedColor, (newColorId) => {
  const colorIndex = colors.value.findIndex(c => c.id === newColorId);
  if (colorIndex !== -1) {
    const offset = productImages.value.length;
    activeIndex.value = offset + colorIndex;
  }
});

const quantity = ref(1);

const reviews = ref([
  {
    id: 1,
    avatar: "https://pagedone.io/asset/uploads/1704349572.png",
    author: "John Doe",
    date: "2024-06-01",
    rating: 5,
    comment: "Excellent product! Highly recommended.",
  },
  {
    id: 2,
    avatar: "https://pagedone.io/asset/uploads/1704351103.png",
    author: "Jane Smith",
    date: "2024-06-02",
    rating: 4,
    comment: "Very good quality, but shipping was slow.",
  },
  {
    id: 2,
    avatar: "https://pagedone.io/asset/uploads/1704351103.png",
    author: "Arifur Rahman",
    date: "2024-06-02",
    rating: 4,
    comment: "This product is amazing! I love the design and quality.",
  },
]);
const averageRating = ref(
  reviews.value.reduce((sum, review) => sum + review.rating, 0) /
    reviews.value.length
);
const totalRatings = ref(reviews.value.length);
const ratingCount = (rating) => {
  return reviews.value.filter((review) => review.rating === rating).length;
};
const ratingPercent = (rating) => {
  return (ratingCount(rating) / totalRatings.value) * 100;
};
const sliders = ref([
  {
    src: "https://pagedone.io/asset/uploads/1700472379.png",
    alt: "Yellow Summer Travel Bag",
  },
  {
    src: "https://pagedone.io/asset/uploads/1700472517.png",
    alt: "Brown Summer Travel Bag",
  },
  {
    src: "https://pagedone.io/asset/uploads/1700472529.png",
    alt: "Beige Summer Travel Bag",
  },
]);
</script>

<style>
/* .nav-for-slider .swiper-slide {
            height: auto;
            width: auto;
            cursor: pointer;

        }
        .swiper-wrapper{
            height: auto;
        }
        .nav-for-slider .swiper-slide img{
            border:2px solid transparent;
            border-radius: 10px;

        }
        .nav-for-slider .swiper-slide-thumb-active img{

            border-color: rgb(79 70 229 );
        } */
</style>
