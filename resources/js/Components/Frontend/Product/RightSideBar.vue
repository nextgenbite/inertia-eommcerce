<script setup>
import { ref } from "vue";
import BaseIcon from "@/Components/BaseIcon.vue";
defineProps({
     product: Object,
     shipping: Object,
    //  feature: Array
})
const feature = ref([
  { id: "2", name: " Fast Delivery", icon: "truck" },
  { id: "1", name: "Safe Payment", icon: "money" },
  { id: "3", name: "Money Return", icon: "money_return" },
  { id: "4", name: "Authentic Products", icon: "shield" },
]);

</script>
<template>
          <Listbox :options="feature" optionLabel="name" class="w-full">
            <template #option="{ option }">
              <div class="flex items-center gap-2">
                <BaseIcon
                  customClass="mx-auto"
                  :name="option.icon"
                  size="20px"
                  fill="var(--p-primary-color)"
                />
                <span class="">{{ option.name }}</span>
              </div>
            </template>
          </Listbox>
          <div class="mt-4 bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-semibold mb-2 card-header">
              Share this product
            </h3>
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
          <div
            class="mt-4 bg-white rounded-lg shadow p-4"
            v-show="product.tags && product.tags.length"
          >
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
            <h3 class="text-lg font-semibold mb-2 card-header">
              Shipping Info
            </h3>
            <template v-for="item in shipping" :key="item.id">

            <p class="text-gray-600 mb-2">
              <strong>Area:</strong>
              {{ item.title}}</p>
            <p class="text-gray-600 mb-2">
              <strong>Shipping Cost:</strong> ${{
                item.cost || "Free"
              }}
            </p>
            <p v-if="item.eta" class="text-gray-600 mb-2">
              <strong>ETA:</strong>
              {{ item.eta }}
            </p>
            </template>
          </div>
</template>
