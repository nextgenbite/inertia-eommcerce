<template>
  <default-layout>

      <section class="container grid grid-cols-1 lg:grid-cols-2 gap-2 py-8">
          <div class="w-full h-full max-lg:mx-auto mx-0">
<h2>Order Details</h2>
<form action="" class="grid grid-cols-1 gap-4">
    <div>
        <label class="font-semibold text-xl block mb-1" for="name">Name</label>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText id="name" v-model="form.name" placeholder="Full Name" />
        </InputGroup>
    </div>

    <div>
        <label class="font-semibold block mb-1" for="email">Email</label>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-envelope"></i>
            </InputGroupAddon>
            <InputText id="email" v-model="form.email" placeholder="Email" />
        </InputGroup>
    </div>

    <div>
        <label class="font-semibold block mb-1" for="phone">Phone</label>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-phone"></i>
            </InputGroupAddon>
            <InputText id="phone" v-model="form.phone" placeholder="Phone" />
        </InputGroup>
    </div>

    <div>
        <label class="font-semibold block mb-1" for="address">Address</label>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-map-marker"></i>
            </InputGroupAddon>
            <InputText id="address" v-model="form.address" placeholder="Street Address" />
        </InputGroup>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label class="font-semibold block mb-1" for="city">City</label>
            <InputText id="city" v-model="form.city" placeholder="City" />
        </div>
        <div>
            <label class="font-semibold block mb-1" for="state">State</label>
            <InputText id="state" v-model="form.state" placeholder="State" />
        </div>
        <div>
            <label class="font-semibold block mb-1" for="zip">Zip Code</label>
            <InputText id="zip" v-model="form.zip" placeholder="Zip Code" />
        </div>
    </div>

    <div>
        <label class="font-semibold block mb-1" for="country">Country</label>
        <InputText id="country" v-model="form.country" placeholder="Country" />
    </div>

    <button type="submit" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
        Place Order
    </button>
</form>

        </div>
            <div class="w-full h-full max-lg:mx-auto mx-0">
                <h2 class="text-2xl font-semibold mb-4">Shpping Cart</h2>
<div
    class="rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
>
    <div class="p-4 max-h-96 overflow-y-auto">
        <div v-if="cart.length === 0" class="text-center text-gray-500 py-8">
            Your cart is empty.
        </div>

        <div v-for="(item, idx) in cart" :key="item.id" class="flex items-center gap-4 py-3 border-b last:border-b-0 ">
            <img :src="item.img" :alt="item.name" class="w-20 h-20 rounded-lg object-cover">
            <div class="flex-1">
                <div class="flex items-center justify-between w-full">
                    <h5 class="font-manrope font-semibold text-base text-gray-900">
                        {{item.name}}
                    </h5>
                    <Button raised rounded outlined icon="pi pi-trash" size="small" severity="danger" style="font-size: 1rem; height: 2.25rem; width: 2.25rem;" />
                </div>
                <!-- Color and Size display -->
                <div class="flex gap-4 text-sm text-gray-500 mb-2">
                    <span v-if="item.color">Color: <span class="font-semibold text-gray-700">{{ item.color }}</span></span>
                    <span v-if="item.size">Size: <span class="font-semibold text-gray-700">{{ item.size }}</span></span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <Button @click="decrement(idx)" severity="secondary" raised rounded outlined icon="pi pi-minus" size="small" style="font-size: 1rem; height: 2rem; width: 2rem;" />
                        <input type="text" id="number"
                            class="border border-gray-200 shadow shadow-primary-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-base py-1 px-2 bg-gray-100 text-center"
                            placeholder="1" v-model.number="item.qty" readonly>
                        <Button @click="increment(idx)" severity="secondary" raised rounded outlined icon="pi pi-plus" size="small" style="font-size: 1rem; height: 2rem; width: 2rem;" />
                    </div>
                    <h6 class="text-primary font-manrope font-bold text-lg text-right">${{ item.price * item.qty }}</h6>
                </div>
            </div>
        </div>
    </div>
             <div v-if="cart.length" class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div class="flex items-center justify-between w-full mb-2">
                    <p class="text-xl text-gray-400">Sub Total</p>
                    <h6 class="font-semibold text-xl text-gray-900">${{ subtotal }}</h6>
                </div>
                <div class="flex items-center justify-between w-full pb-2 border-b border-gray-200">
                    <p class="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                    <h6 class="font-semibold text-xl leading-8 text-gray-900">$45.00</h6>
                </div>
                <div class="flex items-center justify-between w-full py-2">
                    <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                    <h6 class="font-manrope font-medium text-2xl leading-9 text-indigo-500">${{ subtotal }}</h6>
                </div>
            </div>

    <div v-if="cart.length" class="border-t px-4 py-3">

        <Link href="/checkout" class="w-full block text-center py-3 bg-primary text-white rounded-full hover:bg-primary-700 transition text-base">
            Checkout
        </Link>
    </div>
</div>
</div>
      </section>

  </default-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import {Link} from '@inertiajs/vue3';


// const props = defineProps({
//   product: Object,
//   relatedProducts: Array,
// });
const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
});

const cart = ref([
    {
        id: 1,
        name: 'Round white portable speaker',
        img: 'https://pagedone.io/asset/uploads/1701162826.png',
        price: 220,
        qty: 2,
        color: 'White',
        size: 'Medium',
    },
    {
        id: 2,
        name: 'Gray round portable speaker',
        img: 'https://pagedone.io/asset/uploads/1701162839.png',
        price: 220,
        qty: 1,
        color: 'Gray',
        size: 'Large',
    },
    {
        id: 3,
        name: 'Black round portable speaker',
        img: '/no-image.png',
        price: 220,
        qty: 2,
        color: 'Black',
        size: 'Small',
    },
    {
        id: 4,
        name: 'Blue round portable speaker',
         img: '/no-image.png',
        price: 220,
        qty: 1,
        color: 'Blue',
        size: 'Large',
    },
])

const toggleDropdown = () => (open.value = !open.value)
const remove = idx => cart.value.splice(idx, 1)
const increment = idx => cart.value[idx].qty++
const decrement = idx => {
    if (cart.value[idx].qty > 1) cart.value[idx].qty--
}
const subtotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

</script>

<style>
/* .nav-for-slider .swiper-slide {
            height: auto;
            width: auto;
            cursor: pointer;

        }
        .swiper-wrapper{
            height: auto;
        }
        .nav-for-slider .swiper-slide img{
            border:2px solid transparent;
            border-radius: 10px;

        }
        .nav-for-slider .swiper-slide-thumb-active img{

            border-color: rgb(79 70 229 );
        } */
</style>
