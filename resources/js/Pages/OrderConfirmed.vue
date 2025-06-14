<template>
    <DefaultLayout>
        <div class="container mx-auto bg-white rounded-3xl shadow-2xl flex justify-center items-center min-h-screen py-16 px-8">
            <div class="w-full max-w-3xl">
                <!-- Order Confirmation Header -->
                <div class="flex flex-col items-center text-center mb-12">
                    <div class="flex items-center justify-center bg-green-100 rounded-full w-24 h-24 mb-6 shadow-lg">
                        <i class="pi pi-check text-green-600 text-7xl"></i>
                    </div>
                    <h1 class="text-5xl font-black mb-3 text-green-700 tracking-tight">Order Confirmed!</h1>
                    <p class="text-gray-500 mb-6 text-xl">Your order has been successfully placed.</p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <span class="inline-flex items-center px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-base font-semibold shadow">
                            <i class="pi pi-hashtag mr-2"></i> #{{ order.invoice_no }}
                        </span>
                        <span class="inline-flex items-center px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-base font-semibold shadow">
                            <i class="pi pi-calendar mr-2"></i> {{ order.order_date }}
                        </span>
                        <span class="inline-flex items-center px-5 py-2 rounded-full bg-green-100 text-green-700 text-base font-semibold shadow">
                            <i class="pi pi-credit-card mr-2"></i> {{ order.payment_status }}
                        </span>
                        <span class="inline-flex items-center px-5 py-2 rounded-full bg-yellow-100 text-yellow-700 text-base font-semibold shadow">
                            <i class="pi pi-truck mr-2"></i> {{ order.shipping_method || 'Standard Shipping' }}
                        </span>
                    </div>
                </div>

                <!-- Order Details Card -->
                <div class="bg-gray-50 rounded-3xl border border-gray-200 p-10 mb-12 shadow-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        <div>
                            <h2 class="text-xl font-bold mb-4 text-gray-800">Customer</h2>
                            <div class="text-gray-700 space-y-2">
                                <div><span class="font-medium">Name:</span> {{ order.customer.name }}</div>
                                <div><span class="font-medium">Email:</span> {{ order.customer.email }}</div>
                                <div><span class="font-medium">Phone:</span> {{ order.customer.phone }}</div>
                                <div><span class="font-medium">Address:</span> {{ order.customer.address }}</div>
                            </div>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold mb-4 text-gray-800">Order Info</h2>
                            <div class="text-gray-700 space-y-2">
                                <div>
                                    <span class="font-medium">Order Status:</span>
                                    <span class="inline-block ml-2 px-2 py-1 rounded bg-green-200 text-green-900 text-xs font-bold">{{ order.order_status }}</span>
                                </div>
                                <div><span class="font-medium">Payment Method:</span> {{ order.payment_method || 'N/A' }}</div>
                                <div><span class="font-medium">Shipping Method:</span> {{ order.shipping_method || 'Standard Shipping' }}</div>
                                <div><span class="font-medium">Estimated Delivery:</span> {{ order.estimated_delivery || '2-5 business days' }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="order.note" class="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded mb-8 text-yellow-900">
                        <span class="font-semibold">Note:</span> {{ order.note }}
                    </div>
                    <h3 class="text-xl font-bold mb-5 text-gray-800">Items</h3>
                    <DataTable :value="order.orderdetails" class="p-datatable-modern rounded-2xl overflow-hidden mb-6 border border-gray-200">
                        <Column field="product.title" header="Product"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                        <Column field="total" header="Price"></Column>
                    </DataTable>
                    <!-- Order Summary -->
                    <div class="flex flex-col gap-3 items-end w-full max-w-md ml-auto bg-slate-100 p-6 rounded-2xl shadow-inner">
                        <div class="flex justify-between w-full text-gray-700 text-base">
                            <span class="font-medium">Subtotal:</span>
                            <span>{{ formatCurrency(order.sub_total) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-700 text-base">
                            <span class="font-medium">Tax:</span>
                            <span>{{ formatCurrency(order.vat) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-700 text-base">
                            <span class="font-medium">Discount:</span>
                            <span>{{ formatCurrency(order.total_discount) }}</span>
                        </div>
                        <div class="flex justify-between w-full text-gray-900 font-extrabold border-t pt-4 text-lg">
                            <span>Total:</span>
                            <span>{{ formatCurrency(order.total) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-5 justify-center mb-10">
                    <Button label="View Orders" icon="pi pi-list" @click="$router.push('/orders')" class="!px-8 !py-4 !text-lg !rounded-xl shadow-md" />
                    <Button asChild v-slot="slotProps" severity="secondary" class="!px-8 !py-4 !text-lg !rounded-xl shadow-md">
                        <Link href="/" :class="slotProps.class"><i class="pi pi-home"></i> Back to Home</Link>
                    </Button>
                </div>
                <p class="text-center text-gray-400 text-lg">Thank you for shopping with us.</p>
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup>
import { ref } from "vue";
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
