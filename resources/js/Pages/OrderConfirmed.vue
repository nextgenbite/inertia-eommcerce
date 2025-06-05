<template>
<DefaultLayout>
    <div class="container bg-white rounded flex justify-center items-center min-h-screen my-6 p-4 ">
            <!-- <Breadcrumb :home="home" :model="items" class="mb-6" /> -->
        <div class="p-4 rounded-lg border border-gray-200 my-6 w-full max-w-2xl">
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
                            <div><span class="font-medium">Order Number:</span> #123456</div>
                            <div><span class="font-medium">Date:</span> 2024-06-10</div>
                            <div><span class="font-medium">Status:</span> <Tag value="Confirmed" severity="success" /></div>
                            <div><span class="font-medium">Total:</span> $150.00</div>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">Items</h3>
                        <DataTable :value="orderItems" class="p-datatable-sm rounded-lg overflow-hidden mb-4">
                            <Column field="product" header="Product"></Column>
                            <Column field="qty" header="Qty"></Column>
                            <Column field="price" header="Price"></Column>
                        </DataTable>
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
const home = ref({
  icon: "pi pi-home",
});
const items = ref([
    { label: "Orders", icon: "pi pi-shopping-cart", to: "/orders" },
    { label: "Order Confirmed", icon: "pi pi-check" },
]);
const orderItems = ref([
    { product: "Product A", qty: 2, price: "$50.00" },
    { product: "Product B", qty: 1, price: "$100.00" },
]);
</script>

    <style scoped>
</style>
