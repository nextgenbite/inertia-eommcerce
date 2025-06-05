<template>
  <default-layout>
    <!-- ---- Shop Wrapper --->
    <div
      class="container grid grid-cols-1 lg:grid-cols-4 gap-6 pt-4 pb-16 items-start"
    >
      <!-- ---- Sidebar --->
      <div
        class="col-span-1 bg-white p-2 shadow-sm rounded h-full overflow-hidden lg:static hidden lg:block"
      >
        <div class="divide-gray-300 divide-y space-y-4 relative">
          <!-- ---- filter --->
          <div class="relative">
            <div
              class="lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer"
            ></div>
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">
              Filter By
            </h3>
            <Accordion :value="['0']" multiple>
              <AccordionPanel value="0">
                <AccordionHeader>Categories</AccordionHeader>
                <AccordionContent>
                  <!-- ----Single Category  --->
                  <div
                    class="flex items-center"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <Checkbox
                      v-model="filters.categories"
                      :inputId="`category-${category.id}`"
                      :value="category.id"
                      name="category"
                    />
                    <label
                      :for="category.title"
                      class="text-gray-600 ml-3 cursor-pointer capitalize"
                      >{{ category.title }}</label
                    >

                    <div class="ml-auto text-gray-600 text-sm">
                      {{ category.products_count }}
                    </div>
                  </div>
                  <!-- ----End Single Category --->
                </AccordionContent>
              </AccordionPanel>
              <!-- ---- End Categoryfilter --->
              <!-- ---- Brand filter --->
              <AccordionPanel value="1" v-if="brands.length > 0">
                <AccordionHeader>Brand</AccordionHeader>
                <AccordionContent>
                  <!-- ----Single Brand  --->
                  <div
                    class="flex items-center"
                    v-for="(brand, index) in brands"
                    :key="index"
                  >
                    <Checkbox
                      v-model="filters.brands"
                      :inputId="`brand-${brand.id}`"
                      :value="brand.id"
                      name="brand"
                    />
                    <label
                      :for="brand.title"
                      class="text-gray-600 ml-3 cursor-pointer capitalize"
                      >{{ brand.title }}</label
                    >
                    <div class="ml-auto text-gray-600 text-sm">
                      ({{ brand.products_count }})
                    </div>
                  </div>
                  <!-- ----End Single Brand --->
                </AccordionContent>
              </AccordionPanel>
              <!-- ----End Brand filter --->
              <!-- ---- Price filter --->
              <AccordionPanel value="2">
                <AccordionHeader>Price</AccordionHeader>
                <AccordionContent>
                  <div class="mt-4 p-4 flex items-center">
                    <input
                      v-model="filters.price[0]"
                      type="text"
                      minlength="1"
                      class="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                      placeholder="Min"
                    />
                    <span class="mx-3 text-gray-500"> - </span>
                    <input
                      v-model="filters.price[1]"
                      type="text"
                      class="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                      placeholder="Max"
                    />
                  </div>
                  <Slider v-model="filters.price" range class="w-full" />
                </AccordionContent>
              </AccordionPanel>
              <!-- ---- End Price filter --->
              <!-- ---- Attribute filter --->
              <AccordionPanel
                v-for="(attribute, index) in attributes"
                :key="index"
                :value="index"
              >
                <AccordionHeader>{{ attribute.display_name }}</AccordionHeader>
                <AccordionContent>
                  <!-- ---- Single Value --->

                  <div class="flex items-center gap-2">
                    <div v-for="value in attribute.values" :key="value.id">
                      <!-- Render color selector if attribute is color -->
                      <div
                        v-if="attribute.name === 'color'"
                        class="color-selector"
                      >
                        <input
                          type="radio"
                          :name="'attribute-color-' + attribute.id"
                          class="hidden"
                          :id="'color-' + value.value"
                        />
                        <label
                          :for="'color-' + value.value"
                          :style="{ backgroundColor: value.value }"
                          class="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                        ></label>
                      </div>
                      <!-- Otherwise render checkbox for other attributes -->
                      <div v-else class="size-selector">
                        <input
                          type="checkbox"
                          :name="'attribute-' + attribute.id"
                          :value="value.id"
                          class="hidden peer"
                          :id="
                            'attribute-' + attribute.id + '-value-' + value.id
                          "
                        />
                        <label
                          :for="
                            'attribute-' + attribute.id + '-value-' + value.id
                          "
                          class="text-xs border border-gray-200 rounded-sm p-2 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 peer-checked:ring-2 ring-primary-300"
                          >{{ value.value }}</label
                        >
                      </div>
                    </div>
                    <!-- ---- End Single Value --->
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <!-- ---- End Attribute filter --->
            </Accordion>
          </div>
          <!-- ---- End Categoryfilter --->
        </div>
      </div>

      <!-- ---- End Sidebar --->

      <!-- ---- Product --->
      <div class="col-span-3">
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
            <div class="mb-4 flex items-center">
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
                          >{{ item.category?.title || 'Uncategorized' }}</span
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
            <div class="grid grid-cols-4 gap-4">
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

const filters = reactive({
  categories: [],
  brands: [],
  attributes: {},
  price: [0, 100000],
  sort: "default",
  page: 1,
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
