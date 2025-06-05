<template>
  <div class="relative inline-block text-left">
    <OverlayBadge :value="cartStore.cartCount" severity="danger">
      <Button
        icon="pi pi-shopping-bag"
        v-styleclass="{
          selector: '.box1',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }"
        variant="text"
        raised
        rounded
        aria-label="Filter"
      />
    </OverlayBadge>

    <div
      class="hidden animate-duration-300 box1 origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="p-4 max-h-96 overflow-y-auto">
        <div
          v-if="!cartStore.cart?.items?.length"
          class="text-center text-xl text-gray-400 py-8"
        >
          <i class="pi pi-shopping-bag" style="font-size: 2rem"></i><br />
          Your cart is empty.
        </div>
        <div
          v-else
          v-for="item in cartStore.cart.items"
          :key="item.variant?.id || item.product?.id"
          class="flex items-center gap-3 py-2 border-b last:border-b-0"
        >
          <img
            :src="item.product.thumbnail ?'/' + item.product.thumbnail : '/no-image.png'"
            :alt="item.product.title"
            class="w-14 h-14 rounded-lg object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between w-full">
              <h5 class="font-manrope font-semibold text-sm text-gray-900">
                {{ item.product.title }} -
                {{ item.variant?.sku || "Base Product" }}
              </h5>
              <Button
                @click="remove(item)"
                raised
                rounded
                outlined
                icon="pi pi-trash"
                size="small"
                severity="danger"
              />
            </div>
            <!-- <p class="font-normal text-base leading-7 text-gray-500 mb-6">
                            Introducing our sleek round white portable speaker, the epitome of style and sound! Elevate your auditory experience with this compact yet powerful device that delivers crystal-clear audio wherever you go. <a href="javascript:;"
                            class="text-indigo-600">More....</a>
                        </p> -->
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <Button
                  @click="updateQty(item, item.quantity - 1)"
                  severity="secondary"
                  raised
                  rounded
                  outlined
                  icon="pi pi-minus"
                  size="small"
                />

                <input
                  type="text"
                  id="number"
                  class="border border-gray-200 shadow shadow-primary-200 rounded-full w-8 aspect-square outline-none text-gray-900 font-semibold text-sm py-0.5 px-1 bg-gray-100 text-center"
                  placeholder="1"
                  v-model.number="item.quantity"
                  readonly
                />
                <Button
                  @click="updateQty(item, item.quantity + 1)"
                  severity="secondary"
                  raised
                  rounded
                  outlined
                  icon="pi pi-plus"
                  size="small"
                />
              </div>
              <h6 class="text-primary font-manrope font-bold text-right">
                ${{ item.product.price * item.quantity }}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cartStore.cart?.items?.length" class="border-t px-4 py-3">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold text-gray-700">Subtotal</span>
          <span class="font-bold text-primary">${{ subtotal }}</span>
        </div>
        <Link
          href="/checkout"
          class="w-full block text-center py-2 bg-primary text-white rounded-full hover:bg-primary-700 transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Link } from "@inertiajs/vue3";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const updateQty = async (item, qty) => {
  await cartStore.updateQuantity({
    variant_id: item.variant?.id,
    product_id: item.product?.id,
    quantity: qty,
  });
};

const remove = async (item) => {
  await cartStore.removeFromCart({
    variant_id: item.variant?.id,
    product_id: item.product?.id,
  });
};

// const toggleDropdown = () => ()

const subtotal = computed(() => {
  const items = cartStore.getCartItems();
  if (!Array.isArray(items) || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    // Ensure product and price exist and are numbers
    const price = Number(item?.product?.price) || 0;
    const qty = Number(item?.quantity) || 0;
    return sum + price * qty;
  }, 0);
});
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
