
<script setup>
import AppLayout from "@/Layouts/Central/AppLayout.vue";
import Create from "@/Components/Crud/Create.vue";
import Edit from "@/Components/Crud/Edit.vue";
import { Head, usePage, useForm } from "@inertiajs/vue3";

import { onMounted, reactive, ref, watch, computed } from "vue";
import pkg from "lodash";
import { router } from "@inertiajs/vue3";
const { _, debounce, pickBy } = pkg;
import { loadToast } from "@/composables/loadToast";

const props = defineProps({
  title: String,
  filters: Object,
  getData: Object,
  perPage: Number,
  formData: {
    type: Array,
    required: true,
  },
});

loadToast();

const deleteDialog = ref(false);
const permissionDialog = ref(false);
const form = useForm({});

const data = reactive({
  params: {
    search: props.filters.search,
    field: props.filters.field,
    order: props.filters.order,
    createOpen: false,
    editOpen: false,
  },
  role: null,
});

const deleteData = () => {
  deleteDialog.value = false;

  form.delete(route("role.destroy", data.role?.id), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
    },
    onError: () => null,
    onFinish: () => null,
  });
};

const onPageChange = (event) => {
  router.get(
    route("role.index"),
    { page: event.page + 1 },
    { preserveState: true }
  );
};

watch(
  () => _.cloneDeep(data.params),
  debounce(() => {
    let params = pickBy(data.params);
    router.get(route("role.index"), params, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    });
  }, 150)
);
</script>

<template>
  <app-layout>
    <Head>
      <title>{{ props.title[0] }}</title>
    </Head>
    <div class="card">
      <Create
        :show="data.createOpen"
        @close="data.createOpen = false"
        :title="props.title[0]"
        :dynamicFrom="formData"
        route="plans"
        :modalWidth="props.modal_width || '60rem'"
      />
      <Edit
        :show="data.editOpen"
        @close="data.editOpen = false"
        :title="props.title"
        :data="data.role"
        :dynamicFrom="formData"
        route="plans"
      />
      <Button
        label="Create"
        @click="data.createOpen = true"
        icon="pi pi-plus"
      />
      <DataTable
        lazy
        :value="getData.data"
        paginator
        :rows="getData.per_page"
        :totalRecords="getData.total"
        :first="(getData.current_page - 1) * getData.per_page"
        @page="onPageChange"
        tableStyle="min-width: 50rem"
      >
        <template #header>
          <div class="flex justify-end">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="data.params.search"
                placeholder="Keyword Search"
              />
            </IconField>
          </div>
        </template>
        <template #empty> No data found. </template>
        <template #loading> Loading data. Please wait. </template>

        <Column header="No">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>

        <Column field="name" header="Name"></Column>
        <Column field="price" header="Price"></Column>
        <Column header="Features">
          <template #body="slotProps">
            <Badge
              v-for="(feature, index) in JSON.parse(slotProps.data.features)"
              :key="index"
              :value="feature"
            />
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 12rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="(data.editOpen = true), (data.role = slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="
                deleteDialog = true;
                data.role = slotProps.data;
              "
            />
          </template>
        </Column>
      </DataTable>

      <Dialog
        v-model:visible="deleteDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="data.role"
            >Are you sure you want to delete <b>{{ data.role.name }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            text
            @click="deleteDialog = false"
          />
          <Button label="Yes" icon="pi pi-check" @click="deleteData" />
        </template>
      </Dialog>
    </div>
  </app-layout>
</template>

<style scoped lang="scss">
</style>
