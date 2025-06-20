<template>
    <DefaultLayout>


        <div class="container mx-auto bg-white  shadow-xl flex justify-center items-center min-h-screen py-14 px-6">
            <div class="w-full max-w-2xl">
                <!-- Order Confirmation Header -->
                <div class="flex flex-col items-center text-center mb-10">
                    <div class="flex items-center justify-center bg-green-50 rounded-full w-20 h-20 mb-5 shadow">
                        <i class="pi pi-check text-green-600 text-5xl"></i>
                    </div>
                    <h1 class="text-4xl font-extrabold mb-2 text-green-700 tracking-tight">Order Confirmed</h1>
                    <p class="text-gray-500 mb-4 text-lg">Your order was placed successfully.</p>
                    <div class="flex flex-wrap gap-3 justify-center">
                        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold shadow-sm">
                            <i class="pi pi-hashtag mr-2"></i> {{ order.invoice_no }}
                        </span>
                        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-50 text-gray-700 text-sm font-semibold shadow-sm">
                            <i class="pi pi-calendar mr-2"></i> {{ order.order_date }}
                        </span>
                        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-semibold shadow-sm">
                            <i class="pi pi-credit-card mr-2"></i> {{ order.payment_status }}
                        </span>
                        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold shadow-sm">
                            <i class="pi pi-truck mr-2"></i> {{ order.shipping_method || 'Standard Shipping' }}
                        </span>
                    </div>
                </div>

                <!-- Order Details Card -->
                <div class="bg-gray-50 rounded-2xl border border-gray-100 p-8 mb-10 shadow">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h2 class="text-lg font-bold mb-3 text-gray-800">Customer</h2>


                            <div class="text-gray-700 space-y-1.5 text-sm">
                                <div><span class="font-medium">Name:</span> {{ billingAddress.name }}</div>
                                <div><span class="font-medium">Email:</span> {{ billingAddress?.email }}</div>
                                <div><span class="font-medium">Phone:</span> {{ billingAddress?.phone }}</div>
                                <div>
                                    <span class="font-medium">Address:</span>
                                    {{ billingAddress.address }}
                                    <template v-if="billingAddress.city">, {{ billingAddress.city }}</template>
                                    <template v-if="billingAddress.state">, {{ billingAddress.state }}</template>
                                    <template v-if="billingAddress.postal_code">, {{ billingAddress.postal_code }}</template>
                                    <template v-if="billingAddress.country">, {{ billingAddress.country }}</template>
                                </div>
                            </div>


                        </div>
                        <div>
                            <h2 class="text-lg font-bold mb-3 text-gray-800">Order Info</h2>
                            <div class="text-gray-700 space-y-1.5 text-sm">
                                <div>
                                    <span class="font-medium">Order Status:</span>
                                    <span class="inline-block ml-2 px-2 py-0.5 rounded bg-green-100 text-green-900 text-xs font-bold">{{ order.order_status }}</span>
                                </div>
                                <div><span class="font-medium">Payment Method:</span> {{ order.payment_method || 'N/A' }}</div>
                                <div><span class="font-medium">Shipping Method:</span> {{ order.shipping_method || 'Standard Shipping' }}</div>
                                <div><span class="font-medium">Estimated Delivery:</span> {{ order.estimated_delivery || '2-5 business days' }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="order.note" class="bg-yellow-50 border-l-4 border-yellow-300 p-3 rounded mb-6 text-yellow-900 text-sm">
                        <span class="font-semibold">Note:</span> {{ order.note }}
                    </div>
                    <h3 class="text-lg font-bold mb-4 text-gray-800">Items</h3>
                    <DataTable :value="order.items" class="p-datatable-modern rounded-xl overflow-hidden mb-5 border border-gray-100">
                        <Column field="product.title" header="Product"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                        <Column field="total" header="Price"></Column>
                    </DataTable>
                    <!-- Order Summary -->
                    <div class="flex flex-col gap-2 items-end w-full max-w-xs ml-auto bg-slate-50 p-5 rounded-xl shadow-inner">
                        <div class="flex justify-between w-full text-gray-700 text-sm">
                            <span class="font-medium">Subtotal:</span>
                            <span>{{ formatCurrency(order.subtotal) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-700 text-sm">
                            <span class="font-medium">Shipping:</span>
                            <span>{{ formatCurrency(order.shipping_cost) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-700 text-sm">
                            <span class="font-medium">Tax:</span>
                            <span>{{ formatCurrency(order.tax) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-700 text-sm">
                            <span class="font-medium">Discount:</span>
                            <span>{{ formatCurrency(order.total_discount) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-900 font-extrabold border-t pt-3 text-base">
                            <span>Total:</span>
                            <span>{{ formatCurrency(order.total) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button label="View Orders" icon="pi pi-list" @click="$router.push('/orders')" class="!px-7 !py-3 !text-base !rounded-lg shadow" />
                    <Button asChild v-slot="slotProps" severity="secondary" class="!px-7 !py-3 !text-base !rounded-lg shadow">
                        <Link href="/" :class="slotProps.class"><i class="pi pi-home"></i> Home</Link>
                    </Button>
                </div>
                <p class="text-center text-gray-400 text-base">Thank you for shopping with us.</p>
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup>
import { computed, ref } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import { Link } from "@inertiajs/vue3";
const props = defineProps({
    settings: Object,
    order: Object
});
const currency = props.settings.currency_symbol;
function formatCurrency(value) {
    return currency + Number(value).toFixed(2);
}
const billingAddress = computed(()=>{
return JSON.parse(props.order?.billing_address)
});
</script>

<style scoped>
/* Modern UI tweaks */
.p-datatable-modern th, .p-datatable-modern td {
    padding: 1rem 1.25rem !important;
    font-size: 1.05rem;
    border-bottom: 1px solid #e5e7eb !important;
}
.p-datatable-modern th {
    background: #f1f5f9 !important;
    font-weight: 800;
    color: #1e293b;
    letter-spacing: 0.02em;
}
.p-datatable-modern td {
    background: #fff !important;
    color: #334155;
}
.p-datatable-modern tr:last-child td {
    border-bottom: none !important;
}
</style>
