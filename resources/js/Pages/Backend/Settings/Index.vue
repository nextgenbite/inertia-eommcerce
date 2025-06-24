<template>

  <Head title="General Settings" />
  <app-layout>
    <div class="container">
      <div class="w-3/4 mx-auto ">
        <form @submit.prevent="submitForm">
          <div class="space-y-4 card grid grid-cols-12 gap-2">
            <h3 class="col-span-12 text-lg font-medium leading-6 text-center text-gray-900">Settings</h3>

            <!-- FloatLabel Component for System Name -->
            <div class="col-span-6">
              <FloatLabel>
                <InputText id="app_name" v-model="form.key.app_name" class="w-full" />
                <label for="app_name">System Name</label>
              </FloatLabel>
            </div>
            <!-- FloatLabel Component for System Email -->
            <div class="col-span-6">

              <FloatLabel>
                <InputText id="email" v-model="form.key.email" class="w-full" />
                <label for="email">System Emails</label>
              </FloatLabel>
            </div>

            <!-- Favicon Input -->
            <div class="col-span-6">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="favicon_input">Favicon</label>
              <input @change="changeImage($event, 'favicon')" accept="image/*"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="favicon_input_help" id="favicon_input" type="file">
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="favicon_input_help">
                SVG, PNG, JPG  or JPEG (Recommended: <b>64x64px</b>, Max: 200x200px).
              </p>

              <div v-if="form?.key.favicon">
                <div
                  class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-28 h-28">
                  <img class="w-24 h-24 rounded-t-lg object-contain"
                    :src="isBase64(form.key.favicon) ? form.key.favicon : '/' + form.key.favicon" alt="Favicon Preview" />
                  <button @click="remove('favicon')" type="button"
                    class="absolute top-0 right-0 text-red-700 bg-white hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                    <i class="pi pi-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Logo Input -->
            <div class="col-span-6">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="logo_input">Logo</label>
              <input @change="changeImage($event, 'logo')" id="logo_input" type="file" accept="image/*"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="logo_input_help">
                SVG, PNG, JPG or JPEG (Recommended: <b>200x60px</b>, Max: 200x400px).
              </p>

              <div v-if="form?.key.logo">
                <div
                  class="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img class="w-full rounded-t-lg object-contain"
                    :src="isBase64(form.key.logo) ? form.key.logo : '/' + form.key.logo" alt="Logo Preview" />
                  <button @click="remove('logo')" type="button"
                    class="absolute top-0 right-0 text-red-700 bg-white hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                    <i class="pi pi-times"></i>
                  </button>
                </div>
              </div>
            </div>


            <div class="col-span-12">
            <Editor id="address"  v-model="form.key.address"  />
            </div>

            <SelectButton class="col-span-6"  v-model="form.key.theme_mode" :options="presets" size="small" />
              <Select v-model="form.key.primary_color" :options="primaryColors" optionLabel="name"
              optionValue="code" placeholder="Select a Theme Color" class="w-full col-span-6" size="small" />
              <Select v-model="form.key.surface_color" :options="surfaces" optionLabel="name"
              optionValue="code" placeholder="Select a Surfaces" class="w-full col-span-6" size="small" />

            <FloatLabel class="col-span-6">
              <InputText type="color" id="color" v-model="form.key.color" class="w-full" />
              <label for="color">System color</label>
            </FloatLabel>
            <FloatLabel class="col-span-6">
              <InputText type="color" id="hover_color" v-model="form.key.hover_color" class="w-full" />
              <label for="hover_color">System Hover Color</label>
            </FloatLabel>
            <!-- Submit Button -->
            <div class="flex justify-end col-span-12">
              <Button type="submit" label="Save" :loading="form.processing" :disabled="form.processing"  />
            </div>
          </div>
        </form>
      </div>
    </div>
  </app-layout>
</template>

<script setup>
import AppLayout from "@/sakai/layout/AppLayout.vue";
import { useForm, Head } from "@inertiajs/vue3";
import {  ref, watchEffect } from "vue";
import Editor from "primevue/editor";
import { useToast } from 'primevue/usetoast';
const { toast } = useToast();
const props = defineProps(
  { data: Object, }
);
const formLoading = ref(false);
const errors = ref([]);
const presets = ref(['Aura', 'Lara']);


const primaryColors = ref([
  { name: 'noir', code: 'noir', },
  { name: 'emerald', code: 'emerald', },
  { name: 'green', code: 'green', },
  { name: 'lime', code: 'lime', },
  { name: 'orange', code: 'orange', },
  { name: 'amber', code: 'amber', },
  { name: 'yellow', code: 'yellow', },
  { name: 'teal', code: 'teal', },
  { name: 'cyan', code: 'cyan', },
  { name: 'sky', code: 'sky', },
  { name: 'blue', code: 'blue', },
  { name: 'indigo', code: 'indigo', },
  { name: 'violet', code: 'violet', },
  { name: 'purple', code: 'purple', },
  { name: 'fuchsia', code: 'fuchsia', },
  { name: 'pink', code: 'pink', },
  { name: 'rose', code: 'rose', }
]);

const surfaces = ref([
  {
    name: 'slate',
    code: 'slate'
  },
  {
    name: 'gray',
    code: 'gray'
  },
  {
    name: 'zinc',
    code: 'zinc'
  },
  {
    name: 'neutral',
    code: 'neutral'
  },
  {
    name: 'stone',
    code: 'stone'
  },
  {
    name: 'soho',
    code: 'soho'
  },
  {
    name: 'viva',
    code: 'viva'
  },
  {
    name: 'ocean',
    code: 'ocean'
  }
]);
const form = useForm({
  _method: "put",
  key: {
    app_name: '',
    email: '',
    logo: null,
    favicon: null,
    address: null,
    color: null,
    hover_color: null,
    theme_mode: null,
    primary_color: null,
    surface_color: null
  },
});
watchEffect(() => {
  form.key.app_name = props.data?.app_name;
  form.key.email = props.data?.email;
  form.key.logo = props.data.logo;
  form.key.favicon = props.data.favicon;
  form.key.address = props.data.address;
  form.key.color = props.data.color;
  form.key.hover_color = props.data.hover_color;
  form.key.theme_mode = props.data.theme_mode;
  form.key.primary_color = props.data.primary_color;
  form.key.surface_color = props.data.surface_color;
  // Object.assign(form.key, props.data);

});


const changeImage = (event, index) => {
  const file = event.target.files[0];

  if (file) {
    let reader = new FileReader();
    reader.onload = event => {
      form.key[index] = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};
const remove = (index) => form.key[index] = null;


const submitForm = async () => {
  try {

    form.post(route('general.settings.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Settings updated successfully',
          life: 3000
        });
        form.reset();
      },
    });

  } catch (error) {
    console.error(error);
  }
};


const isBase64 = (str) => {
  const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;
  return base64Pattern.test(str);
};
</script>
