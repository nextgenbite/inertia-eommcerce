<template>

  <!-- Mobile -->
  <div class="w-full lg:max-w-lg lg:hidden">

    <IconField>
      <InputIcon class="pi pi-search" />
      <!-- <AutoComplete
      class="w-full"
        v-model="selectedProduct"
        :suggestions="suggestions"
        optionLabel="name"
        placeholder="What are you looking for..."
        @complete="onSearch"
      /> -->
          <InputText
        v-model="query"
        class="w-full"
        placeholder="What are you looking for..."
        @input="debouncedSearch"
      />
    </IconField>
  </div>

  <!-- Desktop -->
  <div class="w-full lg:max-w-lg hidden lg:flex">
    <InputGroup class="rounded-full">
      <!-- <InputText
        v-model="query"
        placeholder="What are you looking for..."
        @input="debouncedSearch"
      /> -->
          <AutoComplete
      class="w-full"
        v-model="selectedProduct"
        :suggestions="suggestions"
        optionLabel="title"
        placeholder="What are you looking for..."
        @complete="onSearch"
      >
        <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.title" :src="slotProps.option.thumbnail ? `/${slotProps.option.thumbnail}` : '/no-image.png'" style="width: 18px" />
            <div class="ml-2">{{ slotProps.option.title }}</div>
        </div>
    </template>
    <template #header>
        <div class="font-medium px-3 py-2">Available Products</div>
    </template>

      </AutoComplete>
      <Button icon="pi pi-search" @click="manualSearch" />
    </InputGroup>
  </div>
</template>

<script setup>
import { ref,watch } from 'vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'
import { debounce } from 'lodash'

// const { debounce } = pkg

const query = ref('')
const selectedProduct = ref(null)
const suggestions = ref([])

// Autocomplete live search
const onSearch = async (e) => {
  if (!e.query.trim().length) {
    suggestions.value = []
    return
  }

  try {
    const res = await axios.get('/products/search', {
      params: { query: e.query }
    })
    suggestions.value = res.data
  } catch (err) {
    console.error('Search error:', err)
  }
}

// Manual search for desktop input
const manualSearch = () => {
  if (query.value.trim().length) {
    router.visit(`/products/search?query=${query.value}`)
  }
}

// Debounced version to avoid too many requests
const debouncedSearch = debounce(manualSearch, 300)

// ✅ Watch selectedProduct change and redirect
watch(selectedProduct, (product) => {
  if (product && product.slug) {
    router.visit(`/product/${product.slug}`)
    // Or use: window.location.href = `/product/${product.slug}`
  }
})
</script>
