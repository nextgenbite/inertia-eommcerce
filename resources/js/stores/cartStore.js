import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(sessionStorage.getItem('cart')) || { items: [], count: 0 },
    cartCount: 0
  }),
  actions: {
    async loadCart() {
      const { data } = await axios.get('/cart')
      this.cart = data.data;
        this.cartCount = data.data.items.length || 0
      sessionStorage.setItem('cart', JSON.stringify(data))
    },
    async addToCart(payload) {
      const { data } = await axios.post('/cart', payload)
      this.cart = data.data;
       this.cartCount = data.data.items.length || 0
      sessionStorage.setItem('cart', JSON.stringify(data))
    },
    async updateQuantity(payload) {
      const { data } = await axios.put('/cart', payload)
      this.cart = data.data;
       this.cartCount = data.data.items.length || 0
      sessionStorage.setItem('cart', JSON.stringify(data))
    },
    async removeFromCart(payload) {
      const { data } = await axios.delete('/cart', { data: payload })
            this.cart = data.data;
       this.cartCount = data.data.items.length || 0
      sessionStorage.setItem('cart', JSON.stringify(data))
    },
    getItemCount() {
        console.log(this.cart);

      return this.cart?.items?.length || 0
    },
    getCartItems() {
      return this.cart?.items || []
    }
  }
})
