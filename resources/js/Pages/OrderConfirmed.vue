<template>
<DefaultLayout>
    <div class="container bg-white rounded flex justify-center items-center min-h-screen my-6 p-4 ">
            <!-- <Breadcrumb :home="home" :model="items" class="mb-6" /> -->
        <div class="p-4 rounded-lg border border-gray-200 my-6 w-full max-w-4xl">
            <div class="flex flex-col items-center text-center">
                <div class="flex items-center justify-center bg-primary-100 rounded-full w-14 h-14 mb-4">
                    <i class="pi pi-check text-primary text-5xl"></i>
                </div>
                <h1 class="text-3xl font-bold mb-2 text-primary">Order Confirmed!</h1>
                <p class="text-gray-600 mb-6">Your order has been successfully placed.</p>
            </div>
            <div class="order-details mb-6">
                <Card class="mb-4">
                    <template #title>
                        <span class="text-xl font-semibold">Order Details</span>
                    </template>
                    <template #content>
                        <div class="grid grid-cols-2 gap-4 mb-4 text-gray-700">
                            <div><span class="font-medium">Name:</span> {{order.customer.name }}</div>
                            <div><span class="font-medium">Order Number:</span> #{{order.invoice_no }}</div>
                            <div><span class="font-medium">Email:</span> {{order.customer.email }}</div>
                            <div><span class="font-medium">Date:</span> {{order.order_date }}</div>
                            <div><span class="font-medium">Phone:</span> {{order.customer.phone }}</div>
                            <div><span class="font-medium">Payment Status:</span> <Tag :value="order.payment_status" severity="success" /></div>
                            <div><span class="font-medium">Address:</span> {{order.customer.address }}</div>
                            <div><span class="font-medium">Status:</span> <Tag :value="order.order_status" severity="success" /></div>
                            <div><span class="font-medium">Total:</span> {{formatCurrency(order.total)}}</div>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">Items</h3>
                        <DataTable :value="order.orderdetails" class="p-datatable-sm rounded-lg overflow-hidden mb-4">
                            <Column field="product.title" header="Product"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                            <Column field="total" header="Price"></Column>
                        </DataTable>
                    </template>
                    <template #footer>
                        <div class="flex flex-col gap-2 items-end w-full max-w-md ml-auto bg-slate-200 p-4 rounded">
                            <div class="flex justify-between w-full text-gray-700">
                                <span class="font-medium">Subtotal:</span>
                                <span>{{ formatCurrency(order.sub_total) }}</span>
                            </div>
                            <div class="flex justify-between w-full text-gray-700">
                                <span class="font-medium">Tax:</span>
                                <span>{{ formatCurrency(order.vat) }}</span>
                            </div>
                              <div class="flex justify-between w-full text-gray-700">
                                <span class="font-medium">Discount:</span>
                                <span>{{ formatCurrency(order.total_discount) }}</span>
                            </div>
                            <div class="flex justify-between w-full text-gray-900 font-semibold border-t pt-2">
                                <span>Total:</span>
                                <span>{{ formatCurrency(order.total) }}</span>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <Button label="View Orders" icon="pi pi-list"  @click="$router.push('/orders')" />
                <Button asChild v-slot="slotProps" severity="secondary" >
    <Link href="/" :class="slotProps.class"><i class="pi pi-home"></i> Back to Home</Link>
</Button>
            </div>
            <p class="text-center text-gray-500 py-6">Thank you for shopping with us.</p>
        </div>
    </div>
</DefaultLayout>
</template>

    <script setup>
import { ref } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import {Link} from "@inertiajs/vue3";
const props = defineProps({
    settings:Object,
    order:Object
})
const currency = props.settings.currency_symbol;
const home = ref({
  icon: "pi pi-home",
});
const items = ref([
    { label: "Orders", icon: "pi pi-shopping-cart", to: "/orders" },
    { label: "Order Confirmed", icon: "pi pi-check" },
]);
const orderItems = ref([
    { product: "Product A", qty: 2, price: currency+"50.00" },
    { product: "Product B", qty: 1, price: currency+"100.00" },
]);
</script>

    <style scoped>
</style>
