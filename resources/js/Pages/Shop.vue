<template>
  <default-layout>
    <!-- ---- Shop Wrapper --->
    <div
      class="container grid grid-cols-1 lg:grid-cols-4 gap-6 items-start p-4 lg:p-0 lg:py-4"
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
            <Filters
              v-model:filters="filters"
              :categories="categories"
              :brands="brands"
              :attributes="attributes"
              :filters="filters"
              :maxPrice="maxPrice"
            />
          </section>
        </div>
      </aside>

      <!-- ---- End Sidebar --->

      <!-- ---- Product --->
      <div class="col-span-3 p-2 bg-white rounded-lg">
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
            <div class="flex justify-between items-center">
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
              <!-- Filter Button for Mobile with Modern UI and Hover Effect -->
              <button
                v-ripple
                @click="filterDrawer = true"
                class="lg:hidden px-3 py-1.5 rounded-md bg-primary shadow text-white flex items-center gap-2 transition duration-200 hover:bg-primary-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <i class="pi pi-filter"></i>
                <span class="font-medium">Filters</span>
              </button>
              <Drawer v-model:visible="filterDrawer" header="Filter">
                <!-- {{filters}} -->
                <Filters
                  v-model:filters="filters"
                  :categories="categories"
                  :brands="brands"
                  :attributes="attributes"
                  :filters="filters"
                  :maxPrice="maxPrice"
                />
              </Drawer>
              <div class="hidden lg:flex gap-2 ml-auto">
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
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
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
import Filters from "@/Components/Frontend/Shop/Filters.vue";
const props = defineProps({
  products: Object,
  categories: Object,
  brands: Object,
  attributes: Object,
});
const filterDrawer = ref(false);
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
const maxPrice = ref(10000);
const filters = reactive({
  categories: [],
  brands: [],
  attributes: {},
  price: [0, 100000],
  sort: "default",
  page: 1,
});

// Ensure attribute arrays are initialized for checkbox v-model
// onMounted(() => {
//   if (props.attributes && Array.isArray(props.attributes)) {
//     props.attributes.forEach((attr) => {
//       if (
//         attr.name !== "color" &&
//         !Array.isArray(filters.attributes[attr.name])
//       ) {
//         filters.attributes[attr.name] = [];
//       }
//     });
//   }
// });

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
