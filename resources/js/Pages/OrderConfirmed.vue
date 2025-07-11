<template>
  <DefaultLayout>
    <div class="container mx-auto py-12 px-4 lg:px-8">
      <!-- Banner -->
      <div class="flex flex-col items-center text-center mb-12">
        <div class="rounded-full bg-green-100 p-5 mb-4">
          <i class="pi pi-check-circle text-green-600 text-5xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p class="text-gray-600 mb-6">Your order has been placed successfully.</p>
        <div class="flex flex-wrap gap-3 justify-center">
          <Badge icon="pi pi-hashtag" label="Order #{{ order.invoice_no }}" />
          <Badge icon="pi pi-calendar" label="{{ order.order_date }}" />
          <Badge icon="pi pi-credit-card" label="{{ order.payment_status }}" />
          <Badge icon="pi pi-truck" label="{{ order.delivery_method || 'Standard' }}" />
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <p class="text-xl text-gray-800 font-medium mb-4">Order Summary</p>
        <SummaryList :items="summaryLines" class="mb-6" />
        <div class="flex gap-4 justify-end  lg:justify-center flex-col lg:flex-row">
          <Link v-ripple href="/" class="p-button p-ripple"><i class="pi pi-home mr-2"></i>Continue Shopping</Link>
          <Link v-ripple href="/orders" class="p-button p-button-outlined p-ripple"><i class="pi pi-list mr-2"></i>View Orders</Link>
        </div>
      </div>

      <!-- Details Accordion -->
      <Accordion >
    <AccordionPanel value="0">
        <AccordionHeader>Billing & Shipping</AccordionHeader>
        <AccordionContent>
            <AddressCard title="Billing Address" :address="billingAddress" />
          <AddressCard title="Shipping Address" :address="shippingAddress" class="mt-4" />
        </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="1">
        <AccordionHeader>Items</AccordionHeader>
        <AccordionContent>
               <DataTable :value="order.items" responsiveLayout="scroll">
            <Column field="product.title" header="Product" />
            <Column field="quantity" header="Qty" style="width:100px" />
            <Column field="total" header="Amount" body="{{ formatCurrency(Number($event)) }}" style="text-align:right;width:120px;" />
          </DataTable>
        </AccordionContent>
    </AccordionPanel>

</Accordion>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { computed } from 'vue';
import DefaultLayout from '@/Layouts/Default.vue';
import { Link } from "@inertiajs/vue3";
import AddressCard from '@/Components/AddressCard.vue'; // Assume you have these components
import SummaryList from '@/Components/SummaryList.vue'; // Assume you have these components


const props = defineProps({
  settings: Object,
  order: Object
});

const currency = props.settings.currency_symbol || '$';
const formatCurrency = v => currency + Number(v).toLocaleString();

const billingAddress = computed(() => {
  try { return props.order.billing_address ? JSON.parse(props.order.billing_address) : {}; }
  catch { return {}; }
});
const shippingAddress = computed(() => {
  try { return props.order.shipping_address ? JSON.parse(props.order.shipping_address) :  props.order.billing_address ? JSON.parse(props.order.billing_address) : {} ; }
  catch { return {}; }
});

const summaryLines = computed(() => [
  { label: 'Subtotal', value: formatCurrency(props.order.subtotal) },
  { label: 'Shipping', value: formatCurrency(props.order.shipping_cost) },
  { label: 'Tax', value: formatCurrency(props.order.tax) },
  { label: 'Discount', value: formatCurrency(props.order.total_discount) },
  { label: 'Total', value: formatCurrency(props.order.total), bold: true }
]);
</script>

<style scoped>
.container { max-width: 768px; }
</style>
