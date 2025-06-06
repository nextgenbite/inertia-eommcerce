<template>
  <default-layout>
    <div class="container mx-auto py-8">
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4">
        <div class="col-span-4 w-full h-full max-lg:mx-auto mx-0">
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
                class="rounded-lg h-20"
              />
            </template>
          </Galleria>
          <img
            v-else
            :src="product.thumbnail ? `/${product.thumbnail}` : '/no-image.png'"
            alt="Product Image"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div class="col-span-5 flex justify-center items-center">
          <div class="w-full h-full max-lg:mt-8 flex flex-col">
            <div class="flex items-center justify-between gap-6 mb-6">
              <div class="text">
            <h1
              class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize"
            >
              {{ product.title }}
              {{ product.inventory }}
            </h1>
            <p class="font-normal text-base text-gray-500 capitalize">
              {{ product.category?.title || "Uncategorized" }}
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
              class="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-4 gap-y-3"
            >
              <div class="flex items-center">
            <h5
              class="font-manrope font-semibold text-2xl leading-6 text-gray-900"
            >
              $ {{ product.price }}
            </h5>
            <span class="ml-3 font-semibold text-lg text-primary-600"
              >30% off</span
            >
              </div>
              <span class="text-gray-200 mx-5 max-[400px]:hidden">|</span>
              <button
            class="flex items-center gap-1 rounded-lg bg-amber-400 text py-1.5 px-2.5 w-max"
              >
            <i class="pi pi-star-fill text-white"></i>
            <span class="text-base font-medium text-white">4.8</span>
              </button>
            </div>
    <div
      v-for="attribute in product.attributes"
      :key="attribute.id"
      class="mb-6"
    >
      <h3 class="font-medium text-lg text-gray-900 mb-2">
        {{ `${attribute.display_name}` }}
      </h3>

      <div class="flex flex-wrap gap-3">
        <label
          v-for="value in attribute.values"
          :key="value.id"
          class="cursor-pointer"
        >
          <input
        type="radio"
        :name="'attribute-' + attribute.name"
        :value="value.id"
        v-model="selected[attribute.name]"
        class="hidden peer"
        :disabled="!isSelectable(attribute.name, value.id)"
        @change="handleChange(attribute.name, value.id)"
          />
          <div
        class="p-1 border border-gray-200 rounded-md whitespace-nowrap text-gray-900 text-center peer-checked:ring-1 ring-primary-300 transition-all duration-200 font-semibold shadow-sm shadow-transparent hover:bg-gray-50 hover:shadow-primary-300"
        :class="[
          !isSelectable(attribute.name, value.id)
            ? 'opacity-50 cursor-not-allowed'
            : '',
          attribute.name === 'color'
            ? 'w-20'
            : 'px-4 py-1.5 rounded-full',
        ]"
          >
        <img
          v-if="attribute.name === 'color' && value.image"
          :src="`${value.image}`"
          :alt="value.value"
          class="w-full h-16 object-cover rounded"
        />
        <p
          class="text-sm mt-1 capitalize"
          :class="selected[attribute.name] == value.id ? 'text-primary-600 font-semibold' : 'text-gray-600'"
        >
          {{ value.value }}
        </p>
          </div>
        </label>
      </div>
    </div>

            <!-- If there are no attributes, push the controls to the bottom with mt-auto -->
            <div
            class="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 "
            :class="product.attributes && product.attributes.length === 0 ? 'mt-auto' : ''"
            >
            <div
                class="flex mx-auto text-gray-600 border rounded-full border-gray-300 divide-x divide-gray-300 lg:mx-0 w-max"
            >
                <div
                @click="quantity > 1 ? quantity-- : ''"
                class="relative rounded-l-full px-5 py-2.5 overflow-hidden font-medium text-primary-600 shadow-inner cursor-pointer group"
                >
                <span
                    class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-primary-600 group-hover:w-full ease"
                ></span>
                <span
                    class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-primary-600 group-hover:w-full ease"
                ></span>
                <span
                    class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-primary-600 group-hover:h-full ease"
                ></span>
                <span
                    class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-primary-600 group-hover:h-full ease"
                ></span>
                <span
                    class="absolute inset-0 w-full h-full duration-300 delay-300 bg-primary opacity-0 group-hover:opacity-100"
                ></span>
                <span
                    class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
                    ><i class="pi pi-minus"></i
                ></span>
                </div>
                <div class="flex items-center justify-center w-10">
                {{ quantity }}
                </div>
                <div
                @click="quantity < 10 ? quantity++ : ''"
                class="relative px-5 py-2.5 rounded-r-full overflow-hidden font-medium text-primary-600 shadow-inner cursor-pointer group"
                >
                <span
                    class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-primary-600 group-hover:w-full ease"
                ></span>
                <span
                    class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-primary-600 group-hover:w-full ease"
                ></span>
                <span
                    class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-primary-600 group-hover:h-full ease"
                ></span>
                <span
                    class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-primary-600 group-hover:h-full ease"
                ></span>
                <span
                    class="absolute inset-0 w-full h-full duration-300 delay-300 bg-primary opacity-0 group-hover:opacity-100"
                ></span>
                <span
                    class="relative transition-colors duration-300 delay-200 group-hover:text-white ease"
                    ><i class="pi pi-plus"></i
                ></span>
                </div>
            </div>
            <Button
                raised
                outlined
                rounded
                class="w-full"
                label="Add to Cart"
                icon="pi  pi-shopping-bag"
                @click="addToCart"
                :disabled="product.has_variant && !selectedVariant"
            />
            </div>
            <div
            class="flex mb-4 justify-between items-center rounded-full bg-primary/10 p-5 shadow-lg shadow-primary-100"
            >
            <div>
                <p class="text-sm text-gray-600">Total Price</p>
                <h3 class="font-bold text-primary">
                $ {{ (product.price * quantity).toFixed(2) }}
                </h3>
            </div>
            <Button
                raised
                rounded
                icon="pi pi-shopping-cart"
                label="Buy Now"
            />
            </div>
          </div>
        </div>
        <div class="col-span-3 h-full" >
    <!-- right sidebar -->
    <right-side-bar :product="product" :shipping="shipping"/>
        </div>
      </section>

     <!-- review -->
     <Review :product="product" />
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
import { ref, reactive, onMounted, computed, watch } from "vue";
import {router} from "@inertiajs/vue3";
import DefaultLayout from "@/Layouts/Default.vue";
import SwiperSlider from "@/Components/Shared/SwiperSlider.vue";
import ProductCard from "@/Components/ProductCard.vue";
import { useCartStore } from '@/stores/cartStore'
import RightSideBar from '@/Components/Frontend/Product/RightSideBar.vue'
import Review from '@/Components/Frontend/Product/Review.vue'

