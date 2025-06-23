
<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { router } from "@inertiajs/vue3";
import DefaultLayout from "@/Layouts/Default.vue";
import SwiperSlider from "@/Components/Shared/SwiperSlider.vue";
import ProductCard from "@/Components/ProductCard.vue";
import { useCartStore } from "@/stores/cartStore";
import RightSideBar from "@/Components/Frontend/Product/RightSideBar.vue";
import Review from "@/Components/Frontend/Product/Review.vue";
import MetaTags from "@/Components/MetaTags.vue";

import { useToast } from "primevue/usetoast";

const toast = useToast();

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

const quantity = ref(1);

const selected = ref({}); // { [attribute_id]: attribute_value_id }
const activeIndex = ref(0);
const galleryData = ref([]);
const productImages = ref([]);

// Group attributes with image support (e.g. color)
const groupedAttributes = computed(() => {
  const groups = {};

  props.product.variants.forEach((variant) => {
    variant.attribute_values.forEach((av) => {
      const attr = av.attribute;
      if (!groups[attr.id]) {
        groups[attr.id] = {
          id: attr.id,
          name: attr.name,
          display_name: attr.display_name,
          values: [],
        };
      }

      const exists = groups[attr.id].values.find((v) => v.id === av.id);
      if (!exists) {
        groups[attr.id].values.push({
          id: av.id,
          value: av.value,
          image:
            props.product.attribute_images?.find(
              (img) => img.attribute_value_id === av.id
            )?.image_path ?? null,
        });
      }
    });
  });

  return Object.values(groups);
});

// Find matched variant by selected attributes
const matchedVariant = computed(() => {
  if (!props.product.has_variants || !Object.keys(selected.value).length)
    return null;

  return props.product.variants.find((variant) => {
    const variantIds = variant.attribute_values
      .map((av) => av.id)
      .sort((a, b) => a - b)
      .join("-");
    const selectedIds = Object.values(selected.value)
      .map(Number)
      .sort((a, b) => a - b)
      .join("-");
    return variantIds === selectedIds;
  });
});

// Total or selected variant quantity
const currentQuantity = computed(() => {
  if (matchedVariant.value) return matchedVariant.value.quantity;

  return props.product.variants.reduce(
    (sum, variant) => sum + variant.quantity,
    0
  );
});

const formErrors = ref(null);

const addToCart = () => {
  const requiredAttributes = groupedAttributes.value.length;
  const selectedAttributes = Object.keys(selected.value).length;

  if (props.product.has_variants) {
    if (selectedAttributes !== requiredAttributes || !matchedVariant.value) {
      toast.add({
        severity: "warn",
        summary: "Please select all variant options",
        life: 3000,
      });
      return;
    }

    if (matchedVariant.value.quantity < 1) {
      toast.add({
        severity: "error",
        summary: "Selected variant is out of stock",
        life: 3000,
      });
      return;
    }

    const success = cartStore.addToCart({
      variant_id: matchedVariant.value.id,
      quantity: quantity.value,
    });

    if (success) {
      toast.add({
        severity: "success",
        summary: "Added to cart",
        life: 2000,
      });
    }
  } else {
    // if (props.product.variants.reduce((sum, v) => sum + v.quantity, 0) === 0) {
    //   toast.add({
    //     severity: 'error',
    //     summary: 'Product is out of stock',
    //     life: 3000,
    //   })
    //   return
    // }

    const success = cartStore.addToCart({
      product_id: props.product.id,
      quantity: quantity.value,
    });

    if (success) {
      toast.add({
        severity: "success",
        summary: "Added to cart",
        life: 2000,
      });
    }
  }
};

// Initial load of main product images
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

  updateGalleryData();
});

// ✅ Separate function to generate gallery
const updateGalleryData = () => {
  const colorAttr = groupedAttributes.value.find(
    (attr) => attr.name === "color"
  );
  const colorImages =
    colorAttr?.values
      .filter((v) => v.image)
      .map((v) => ({
        itemImageSrc: "/" + v.image,
        thumbnailImageSrc: "/" + v.image,
        alt: v.value,
      })) ?? [];

  galleryData.value = [
    ...productImages.value.map((img, index) => ({
      itemImageSrc: "/" +img,
      thumbnailImageSrc:"/" + img,
      alt: `Product Image ${index + 1}`,
    })),
    ...colorImages,
  ];
};

// ✅ This only updates the selected value + gallery index
const selectOption = (attributeId, valueId) => {
  selected.value[attributeId] = valueId;

  const attr = groupedAttributes.value.find((attr) => attr.id === attributeId);
  const selectedValue = attr?.values.find((v) => v.id === valueId);

  if (selectedValue?.image) {
    const idx = galleryData.value.findIndex((img) =>
      img.itemImageSrc?.includes(selectedValue.image)
    );
    if (idx !== -1) activeIndex.value = idx;
  }
};

// Check selection
const isSelected = (attributeId, valueId) =>
  selected.value[attributeId] === valueId;
</script>


