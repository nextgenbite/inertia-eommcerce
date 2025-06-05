<script setup>
import AppLayout from "@/sakai/layout/AppLayout.vue";
import { useForm, Head } from "@inertiajs/vue3";
import { FilterMatchMode } from "@primevue/core/api";
import { useToast } from "primevue/usetoast";
import { onMounted, ref, watchEffect } from "vue";

const toast = useToast();

const props = defineProps({
  settings: Object,

});


const products = ref();
const product = ref({});

const submitted = ref(false);


const saveData = () => {
  submitted.value = true;

  if (product?.value.name?.trim()) {
    if (product.value.id) {
      product.value.inventoryStatus = product.value.inventoryStatus.value
        ? product.value.inventoryStatus.value
        : product.value.inventoryStatus;
      products.value[findIndexById(product.value.id)] = product.value;
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Updated",
        life: 3000,
      });
    } else {
      product.value.id = createId();
      product.value.code = createId();
      product.value.image = "product-placeholder.svg";
      product.value.inventoryStatus = product.value.inventoryStatus
        ? product.value.inventoryStatus.value
        : "INSTOCK";
      products.value.push(product.value);
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Created",
        life: 3000,
      });
    }

    product.value = {};
  }
};



const form = useForm({
  skey: {
    app_name: '',
    email: '',
    logo: null,
    favicon: null,
    address: null,
    color: null,
    hover_color: null
  },
});
watchEffect(() => {
  if (props.settings) {

   form.skey = props.settings;
  }
});
</script>

<template>
  <div>
    <Head title="General Settings" />
    <app-layout>
   <div class="card">
       <div class="grid grid-cols-12 gap-6">
        <img
          v-if="product.image"
          :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
          :alt="product.image"
          class="block m-auto pb-4"
        />
        <div class=" col-span-6">
          <label for="name" class="block font-bold mb-3">System Name</label>
          <InputText
            v-model.trim="form.skey.app_name"
            required="true"
            autofocus
            :invalid="submitted && !skey.app_name"
            fluid
          />
          <small v-if="submitted && !skey.app_name" class="text-red-500"
            >System Name is required.</small
          >
        </div>
        <div class=" col-span-6">
          <label for="name" class="block font-bold mb-3">Phone</label>
          <InputText
            v-model.trim="form.skey.phone"
            required="true"
            autofocus
            :invalid="submitted && !skey.phone"
            fluid
          />
          <small v-if="submitted && !skey.phone" class="text-red-500"
            >phone is required.</small
          >
        </div>
        <div class=" col-span-6">
          <label for="name" class="block font-bold mb-3">Email</label>
          <InputText
            v-model.trim="form.skey.email"
            required="true"
            autofocus
            :invalid="submitted && !skey.email"
            fluid
          />
          <small v-if="submitted && !skey.email" class="text-red-500"
            >Email is required.</small
          >
        </div>
        <div class=" col-span-12">
          <label for="name" class="block font-bold mb-3">Description</label>
          <Editor

            v-model="form.skey.description"
            editorStyle="height: 120px"
          />
        </div>

        <Button  label="Update"  @click="saveData" />
      </div>
   </div>
    </app-layout>

  </div>
</template>
