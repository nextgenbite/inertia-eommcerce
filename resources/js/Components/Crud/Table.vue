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
const size = ref({ label: "Small", value: "small" });
function getNestedValue(obj, path) {
  return path.split(".").reduce((o, i) => (o ? o[i] : ""), obj);
}

function getImage(obj, path) {
  const val = getNestedValue(obj, path);
  return val && val.length > 0 ? "/" + val : "/no-image.png";
}
const getSeverity = (status) => {
  if (!status) return null;
  const filter = String(status).toLowerCase();
  console.log(filter);

  // Payment Status
  if (["unpaid", "paid", "partial"].includes(filter)) {
    switch (filter) {
      case "unpaid":
        return "danger";
      case "paid":
        return "success";
      case "partial":
        return "warning";
    }
  }

  // Delivery Method (optional, if you want to color them)
  if (["cod", "pickup", "courier"].includes(filter)) {
    switch (filter) {
      case "cod":
        return "info";
      case "pickup":
        return "success";
      case "courier":
        return "warning";
    }
  }

  // Delivery Status
  if (["pending", "shipped", "delivered", "cancelled"].includes(filter)) {
    switch (filter) {
      case "pending":
        return "info";
      case "shipped":
        return "warning";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
    }
  }

  // Default
  return null;
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
      size="small"
      lazy
      stripedRows
      :loading="!getData.data"
      :value="getData.data"
      paginator
      :rows="getData.per_page"
      :totalRecords="getData.total"
      :first="(getData.current_page - 1) * getData.per_page"
      @page="onPageChange"
      l
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
          <!-- 1. Image -->
          <Image
            v-if="column.key === 'image'"
            :src="getImage(slotProps.data, column.path)"
            :alt="column.label"
            class="shadow-2 rounded"
            width="100"
            preview
          />

          <!-- 2. General Tag -->
          <Tag
            v-else-if="column.key === 'tag'"
            :value="getNestedValue(slotProps.data, column.path)"
            :severity="getSeverity(getNestedValue(slotProps.data, column.path))"
          />

          <!-- 3. Status Tag (custom logic for status = 1/0) -->
          <Tag
            v-else-if="column.key === 'status'"
            :value="
              getNestedValue(slotProps.data, column.path) == 1
                ? 'Active'
                : 'Inactive'
            "
            :severity="
              getNestedValue(slotProps.data, column.path) == 1
                ? 'success'
                : 'danger'
            "
          />

          <!-- 4. Nested Path -->
          <div v-else-if="column.path.includes('.')">
            {{ getNestedValue(slotProps.data, column.path) }}
          </div>

          <!-- 5. Flat value -->
          <div class=" capitalize truncate" v-else>
            {{ slotProps.data[column.path] }}
          </div>
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
