<template>
  <default-layout>
    <!-- ---- Shop Wrapper --->
    <div
      class="container grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 pb-16 items-start"
    >
      <!-- ---- Sidebar --->
      <aside
        class="col-span-1 bg-white dark:bg-gray-900 p-4 shadow rounded-lg h-full overflow-hidden lg:static hidden lg:block"
      >
        <div class="space-y-6 sticky top-4">
          <section>
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wide"
            >
              Filters
            </h3>
            <Accordion :value="['0']" multiple class="border-none">
              <!-- Categories Filter -->
              <AccordionPanel value="0">
                <AccordionHeader>
                  <span class="font-medium text-gray-700 dark:text-gray-200"
                    >Categories</span
                  >
                </AccordionHeader>
                <AccordionContent>
                  <ul class="space-y-2">
                    <li
                      v-for="category in categories"
                      :key="category.id"
                      class="flex items-center gap-2"
                    >
                      <Checkbox
                        v-model="filters.categories"
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
              <!-- Brands Filter -->
              <AccordionPanel value="1" v-if="brands.length">
                <AccordionHeader>
                  <span class="font-medium text-gray-700 dark:text-gray-200"
                    >Brands</span
                  >
                </AccordionHeader>
                <AccordionContent>
                  <ul class="space-y-2">
                    <li
                      v-for="brand in brands"
                      :key="brand.id"
                      class="flex items-center gap-2"
                    >
                      <Checkbox
                        v-model="filters.brands"
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
              <!-- Price Filter -->
              <AccordionPanel value="2">
                <AccordionHeader>
                  <span class="font-medium text-gray-700 dark:text-gray-200"
                    >Price</span
                  >
                </AccordionHeader>
                <AccordionContent>
                  <div class="flex items-center gap-2 mb-3">
                    <input
                      v-model.number="filters.price[0]"
                      type="number"
                      min="0"
                      :max="maxPrice"
                      class="w-20 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Min"
                    />
                    <span class="text-gray-400">-</span>
                    <input
                      v-model.number="filters.price[1]"
                      type="number"
                      min="0"
                      :max="maxPrice"
                      class="w-20 border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Max"
                    />
                  </div>
                  <Slider
                    v-model="filters.price"
                    range
                    class="w-full"
                    :min="0"
                    :max="maxPrice"
                  />
                </AccordionContent>
              </AccordionPanel>
              <!-- Attribute Filters -->
              <AccordionPanel
                v-for="attribute in attributes"
                :key="attribute.id"
                :value="`attr-${attribute.id}`"
              >
                <AccordionHeader>
                  <span class="font-medium text-gray-700 dark:text-gray-200">{{
                    attribute.display_name
                  }}</span>
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
                          v-model="filters.attributes[attribute.name]"
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
                          v-model="filters.attributes[attribute.name]"
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
          </section>
        </div>
      </aside>

      <!-- ---- End Sidebar --->

      <!-- ---- Product --->
      <div class="col-span-3 card rounded-lg">
        <!-- ---Product Wrapper --->

        <DataView
          v-if="products.data && products.data.length"
          lazy
          :loading="!products.data"
          :value="products.data"
          :layout="viewMode"
          :paginator="true"
          :rows="products.per_page"
          :totalRecords="products.total"
          :first="(filters.page - 1) * products.per_page"
          @page="onPageChange"
        >
          <template #header>
            <!-- ---- Shorting --->
            <div class=" flex justify-between items-center">
              <Select
                v-model="filters.sort"
                :options="sortOptions"
                option-label="label"
                option-value="value"
                placeholder="Default sorting"
                class="w-44 text-sm text-gray-600 shadow-sm"
                checkmark
                :highlightOnSelect="false"
              />

              <div class="flex gap-2 ml-auto">
                <SelectButton
                  v-model="viewMode"
                  :options="viewOptions"
                  :allowEmpty="false"
                >
                  <template #option="{ option }">
                    <span class="sr-only">{{ option }}</span>
                    <i
                      class="p-1"
                      :class="[
                        option === 'list' ? 'pi pi-bars' : 'pi pi-table',
                      ]"
                    />
                  </template>
                </SelectButton>
              </div>
            </div>

            <!-- ----End Shorting --->
          </template>

          <template #list="slotProps">
            <div class="flex flex-col">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div
                  class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                  :class="{
                    'border-t border-surface-200 dark:border-surface-700':
                      index !== 0,
                  }"
                >
                  <div class="md:w-40 relative">
                    <img
                      class="block xl:block mx-auto rounded w-full"
                      :src="`/${item.thumbnail}`"
                      :alt="item.title"
                    />
                    <!-- <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                            <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag>
                        </div> -->
                  </div>
                  <div
                    class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                  >
                    <div
                      class="flex flex-row md:flex-col justify-between items-start gap-2"
                    >
                      <div>
                        <span
                          class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                          >{{ item.category?.title || "Uncategorized" }}</span
                        >
                        <div class="text-lg font-medium mt-2">
                          {{ item.title }}
                        </div>
                      </div>
                      <div
                        class="bg-surface-100 p-1"
                        style="border-radius: 30px"
                      >
                        <div
                          class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                          style="
                            border-radius: 30px;
                            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                              0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                          "
                        >
                          <span class="text-surface-900 font-medium text-sm"
                            >5</span
                          >
                          <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold"
                        >${{ item.price }}</span
                      >
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <Button icon="pi pi-heart" outlined></Button>
                        <Button
                          icon="pi pi-shopping-cart"
                          label="Buy Now"
                          :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                          class="flex-auto md:flex-initial whitespace-nowrap"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #grid="slotProps">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              <ProductCard
                v-for="(item, index) in slotProps.items"
                :key="index"
                :product="item"
              />
            </div>
          </template>
        </DataView>

        <!-- --End Product Wrapper --->
      </div>

      <!-- ---- End Product --->
    </div>

    <!-- ---- End Shop Wrapper --->
  </default-layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { router } from "@inertiajs/vue3";
