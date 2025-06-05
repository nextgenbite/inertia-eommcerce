<template>
  <default-layout>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-2/5">
           <Galleria class="w-full"  v-if="images" :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" :showItemNavigators="true" :showItemNavigatorsOnHover="true">
            <template #item="slotProps">
                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
            </template>
            <template #thumbnail="slotProps">
                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
            </template>
        </Galleria>
          <img v-else
            :src="`/${product.thumbnail}` || '/no-image.png'"
            alt="Product Image"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div class="w-full md:w-2/5 md:pl-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">
            {{ product.title }}
          </h1>
          <div class="flex items-center gap-3">
            <div class="flex items-center">
              <div class="flex gap-1 text-xs text-yellow-400">
                <span><i class="pi pi-star"></i></span>
                <span><i class="pi pi-star"></i></span>
                <span><i class="pi pi-star"></i></span>
                <span><i class="pi pi-star"></i></span>
                <span><i class="pi pi-star"></i></span>
              </div>
              <span class="ml-3">(99) Reviews</span>
            </div>
            <span>|</span>
            <span>36 Orders</span>
          </div>
          <p class="text-xl font-semibold text-primary mb-4">
            ${{
              product.discount_price || product.price
            }}
          </p>
          <p class="text-gray-600 mb-4">
            <span class="font-semibold">Category:</span>
            {{ product.category.title }}
          </p>
          <p class="text-gray-600 mb-4" v-if="product.brand">
            <span class="font-semibold">Brand:</span>
            {{ product.brand.title }}
          </p>
          <p class="text-gray-600 mb-4">
            <span class="font-semibold">SKU:</span>
            {{ product.sku }}
          </p>
          <p class="text-gray-600 mb-4">
            <span class="font-semibold">Stock:</span>
            {{ product.stock }}
          </p>
          <div class="text-gray-600 mb-4 flex items-center gap-4">
            <span class="font-semibold">Color:</span>
            <div class="inline-flex items-center gap-2">
              <!-- Dynamic Color Options -->
              <div
                v-for="color in colors"
                :key="color.id"
                class="color-selector relative"
                v-tooltip.top="color.name"
              >
                <input
                  type="radio"
                  name="color"
                  class="hidden peer"
                  :id="'color-' + color.id"
                  :value="color.id"
                  v-model="selectedColor"
                />
                <label
                  :for="'color-' + color.id"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                  class="relative text-xs border-2 border-gray-200 shadow rounded-full h-6 w-6 flex items-center justify-center cursor-pointer peer-checked:ring-2 peer-checked:ring-primary-500"
                >
                  <span
                    v-if="selectedColor === color.id"
                    class="absolute text-white flex items-center justify-center w-full h-full"
                  >
                    <i class="pi pi-check p-2"></i>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="text-gray-600 mb-4">
            <span class="font-semibold mr-2">Size:</span>
            <div class="inline-flex items-center gap-2">
              <!-- Dynamic Size Options -->
              <div v-for="size in sizes" :key="size" class="relative">
                <input
                  type="radio"
                  name="size"
                  class="hidden peer"
                  :id="'size-' + size"
                  :value="size"
                  v-model="selectedSize"
                />
                <label
                  :for="'size-' + size"
                  class="peer-checked:border-primary-500 peer-checked:ring-2 peer-checked:ring-primary-500 border border-gray-300 rounded px-3 py-1 cursor-pointer text-sm text-gray-700"
                >
                  {{ size }}
                </label>
              </div>
            </div>
          </div>
          <!-- ---- Quantity --->
          <div class="text-gray-600 mb-4 flex items-center gap-4">
            <span class="font-semibold mr-2">Quantity:</span>
            <div
              class="flex mx-auto text-gray-600 border border-gray-300 divide-x divide-gray-300 lg:mx-0 w-max"
            >
              <div
                @click="quantity > 1 ? quantity-- : ''"
                class="relative px-5 py-1 overflow-hidden font-medium text-gray-600 shadow-inner cursor-pointer group"
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
                class="relative px-5 py-1 overflow-hidden font-medium text-gray-600 shadow-inner cursor-pointer group"
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
          </div>
          <!-- ---- End Quantity --->

   <p class="text-gray-600 mb-4">
            <span class="font-semibold  mr-2">Total Price:</span>
        <span class="text-primary font-semibold">
                {{ product.discount_price || product.price }} x {{ quantity }} = $
            {{
              (product.discount_price || product.price) * quantity
            }}
        </span>
          </p>
          <div class="flex items-center gap-4 mb-4">
            <Button label="Buy Now" icon="pi pi-shopping-bag" raised />
            <Button
              label="Add To Cart"
                icon="pi pi-shopping-cart"
                raised
                outlined
            />
          </div>
        </div>
        <div class="w-full md:w-1/4 mt-8 md:mt-0">
          <Listbox :options="feature" optionLabel="name" class="w-full">
            <template #option="{ option }">
              <div class="flex items-center gap-2">
                        <BaseIcon
            customClass="mx-auto"
            :name="option.icon"
            size="20px"
            fill="var(--p-primary-color)"
          />
                <span class=" truncate">{{ option.name }}</span>
              </div>
            </template>
          </Listbox>
            <div class="mt-4 bg-white rounded-lg shadow p-4">
                <h3 class="text-lg font-semibold mb-2 card-header">Share this product</h3>
                <div class="flex gap-2">
                <Button
                    icon="pi pi-facebook"
                    class="p-button-rounded p-button-secondary"
                />
                <Button
                    icon="pi pi-twitter"
                    class="p-button-rounded p-button-secondary"
                />
                <Button
                    icon="pi pi-linkedin"
                    class="p-button-rounded p-button-secondary"
                />
                <Button
                    icon="pi pi-envelope"
                    class="p-button-rounded p-button-secondary"
                />
                </div>
                </div>
            <div class="mt-4 bg-white rounded-lg shadow p-4" v-show="product.tags && product.tags.length">
                <h3 class="text-lg font-semibold mb-2 card-header">Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in product.tags"
                    :key="tag.id"
                    class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {{ tag.name }}
                  </span>
                </div>
                </div>
            <div class="mt-4 bg-white rounded-lg shadow p-4">
                <h3 class="text-lg font-semibold mb-2 card-header">Shipping Info</h3>
                <p class="text-gray-600 mb-2">
                    <strong>Shipping Cost:</strong> ${{ product.shipping_cost || 'Free' }}
                </p>
                <p class="text-gray-600 mb-2">
                    <strong>Estimated Delivery:</strong> {{ product.estimated_delivery || '3-5 business days' }}
                </p>
                </div>


        </div>
      </div>
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
            <h2 class="font-bold text-2xl md:text-3xl text-black mb-8 text-center">Our customer reviews</h2>
            <!-- Ratings Summary -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8 border-b border-gray-100">
                <div class="flex flex-col gap-y-4 w-full">
                    <div v-for="n in 5" :key="n" class="flex items-center w-full">
                        <p class="font-medium text-lg text-black mr-1">{{ 6 - n }}</p>
                        <span class="text-yellow-400 mr-2">
                            <i class="pi pi-star-fill"></i>
                        </span>
                        <div class="h-2 w-full sm:min-w-[120px] rounded-3xl bg-amber-50 ml-2 mr-3">
                            <span
                                class="h-full rounded-3xl bg-amber-400 flex"
                                :style="{ width: ratingPercent(6 - n) + '%' }"
                            ></span>
                        </div>
                        <p class="font-medium text-lg text-black mr-1">{{ ratingCount(6 - n) }}</p>
                    </div>
                </div>
                <div class="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
                    <h2 class="font-bold text-4xl text-amber-400 mb-4">{{ averageRating.toFixed(1) }}</h2>
                    <div class="flex items-center justify-center gap-2 mb-2">
                        <i
                            v-for="n in 5"
                            :key="n"
                            class="pi"
                            :class="n <= Math.round(averageRating) ? 'pi-star-fill text-yellow-400 text-2xl' : 'pi-star text-gray-300 text-2xl'"
                        ></i>
                    </div>
                    <p class="font-medium text-lg text-gray-900 text-center">{{ totalRatings }} Ratings</p>
                </div>
            </div>
            <!-- Reviews List -->
            <div v-if="reviews && reviews.length" class="pt-8 space-y-8">
                <div v-for="review in reviews" :key="review.id" class="border-b pb-6">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-yellow-400 flex">
                            <i
                                v-for="n in 5"
                                :key="n"
                                class="pi"
                                :class="n <= review.rating ? 'pi-star-fill' : 'pi-star text-gray-300'"
                            ></i>
                        </span>
                    </div>
                    <h3 class="font-semibold text-lg text-black mb-2">{{ review.title || 'Customer Review' }}</h3>
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                        <div class="flex items-center gap-2">
                            <img
                                v-if="review.avatar"
                                :src="review.avatar"
                                :alt="review.author"
                                class="w-8 h-8 rounded-full object-cover"
                            />
                            <span class="font-semibold text-indigo-600">{{ review.author }}</span>
                        </div>
                        <span class="text-gray-400 text-sm">{{ review.date }}</span>
                    </div>
                    <p class="text-gray-700">{{ review.comment }}</p>
                </div>
            </div>
            <p v-else class="text-gray-600 py-8 text-center">No reviews yet.</p>
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
      <SwiperSlider
        :items="relatedProducts"
        :swiperOptions="productOptions"
      >
        <template #default="{ item }">
          <ProductCard :product="item" />
        </template>
      </SwiperSlider>
    </div>
  </default-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import SwiperSlider from "@/Components/Shared/SwiperSlider.vue";
import ProductCard from "@/Components/ProductCard.vue";
import { PhotoService } from "@/sakai//service/PhotoService";
import BaseIcon from '@/Components/BaseIcon.vue';
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

const colors = ref([
  { id: "1", name: "Red", icon: "#dc2626" },
  { id: "2", name: "Blue", hex: "#2563eb" },
  { id: "3", name: "Yellow", hex: "#eab308" },
  { id: "4", name: "Lime", hex: "#65a30d" },
  { id: "5", name: "Pink", hex: "#db2777" },
]);

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
]);
const averageRating = ref(
  reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length
);
const totalRatings = ref(reviews.value.length);
const ratingCount = (rating) => {
  return reviews.value.filter((review) => review.rating === rating).length;
};
const ratingPercent = (rating) => {
  return (ratingCount(rating) / totalRatings.value) * 100;
};
</script>

<style>
</style>
