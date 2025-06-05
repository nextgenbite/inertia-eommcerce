import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAppStore = defineStore('app', () => {
  const categories = ref(JSON.parse(sessionStorage.getItem('categories') || '[]'))
  const settings = ref(JSON.parse(sessionStorage.getItem('settings') || '{}'))
  const cart = ref(JSON.parse(sessionStorage.getItem('cart') || 'null'))
  const cartCount = ref(0)

  const loadCategories = async () => {
    if (categories.value.length === 0) {
      const { data } = await axios.get('/api/categories')
      categories.value = data
      sessionStorage.setItem('categories', JSON.stringify(data))
    }
  }

  const loadSettings = async () => {
    if (!settings.value || Object.keys(settings.value).length === 0) {
      const { data } = await axios.get('/api/settings')
      settings.value = data
      sessionStorage.setItem('settings', JSON.stringify(data))
    }
  }

    const loadCart = async () => {
      try {
        const { data } = await axios.get('/cart')
        console.log(data);

        cart.value = data
        cartCount.value = data?.items?.length || 0
        sessionStorage.setItem('cart', JSON.stringify(data))
      } catch (error) {
        console.error('Failed to load cart', error)
      }
    }
  // const loadCart = async () => {
  //   const { data } = await axios.get('/api/cart')
  //   if (data) {
  //       cart.value = data
  //       cartCount.value = data ? data.items.length : 0
  //     sessionStorage.setItem('cart', JSON.stringify(data))
  //   }
  // }

  const clearCart = () => {
    cart.value = null
    cartCount.value = 0
    sessionStorage.removeItem('cart')
  }

  return {
    categories, settings, cart,
    loadCategories, loadSettings, loadCart, clearCart
  }
})