import DefaultLayout from "@/Layouts/Default.vue";
import ProductCard from "@/Components/ProductCard.vue";
import BaseIcon from "@/Components/BaseIcon.vue";
const props = defineProps({
  products: Object,
  categories: Object,
  brands: Object,
  attributes: Object,
});
const selectedSort = ref("default");
const sortOptions = ref([
  { label: "Default sorting", value: "default" },
  { label: "Sort by popularity", value: "popularity" },
  { label: "Sort by average rating", value: "rating" },
  { label: "Sort by latest", value: "latest" },
  { label: "Sort by price: low to high", value: "low" },
  { label: "Sort by price: high to low", value: "high" },
]);
const onSortChange = (event) => {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf("!") === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};
const viewMode = ref("grid");
const viewOptions = ref(["list", "grid"]);
const maxPrice =ref(10000)
const filters = reactive({
  categories: [],
  brands: [],
  attributes: {},
  price: [0, 100000],
  sort: "default",
  page: 1,
});

// Ensure attribute arrays are initialized for checkbox v-model
onMounted(() => {
  if (props.attributes && Array.isArray(props.attributes)) {
    props.attributes.forEach(attr => {
      if (attr.name !== 'color' && !Array.isArray(filters.attributes[attr.name])) {
        filters.attributes[attr.name] = [];
      }
    });
  }
});

const onPageChange = (event) => {
  filters.page = event.page + 1;
};
watch(
  () => ({ ...filters }),
  (newFilters) => {
    router.get(
      route("shop"),
      {
        categories: newFilters.categories,
        brands: newFilters.brands,
        attributes: newFilters.attributes,
        price: newFilters.price,
        sort: newFilters.sort,
        page: newFilters.page,
      },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
      }
    );
  },
  { deep: true }
);
</script>

<style>
</style>