const cartStore = useCartStore();
const props = defineProps({
  product: Object,
  availableCombinations: Array,
  relatedProducts: Array,
  shipping: Object,
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




const colorOptions = computed(() => {
  const colorAttr = props.product.attributes.find(attr => attr.name === 'color');
  return colorAttr ? colorAttr.values : [];
});


const activeIndex = ref(0);
const galleryData = ref([]);


const productImages = ref([]);

onMounted(() => {

  try {
    if (props.product?.images?.length) {
      const parsed =
        typeof props.product.images === "string"
          ? JSON.parse(props.product.images.replace(/,\s*\]/, "]"))
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
    ...colorOptions.value.map((color) => ({
      itemImageSrc: color.image,
      thumbnailImageSrc: color.image,
      alt: color.value,
    })),
  ];
});



const quantity = ref(1);



const selected = reactive({});
watch(() => selected['color'], (newColorId) => {
  const attribute = props.product.attributes.find(a => a.name === 'color')
  const color = attribute?.values.find(v => v.id === newColorId)
  if (color?.image) {
    galleryData.value.unshift({
      itemImageSrc: `${color.image}`,
      thumbnailImageSrc: `${color.image}`,
      alt: color.value
    })
  }
})
const allCombinations = props.availableCombinations.map((c) => [...c].sort());

// Disable logic
function isSelectable(attrId, valueId) {
  const temp = { ...selected, [attrId]: valueId };
  const values = Object.values(temp).map(Number).sort();

  return allCombinations.some((combo) =>
    values.every((val) => combo.includes(val))
  );
}

function handleChange(attrId, valueId) {
  selected[attrId] = valueId;
}

const formErrors = ref(null);
// Find selected variant
const selectedVariant = computed(() => {
  const selectedValues = Object.values(selected).map(Number).sort()
  return props.product.variants?.find(v => {
    const ids = v.attribute_values.map(av => av.id).sort()
    return JSON.stringify(ids) === JSON.stringify(selectedValues)
  })
})

function addToCart() {
  if (props.product.has_variant) {
    if (!selectedVariant.value) {
      formErrors.value = 'Please select all variant options.'
      return
    }

cartStore.addToCart({
    variant_id: selectedVariant.value.id,
    quantity: quantity.value,
  })

  } else {
    // Handle simple product without variants
    cartStore.addToCart({
      product_id: props.product.id,
    quantity: quantity.value,
  })

  }
}
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
