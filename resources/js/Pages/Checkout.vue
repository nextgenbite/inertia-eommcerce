
<template>
  <default-layout>
    <Head title="Checkout" />
    <div class="container my-8 card flex justify-center max-w-3xl">
                <div
                  v-if="!cartStore.cart?.items?.length"
                  class="text-center text-gray-400 py-8 text-3xl"
                >
                 <i class="pi pi-shopping-bag" style="font-size: 3rem;"></i><br>
                  Your cart is empty.
                </div>
      <Stepper v-else v-model:value="activeStep" class="w-full ">

        <StepList>
            <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild :value="1">
                <div class="flex flex-row flex-auto gap-2 items-center" v-bind="a11yAttrs.root">
                    <button class="bg-transparent border-0 inline-flex flex-row gap-2 items-center" @click="activateCallback" v-bind="a11yAttrs.header">
                        <span
                            :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center text-2xl',
                                { 'bg-primary text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                            ]"
                        >
                            <i class="pi pi-shopping-cart"></i>
                        </span>
                        <span class="text-xs font-medium ml-2">Cart</span>
                    </button>
                    <Divider />
                </div>
            </Step>
            <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild value="2">
                <div class="flex flex-row flex-auto gap-2 items-center pl-2" v-bind="a11yAttrs.root">
                    <button class="bg-transparent border-0 inline-flex flex-row gap-2 items-center" @click="activateCallback" v-bind="a11yAttrs.header">
                        <span
                            :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center text-2xl',
                                { 'bg-primary text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                            ]"
                        >
                            <i class="pi pi-truck"></i>
                        </span>
                        <span class="text-xs font-medium ml-2 text-nowrap">Shipping info</span>
                    </button>
                    <Divider />
                </div>
            </Step>
            <Step v-slot="{ activateCallback, value, a11yAttrs }" asChild value="3">
                <div class="flex flex-row items-center pl-2" v-bind="a11yAttrs.root">
                    <button class="bg-transparent border-0 inline-flex flex-row gap-2 items-center" @click="activateCallback" v-bind="a11yAttrs.header">
                        <span
                            :class="[
                                'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center text-2xl',
                                { 'bg-primary text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                            ]"
                        >
                            <i class="pi pi-credit-card"></i>
                        </span>
                        <span class="text-xs font-medium ml-2">Payment</span>
                    </button>
                </div>
            </Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" :value="1">
            <div
              class="rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="p-4 max-h-96 overflow-y-auto">


                <div
                  v-for="item in cartStore.cart.items"
                  :key="item.id"
                  class="flex items-center gap-4 py-3 border-b last:border-b-0"
                >
                  <img
                   :src="item.product.thumbnail ?'/' + item.product.thumbnail : '/no-image.png'"  :alt="item.product.title"
                    class="w-20 h-20 rounded-lg object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex items-center justify-between w-full">
                      <h5
                        class="font-manrope font-semibold text-base text-gray-900"
                      >
                        {{ item.product.title }} - {{ item.variant?.sku || 'Base Product' }}
                      </h5>
                      <Button
                       @click="remove(item)"
                        raised
                        rounded
                        outlined
                        icon="pi pi-trash"
                        size="small"
                        severity="danger"
                        style="font-size: 1rem; height: 2.25rem; width: 2.25rem"
                      />
                    </div>
                    <!-- Color and Size display -->
                    <div class="flex gap-4 text-sm text-gray-500 mb-2">
                      <span v-if="item.color"
                        >Color:
                        <span class="font-semibold text-gray-700">{{
                          item.color
                        }}</span></span
                      >
                      <span v-if="item.size"
                        >Size:
                        <span class="font-semibold text-gray-700">{{
                          item.size
                        }}</span></span
                      >
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center gap-2">
                        <Button
                         @click="updateQty(item, item.quantity - 1)"
                          severity="secondary"
                          raised
                          rounded
                          outlined
                          icon="pi pi-minus"
                          size="small"
                          style="font-size: 1rem; height: 2rem; width: 2rem"
                        />
                        <input
                          type="text"
                          id="number"
                          class="border border-gray-200 shadow shadow-primary-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-base py-1 px-2 bg-gray-100 text-center"
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
                          style="font-size: 1rem; height: 2rem; width: 2rem"
                        />
                      </div>
                      <h6
                        class="text-primary font-manrope font-bold text-lg text-right"
                      >
                       ${{ item.product.price * item.quantity }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="cartStore.cart?.items?.length"
                class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto"
              >
                <div class="flex items-center justify-between w-full mb-2">
                  <p class="text-xl text-gray-400">Sub Total</p>
                  <h6 class="font-semibold text-xl text-gray-900">
                    ${{ cartStore.cart.summary.subtotal }}
                  </h6>
                </div>
                <div
                  class="flex items-center justify-between w-full pb-2 border-b border-gray-200"
                >
                  <p class="font-normal text-xl leading-8 text-gray-400">
                    Delivery Charge
                  </p>
                  <h6 class="font-semibold text-xl leading-8 text-gray-900">
                    ${{ cartStore.cart.summary.shipping_cost }}
                  </h6>
                </div>
                <div
                  class="flex items-center justify-between w-full pb-2 border-b border-gray-200"
                >
                  <p class="font-normal text-xl leading-8 text-gray-400">
                    Discount
                  </p>
                  <h6 class="font-semibold text-xl leading-8 text-gray-900">
                   - ${{ cartStore.cart.summary.discount }}
                  </h6>
                </div>
                <div class="flex items-center justify-between w-full py-2">
                  <p
                    class="font-manrope font-medium text-2xl leading-9 text-gray-900"
                  >
                    Total
                  </p>
                  <h6
                    class="font-manrope font-medium text-2xl text-primary"
                  >
                     ${{ cartStore.cart.summary.total }}
                  </h6>
                </div>
              </div>
              <!--
    <div v-if="cart.length" class="border-t px-4 py-3">

        <Link href="/checkout" class="w-full block text-center py-3 bg-primary text-white rounded-full hover:bg-primary-700 transition text-base">
            Checkout
        </Link>
    </div> -->
            </div>
            <div class="flex pt-6 justify-end">
              <Button
                label="Continue to Shipping"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <form action="" class="grid grid-cols-1 gap-4">
              <div>
              <label class="font-semibold block mb-1" for="name"
                  >Name</label
                >
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-user"></i>
                  </InputGroupAddon>
                  <InputText
                    id="name"
                    v-model="form.name"
                    placeholder="Full Name"
                  />
                </InputGroup>
              </div>

              <div>
                <label class="font-semibold block mb-1" for="email"
                  >Email</label
                >
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-envelope"></i>
                  </InputGroupAddon>
                  <InputText
                    id="email"
                    v-model="form.email"
                    placeholder="Email"
                  />
                </InputGroup>
              </div>

              <div>
                <label class="font-semibold block mb-1" for="phone"
                  >Phone</label
                >
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-phone"></i>
                  </InputGroupAddon>
                  <InputText
                    id="phone"
                    v-model="form.phone"
                    placeholder="Phone"
                  />
                </InputGroup>
              </div>

              <div>
                <label class="font-semibold block mb-1" for="address"
                  >Address</label
                >
                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-map-marker"></i>
                  </InputGroupAddon>
                  <InputText
                    id="address"
                    v-model="form.address"
                    placeholder="Street Address"
                  />
                </InputGroup>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="font-semibold block mb-1" for="city"
                    >City</label
                  >
                  <InputText id="city" v-model="form.city" placeholder="City" />
                </div>
                <div>
                  <label class="font-semibold block mb-1" for="state"
                    >State</label
                  >
                  <InputText
                    id="state"
                    v-model="form.state"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label class="font-semibold block mb-1" for="zip"
                    >Zip Code</label
                  >
                  <InputText
                    id="zip"
                    v-model="form.zip"
                    placeholder="Zip Code"
                  />
                </div>
              </div>

              <div>
                <label class="font-semibold block mb-1" for="country"
                  >Country</label
                >
                <InputText
                  id="country"
                  v-model="form.country"
                  placeholder="Country"
                />
              </div>
            </form>
            <div class="flex pt-6 justify-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('1')"
              />
              <Button
                label="Continue to Payment"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="activateCallback('3')"
              />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">
    <form class="grid grid-cols-1 gap-4">
        <div>
            <label class="font-semibold block mb-2">Select Payment Method</label>
            <div class=" flex flex-col md:flex-row gap-2 payment">

             <Listbox v-model="form.paymentMethod" :options="paymentMethod" optionLabel="name" optionValue="code" class="w-full md:w-56 h-full" />

        <!-- Cash on Delivery -->
        <div v-if="form.paymentMethod === 'cod'" class="p-4 bg-gray-50 rounded w-full flex flex-col justify-center items-center">
            <p class="text-gray-700">You will pay with cash upon delivery.</p>
        </div>

        <!-- bKash -->
        <div v-if="form.paymentMethod === 'bkash'" class="p-4 bg-gray-50 rounded w-full text-center">
            <label class="block mb-1 font-semibold" for="bkashNumber">bKash Number</label>
            <InputText id="bkashNumber" v-model="form.bkashNumber" placeholder="Enter your bKash number" />
            <label class="block mt-2 mb-1 font-semibold" for="bkashTrx">Transaction ID</label>
            <InputText id="bkashTrx" v-model="form.bkashTrx" placeholder="Enter bKash transaction ID" />
        </div>

        <!-- Nagad -->
        <div v-if="form.paymentMethod === 'nagad'" class="p-4 bg-gray-50 rounded w-full text-center">
            <label class="block mb-1 font-semibold" for="nagadNumber">Nagad Number</label>
            <InputText id="nagadNumber" v-model="form.nagadNumber" placeholder="Enter your Nagad number" />
            <label class="block mt-2 mb-1 font-semibold" for="nagadTrx">Transaction ID</label>
            <InputText id="nagadTrx" v-model="form.nagadTrx" placeholder="Enter Nagad transaction ID" />
        </div>

        <!-- Rocket -->
        <div v-if="form.paymentMethod === 'rocket'" class="p-4 bg-gray-50 rounded w-full text-center">
            <label class="block mb-1 font-semibold" for="rocketNumber">Rocket Number</label>
            <InputText id="rocketNumber" v-model="form.rocketNumber" placeholder="Enter your Rocket number" />
            <label class="block mt-2 mb-1 font-semibold" for="rocketTrx">Transaction ID</label>
            <InputText id="rocketTrx" v-model="form.rocketTrx" placeholder="Enter Rocket transaction ID" />
        </div>

        <!-- Stripe -->
        <div v-if="form.paymentMethod === 'stripe'" class="p-4 bg-gray-50 rounded w-full text-center">
            <label class="font-semibold block mb-1" for="cardName">Cardholder Name</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText
                    id="cardName"
                    v-model="form.cardName"
                    placeholder="Name on Card"
                />
            </InputGroup>
            <label class="font-semibold block mb-1 mt-2" for="cardNumber">Card Number</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-credit-card"></i>
                </InputGroupAddon>
                <InputText
                    id="cardNumber"
                    v-model="form.cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                />
            </InputGroup>
            <div class="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <label class="font-semibold block mb-1" for="expiry">Expiry Date</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-calendar"></i>
                        </InputGroupAddon>
                        <InputText
                            id="expiry"
                            v-model="form.expiry"
                            placeholder="MM/YY"
                            maxlength="5"
                        />
                    </InputGroup>
                </div>
                <div>
                    <label class="font-semibold block mb-1" for="cvc">CVC</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <InputText
                            id="cvc"
                            v-model="form.cvc"
                            placeholder="CVC"
                            maxlength="4"
                        />
                    </InputGroup>
                </div>
            </div>
            <div class="flex items-center mt-2">
                <input type="checkbox" id="saveCard" v-model="form.saveCard" class="mr-2" />
                <label for="saveCard" class="text-sm text-gray-700">Save card for future purchases</label>
            </div>
        </div>

        <!-- Authorize.Net -->
        <div v-if="form.paymentMethod === 'authorize'" class="p-4 bg-gray-50 rounded w-full text-center">
            <label class="font-semibold block mb-1" for="authCardName">Cardholder Name</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText
                    id="authCardName"
                    v-model="form.authCardName"
                    placeholder="Name on Card"
                />
            </InputGroup>
            <label class="font-semibold block mb-1 mt-2" for="authCardNumber">Card Number</label>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-credit-card"></i>
                </InputGroupAddon>
                <InputText
                    id="authCardNumber"
                    v-model="form.authCardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                />
            </InputGroup>
            <div class="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <label class="font-semibold block mb-1" for="authExpiry">Expiry Date</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-calendar"></i>
                        </InputGroupAddon>
                        <InputText
                            id="authExpiry"
                            v-model="form.authExpiry"
                            placeholder="MM/YY"
                            maxlength="5"
                        />
                    </InputGroup>
                </div>
                <div>
                    <label class="font-semibold block mb-1" for="authCvc">CVC</label>
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-lock"></i>
                        </InputGroupAddon>
                        <InputText
                            id="authCvc"
                            v-model="form.authCvc"
                            placeholder="CVC"
                            maxlength="4"
                        />
                    </InputGroup>
                </div>
            </div>
        </div>

        <!-- Bank Transfer -->
        <div v-if="form.paymentMethod === 'bank'" class="p-4 bg-gray-50 rounded w-full text-center">
            <label class="block mb-1 font-semibold" for="bankName">Bank Name</label>
            <InputText id="bankName" v-model="form.bankName" placeholder="Enter bank name" />
            <label class="block mt-2 mb-1 font-semibold" for="accountNumber">Account Number</label>
            <InputText id="accountNumber" v-model="form.accountNumber" placeholder="Enter account number" />
            <label class="block mt-2 mb-1 font-semibold" for="bankTrx">Transaction ID</label>
            <InputText id="bankTrx" v-model="form.bankTrx" placeholder="Enter bank transaction ID" />
        </div>
            </div>

        </div>

    </form>
           <div class="flex pt-6 justify-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback('2')"
              />
              <Button
                label="Confirm Order"
                icon="pi pi-arrow-right"
                iconPos="right"
              @click="requireConfirmation()"
              />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>

        <!-- Order Confirmation Dialog -->
        <ConfirmDialog group="headless" :style="{ width: '25rem' }">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                    <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-20 w-20 -mt-20">
                        <i class="pi pi-question !text-4xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <!-- Order Summary in Popup -->
                    <div class="w-full my-4">
                        <h3 class="font-semibold mb-2">Order Summary</h3>
                        <div v-for="item in cart" :key="item.id" class="flex justify-between text-sm py-1">
                            <span>{{ item.name }} <span class="text-gray-500">x{{ item.qty }}</span></span>
                            <span>${{ item.price * item.qty }}</span>
                        </div>
                        <div class="flex justify-between mt-2 text-sm">
                            <span>Subtotal</span>
                            <span>${{ cartStore.cart.summary.subtotal }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Delivery Charge</span>
                            <span>${{ cartStore.cart.summary.shipping_cost }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span>Discount</span>
                            <span>- ${{ cartStore.cart.summary.discount }}</span>
                        </div>
                        <div class="flex justify-between mt-2 font-bold">
                            <span>Total</span>
                            <span class="text-primary">${{ cartStore.cart.summary.total }}</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 mt-6">
                        <Button label="Place Order" @click="acceptCallback"></Button>
                        <Button label="Cancel" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
  </default-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import { Link, router, Head  } from "@inertiajs/vue3";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore();

// const props = defineProps({
//   product: Object,
//   relatedProducts: Array,
// });
const activeStep = ref(1);
const confirm = useConfirm();
const toast = useToast();

const requireConfirmation = () => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'Please confirm to proceed.',
        accept: () => {
            router.get('/order-confirmed'); // Redirect to order confirmation page
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
    paymentMethod: "cod",
});


const updateQty = async (item, qty) => {
    console.log(item);

  await cartStore.updateQuantity({
    variant_id: item.variant?.id,
    product_id: item.product?.id,
    quantity: qty
  })
}

const remove = async (item) => {
  await cartStore.removeFromCart({
    variant_id: item.variant?.id,
    product_id: item.product?.id
  })
}


// Payment Method Options
const paymentMethod = ref([
  { name: "Cash on Delivery", code: "cod" },
  { name: "bKash", code: "bkash" },
  { name: "Nagad", code: "nagad" },
  { name: "Rocket", code: "rocket" },
  { name: "Stripe", code: "stripe" },
  { name: "Authorize.Net", code: "authorize" },
  { name: "Bank Transfer", code: "bank" },
]);
</script>
<style>
 .p-listbox-list-container {
  max-height: none !important;
}
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

