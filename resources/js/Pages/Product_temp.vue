<template>
<Galleria
  v-if="galleryData.length"
  :value="galleryData"
  :activeIndex="activeIndex"
  :responsiveOptions="responsiveOptions"
  :numVisible="5"
  :circular="true"
  :showItemNavigators="true"
  :showItemNavigatorsOnHover="true"
  class="w-full"
>
  <template #item="slotProps">
    <img
      :src="`/${slotProps.item.itemImageSrc}`"
      :alt="slotProps.item.alt"
      class="w-full object-contain"
    />
  </template>

  <template #thumbnail="slotProps">
    <img
      :src="`/${slotProps.item.thumbnailImageSrc}`"
      :alt="slotProps.item.alt"
      class="rounded-lg h-20"
    />
  </template>
</Galleria>

<div class="mt-4">
  <h4 class="font-semibold text-sm text-gray-700">Available Quantity:</h4>
  <div class="text-lg text-blue-700 font-bold">
    {{ currentQuantity }}
  </div>
</div>

  <div class="space-y-4">
    <div v-for="attribute in groupedAttributes" :key="attribute.id">
      <h3 class="font-semibold text-gray-800 mb-2">{{ attribute.display_name }}</h3>
      <div class="flex gap-3 flex-wrap">
        <button
          v-for="value in attribute.values"
          :key="value.id"
          @click="selectOption(attribute.id, value.id)"
          :class="[
            'border p-2 rounded text-center',
            isSelected(attribute.id, value.id) ? 'ring-2 ring-blue-500' : 'hover:border-gray-500'
          ]"
        >
          <!-- Show image if exists -->
          <div v-if="value.image" class="w-16 h-16 mb-1">
            <img :src="'/'+value.image" alt="" class="w-full h-full object-contain" />
          </div>
          <div v-else class="px-2">
            {{ value.value }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'

const props = defineProps({
  product: Object,
})

const responsiveOptions = ref([
  { breakpoint: '1300px', numVisible: 4 },
  { breakpoint: '575px', numVisible: 3 },
])

const selected = ref({}) // { [attribute_id]: attribute_value_id }
const activeIndex = ref(0)
const galleryData = ref([])
const productImages = ref([])

// Group attributes with image support (e.g. color)
const groupedAttributes = computed(() => {
  const groups = {}

  props.product.variants.forEach(variant => {
    variant.attribute_values.forEach(av => {
      const attr = av.attribute
      if (!groups[attr.id]) {
        groups[attr.id] = {
          id: attr.id,
          name: attr.name,
          display_name: attr.display_name,
          values: [],
        }
      }

      const exists = groups[attr.id].values.find(v => v.id === av.id)
      if (!exists) {
        groups[attr.id].values.push({
          id: av.id,
          value: av.value,
          image: props.product.attribute_images?.find(img => img.attribute_value_id === av.id)?.image_path ?? null,
        })
      }
    })
  })

  return Object.values(groups)
})

// Find matched variant by selected attributes
const matchedVariant = computed(() => {
  if (!Object.keys(selected.value).length) return null

  return props.product.variants.find(variant => {
    const ids = variant.attribute_values.map(av => av.id).sort().join('-')
    const selectedIds = Object.values(selected.value).sort().join('-')
    return ids === selectedIds
  })
})

// Total or selected variant quantity
const currentQuantity = computed(() => {
  if (matchedVariant.value) return matchedVariant.value.quantity

  return props.product.variants.reduce((sum, variant) => sum + variant.quantity, 0)
})

// Initial load of main product images
onMounted(() => {
  try {
    if (props.product?.images?.length) {
      const parsed = typeof props.product.images === 'string'
        ? JSON.parse(props.product.images.replace(/,\s*\]/, ']'))
        : props.product.images

      productImages.value = parsed
    }
  } catch (e) {
    console.error('Failed to parse product images:', e)
  }

  updateGalleryData()
})

// ✅ Separate function to generate gallery
const updateGalleryData = () => {
  const colorAttr = groupedAttributes.value.find(attr => attr.name === 'color')
  const colorImages = colorAttr?.values.filter(v => v.image).map(v => ({
    itemImageSrc: v.image,
    thumbnailImageSrc: v.image,
    alt: v.value,
  })) ?? []

  galleryData.value = [
    ...productImages.value.map((img, index) => ({
      itemImageSrc: img,
      thumbnailImageSrc: img,
      alt: `Product Image ${index + 1}`,
    })),
    ...colorImages,
  ]
}

// ✅ This only updates the selected value + gallery index
const selectOption = (attributeId, valueId) => {
  selected.value[attributeId] = valueId

  const attr = groupedAttributes.value.find(attr => attr.id === attributeId)
  const selectedValue = attr?.values.find(v => v.id === valueId)

  if (selectedValue?.image) {
    const idx = galleryData.value.findIndex(img =>
      img.itemImageSrc?.includes(selectedValue.image)
    )
    if (idx !== -1) activeIndex.value = idx
  }
}

// Check selection
const isSelected = (attributeId, valueId) =>
  selected.value[attributeId] === valueId

</script>
