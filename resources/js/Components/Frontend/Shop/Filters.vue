<template>
  <Accordion :value="['0']" multiple class="border-none">
    <!-- Categories -->
    <AccordionPanel value="0">
      <AccordionHeader>
        <span class="font-medium text-gray-700 dark:text-gray-200">Categories</span>
      </AccordionHeader>
      <AccordionContent>
        <ul class="space-y-2">
          <li v-for="category in categories" :key="category.id" class="flex items-center gap-2">
            <Checkbox
              v-model="localFilters.categories"
              :inputId="`category-${category.id}`"
              :value="category.id"
              name="category"
              class="accent-primary"
            />
            <label
              :for="`category-${category.id}`"
              class="text-gray-700 dark:text-gray-300 cursor-pointer capitalize flex-1"
            >
              {{ category.title }}
            </label>
            <span class="text-xs text-gray-500">
              {{ category.products_count }}
            </span>
          </li>
        </ul>
      </AccordionContent>
    </AccordionPanel>

    <!-- Brands -->
    <AccordionPanel value="1" v-if="brands.length">
      <AccordionHeader>
        <span class="font-medium text-gray-700 dark:text-gray-200">Brands</span>
      </AccordionHeader>
      <AccordionContent>
        <ul class="space-y-2">
          <li v-for="brand in brands" :key="brand.id" class="flex items-center gap-2">
            <Checkbox
              v-model="localFilters.brands"
              :inputId="`brand-${brand.id}`"
              :value="brand.id"
              name="brand"
              class="accent-primary"
            />
            <label
              :for="`brand-${brand.id}`"
              class="text-gray-700 dark:text-gray-300 cursor-pointer capitalize flex-1"
            >
              {{ brand.title }}
            </label>
            <span class="text-xs text-gray-500">
              {{ brand.products_count }}
            </span>
          </li>
        </ul>
      </AccordionContent>
    </AccordionPanel>

    <!-- Price -->
    <AccordionPanel value="2">
      <AccordionHeader>
        <span class="font-medium text-gray-700 dark:text-gray-200">Price</span>
      </AccordionHeader>
      <AccordionContent>
        <div class="flex items-center gap-2 mb-3">
          <input
            v-model.number="localFilters.price[0]"
            type="number"
            min="0"
            :max="maxPrice"
            class="w-full border border-gray-300 dark:border-gray-700 rounded text-center px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Min"
          />
          <span class="text-gray-400">-</span>
          <input
            v-model.number="localFilters.price[1]"
            type="number"
            min="0"
            :max="maxPrice"
            class="w-full border border-gray-300 dark:border-gray-700 rounded text-center px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Max"
          />
        </div>
        <Slider
          v-model="localFilters.price"
          range
          class="w-full"
          :min="0"
          :max="maxPrice"
        />
      </AccordionContent>
    </AccordionPanel>

    <!-- Dynamic Attributes -->
    <AccordionPanel
      v-for="attribute in attributes"
      :key="attribute.id"
      :value="`attr-${attribute.id}`"
    >
      <AccordionHeader>
        <span class="font-medium text-gray-700 dark:text-gray-200">
          {{ attribute.display_name }}
        </span>
      </AccordionHeader>
      <AccordionContent>
        <div class="flex flex-wrap gap-2">
          <template v-for="value in attribute.values" :key="value.id">
            <div v-if="attribute.name === 'color'">
              <input
                type="radio"
                :name="`attribute-color-${attribute.id}`"
                class="hidden peer"
                :id="`color-${value.value}`"
                :value="value.value"
                v-model="localFilters.attributes[attribute.name]"
              />
              <label
                :for="`color-${value.value}`"
                :style="{ backgroundColor: value.value }"
                class="h-6 w-6 rounded-full border-2 border-gray-200 dark:border-gray-700 cursor-pointer flex items-center justify-center peer-checked:ring-2 ring-primary-400"
              ></label>
            </div>
            <div v-else>
              <input
                type="checkbox"
                :name="`attribute-${attribute.id}`"
                :value="value.id"
                class="hidden peer"
                :id="`attribute-${attribute.id}-value-${value.id}`"
                v-model="localFilters.attributes[attribute.name]"
              />
              <label
                :for="`attribute-${attribute.id}-value-${value.id}`"
                class="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-200 cursor-pointer peer-checked:bg-primary-500 peer-checked:text-white transition"
              >
                {{ value.value }}
              </label>
            </div>
          </template>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const filtersModel = defineModel('filters');

const props = defineProps({
  categories: Array,
  brands: Array,
  attributes: Array,
  maxPrice: Number,
});

// Use computed getter/setter for true v-model support
const localFilters = computed({
  get: () => filtersModel.value || {
    categories: [],
    brands: [],
    attributes: {},
    price: [0, props.maxPrice || 10000],
    sort: 'default',
    page: 1,
  },
  set: (val) => {
    filtersModel.value = val;
  }
});

// Initialize attribute arrays for checkboxes (if not present)
onMounted(() => {
  if (!localFilters.value.attributes) localFilters.value.attributes = {};

  props.attributes?.forEach(attr => {
    if (
      attr.name !== 'color' &&
      !Array.isArray(localFilters.value.attributes[attr.name])
    ) {
      localFilters.value.attributes[attr.name] = [];
    }
  });
});
</script>
