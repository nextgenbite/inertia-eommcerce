<script setup>
import Create from "@/Components/Crud/Create.vue";
import Edit from "@/Components/Crud/Edit.vue";
import { useForm } from "@inertiajs/vue3";

import { reactive, ref, watch } from "vue";
import pkg from "lodash";
import { router } from "@inertiajs/vue3";
const { _, debounce, pickBy } = pkg;
import { loadToast } from "@/composables/loadToast";
const props = defineProps({
  title: Array,
  filters: Object,
  getData: Object,
  perPage: Number,
  modal_width: String,
  // permissions: Array,
  columns: {
    type: Array,
    required: true,
  },
  dynamicFrom: {
    type: Array,
    required: true,
  },


  route: {
    type: String,
    required: true,
  },
});

loadToast();

const deleteDialog = ref(false);
const form = useForm({});

const data = reactive({
  params: {
    search: props.filters.search,
    field: props.filters.field,
    order: props.filters.order,
    // perPage: props.perPage,
    createOpen: false,
    editOpen: false,
  },
  item: null,
});

const deleteData = () => {
  deleteDialog.value = false;

  form.delete(route(`${props.route}.destroy`, data.item?.id), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
    },
    onError: () => null,
    onFinish: () => null,
  });
};
const selectedItem = ref();

const onPageChange = (event) => {
  router.get(
    route(`${props.route}.index`),
    { page: event.page + 1 },
    { preserveState: true }
  );
};

const getColumnValue = (item, path) => {
  const keys = path.split(".");
  let value = item;

  for (const key of keys) {
    if (value && key in value) {
      value = value[key];
    } else {
      return null; // Return null if the path is invalid or value is not found
    }
  }

  return value;
};
watch(
  () => _.cloneDeep(data.params),
  debounce(() => {
    let params = pickBy(data.params);
    router.get(route(`${props.route}.index`), params, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    });
  }, 150)
);
//export csv
const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<template>
  <div class="card">

    <Create
      :show="data.createOpen"
      @close="data.createOpen = false"
      :title="props.title[1]"
      :dynamicFrom="dynamicFrom"
      :route="route"
      :modalWidth="props.modal_width || '60rem'"
    />
    <Edit
      :show="data.editOpen"
      @close="data.editOpen = false"
      :data="data.item"
      :title="props.title[1]"
      :dynamicFrom="dynamicFrom"
      :route="route"
      :modalWidth="props.modal_width || '60rem'"
    />

    <DataTable
      v-model:selection="selectedItem"
      ref="dt"
      lazy
      :loading="!getData.data"
      :value="getData.data"
      paginator
      :rows="getData.per_page"
      :totalRecords="getData.total"
      :first="(getData.current_page - 1) * getData.per_page"
      @page="onPageChange"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div
          class="flex justify-center lg:justify-between flex-col lg:flex-row gap-2"
        >
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="data.params.search"
              placeholder="Keyword Search"
              class="w-full"
            />
          </IconField>
          <ButtonGroup>

            <Button
              v-show="can([$page.props.permissions.create])"
              label="Create"
              @click="data.createOpen = true"
              icon="pi pi-plus"
            />
            <Button
              icon="pi pi-external-link"
              label="Export"
              @click="exportCSV($event)"
            />
          </ButtonGroup>
        </div>
      </template>
      <template #empty>
        <div class="text-center">No data found.</div>
      </template>
      <template #loading> Loading data. Please wait. </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column
        :field="column.path"
        :header="column.label"
        :sortable="column?.sort"
        headerStyle="min-width:10rem;"
        v-for="column in props.columns"
        :key="column.key"
      >
        <template #body="slotProps">
          <Tag
            v-if="column.path === 'status'"
            :value="slotProps.data.status == 1 ? 'Active' : 'Inactive'"
            :severity="slotProps.data.status == 1 ? 'success' : 'danger'"
          />

          <Image
            v-else-if="
              column?.path === 'image' ||
              column?.path === 'thumbnail' ||
              column.path === 'avatar'
            "
            :src="
              slotProps.data[column.key] &&
              slotProps.data[column.key].length > 0
                ? '/' + slotProps.data[column.key]
                : '/no-image.png'
            "
            :alt="slotProps.data[column.path] || 'Image not available'"
            class="shadow-2 rounded"
            width="100"
            preview
          />
          <div v-else-if="column.path.includes('.')">
            {{ getColumnValue(slotProps.data, column.path) }}
          </div>
          <div v-else>{{ slotProps.data[column.path] }}</div>
        </template>
      </Column>

      <Column :exportable="false" style="min-width: 12rem">
        <template #loading>
          <div
            class="flex items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="30%" height="1rem" />
          </div>
        </template>
        <template #body="slotProps">
             <!-- <template v-if="$slots.button"> -->

        <slot name="button" :item="slotProps.data" />
        <!-- </template> -->
          <Button
            v-show="can([$page.props.permissions.update])"
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="(data.editOpen = true), (data.item = slotProps.data)"
          />
          <Button
            v-show="can([$page.props.permissions.delete])"
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="
              deleteDialog = true;
              data.item = slotProps.data;
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
        <span v-if="data.item"
          >Are you sure you want to delete <b>{{ data.item.title }}</b
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
</template>

<style scoped lang="scss"></style>