<template>
  <default-layout>
         <MetaTags :title="product.title" :description="product?.subtitle" :og_image="product?.thumbnail" />

    <div class="container p-4 lg:p-0 lg:py-4">
      <section class="grid grid-cols-12 gap-6">
        <!-- Product Gallery -->
        <div class="col-span-12 lg:col-span-4 flex flex-col items-center">
          <Galleria
            v-if="galleryData.length"
            :value="galleryData"
            :activeIndex="activeIndex"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            :circular="true"
            :showItemNavigators="true"
            :showItemNavigatorsOnHover="true"
            class="w-full rounded-xl shadow-md bg-white"
          >
            <template #item="slotProps">
              <img
                :src="slotProps.item.itemImageSrc"
                :alt="slotProps.item.alt"
                class="w-full object-cover rounded-xl"
              />
            </template>
            <template #thumbnail="slotProps">
              <img
                :src="slotProps.item.thumbnailImageSrc"
                :alt="slotProps.item.alt"
                class="rounded-lg h-20 object-cover"
              />
            </template>
          </Galleria>
          <img
            v-else
            :src="product.thumbnail ? `/${product.thumbnail}` : '/no-image.png'"
            alt="Product Image"
            class="w-full h-72 object-cover rounded-xl shadow-md bg-white"
          />
        </div>

        <!-- Product Info -->
        <div class="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex items-start justify-between">
              <div>
                <h1 class="font-bold text-3xl text-gray-900 capitalize">
                  {{ product.title }}
                </h1>
                <p class="text-base text-gray-500 capitalize">
                  {{ product.category?.title || "Uncategorized" }}
                </p>
              </div>
              <Button
                icon="pi pi-heart"
                aria-label="Add to Wishlist"
                rounded
                outlined
                class="!border-gray-300"
              />
            </div>
            <div class="flex flex-wrap items-center gap-4 mt-2">
              <span class="text-2xl font-bold text-primary-700"
                >${{ product.price }}</span
              >
              <span
                class="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                >30% OFF</span
              >
              <span class="h-5 w-px bg-gray-200"></span>
              <Tag
                :severity="currentQuantity === 0 ? 'danger' : 'success'"
                :value="
                  currentQuantity === 0 ? 'Out of Stock' : currentQuantity
                "
              />
              <span class="h-5 w-px bg-gray-200"></span>
              <span
                class="flex items-center gap-1 bg-yellow-400/90 text-white px-3 py-1 rounded-full text-sm"
              >
                <i class="pi pi-star-fill"></i>
                <span class="font-semibold">4.8</span>
              </span>
            </div>
          </div>

          <!-- Attribute Selection -->
          <div
            v-for="attribute in groupedAttributes"
            :key="attribute.id"
            class="mb-2"
          >
            <h3 class="font-medium text-lg text-gray-900 mb-1">
              {{ attribute.display_name }}
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
                  class="hidden peer"
                  @click="selectOption(attribute.id, value.id)"
                />
                <div
                  class="p-1 border border-gray-200 rounded-md text-center transition-all duration-200 font-semibold shadow-sm hover:bg-gray-50"
                  :class="[
                    isSelected(attribute.id, value.id)
                      ? 'ring-2 ring-primary-400 border-primary-400 bg-primary-50'
                      : '',
                    attribute.name === 'color'
                      ? 'w-20'
                      : 'px-4 py-1.5 rounded-full',
                  ]"
                >
                  <img
                    v-if="value.image"
                    :src="`/${value.image}`"
                    :alt="value.value"
                    class="w-full h-14 object-cover rounded"
                  />
                  <p
                    class="text-sm mt-1 capitalize"
                    :class="
                      isSelected(attribute.id, value.id)
                        ? 'text-primary-600 font-semibold'
                        : 'text-gray-600'
                    "
                  >
                    {{ value.value }}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Quantity & Cart Controls -->
          <div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <div
              class="flex items-center border rounded-full divide-x bg-white shadow-sm"
            >
              <button
                @click="quantity > 1 ? quantity-- : ''"
                class="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-l-full transition"
                :disabled="quantity <= 1"
              >
                <i class="pi pi-minus"></i>
              </button>
              <span class="px-4 py-2 w-10 text-center">{{ quantity }}</span>
              <button
                @click="quantity < 10 ? quantity++ : ''"
                class="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-r-full transition"
                :disabled="quantity >= 10"
              >
                <i class="pi pi-plus"></i>
              </button>
            </div>
            <Button
              raised
              rounded
              class="w-full sm:w-auto"
              label="Add to Cart"
              icon="pi pi-shopping-bag"
              @click="addToCart"
              :disabled="product.has_variant && !matchedVariant"
            />
          </div>

          <!-- Total Price & Buy Now -->
          <div
            class="flex items-center justify-between rounded-xl bg-primary/10 p-5 shadow"
          >
            <div>
              <p class="text-sm text-gray-600">Total Price</p>
              <h3 class="font-bold text-primary text-xl">
                ${{ (product.price * quantity).toFixed(2) }}
              </h3>
            </div>
            <Button
              raised
              rounded
              icon="pi pi-shopping-cart"
              label="Buy Now"
              class="bg-primary-600 text-white"
            />
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="col-span-12 lg:col-span-3">
          <RightSideBar :product="product" :shipping="shipping" />
        </div>
      </section>

      <!-- review -->
      <Review :product="product" />
    </div>

    <div class="container p-4 lg:p-0 lg:pb-4">
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
