<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

const props = defineProps({
  product: Object,
  availableCombinations: Array,
})

const selected = reactive({})
const allCombinations = props.availableCombinations.map(c => [...c].sort())

// Disable logic
function isSelectable(attrId, valueId) {
  const temp = { ...selected, [attrId]: valueId }
  const values = Object.values(temp).map(Number).sort()

  return allCombinations.some(combo =>
    values.every(val => combo.includes(val))
  )
}

function handleChange(attrId, valueId) {
  selected[attrId] = valueId
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6">{{ product.data.title }}</h1>

    <form>
      <div v-for="attribute in product.data.attributes" :key="attribute.id" class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ attribute.display_name }}</h3>

        <div class="flex flex-wrap gap-3">
          <label
            v-for="value in attribute.values"
            :key="value.id"
            class="cursor-pointer"
          >
            <input
              type="radio"
              :name="'attribute-' + attribute.id"
              :value="value.id"
              v-model="selected[attribute.id]"
              class="hidden peer"
              :disabled="!isSelectable(attribute.id, value.id)"
              @change="handleChange(attribute.id, value.id)"
            />
            <div
              class="p-1 border rounded-md text-center peer-checked:ring-2 ring-blue-300"
              :class="[
                !isSelectable(attribute.id, value.id) ? 'opacity-50 cursor-not-allowed' : '',
                attribute.name === 'color' ? 'w-20' : 'px-4 py-1 rounded-full'
              ]"
            >
              <img
                v-if="attribute.name === 'color'"
                :src="`/storage/${value.image}`"
                :alt="value.value"
                class="w-full h-16 object-cover rounded"
              />
              <p class="text-sm mt-1 capitalize">{{ value.value }}</p>
            </div>
          </label>
        </div>
      </div>
    </form>
  </div>
</template>
