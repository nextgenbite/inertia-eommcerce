<script setup>
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import { reactive, onMounted, ref, computed, watch } from "vue";
import AppLayout from "@/sakai/layout/AppLayout.vue";
import { Head, usePage, useForm, router, Link } from "@inertiajs/vue3";
import pkg from "lodash";
const { _, debounce, pickBy } = pkg;
const props = defineProps({
  title: Array,
  filters: Object,
  getData: Object,
  perPage: Number,
  columns: {
    type: Array,
    required: true,
  },

  form: {
    type: Array,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  //   treeData: Array,
  categories: Array,
});

const deleteDialog = ref(false);
const form = useForm({});

// Transform categories to tree structure
// const treeData = computed(() =>
//   props.getData.data.map((category, i) => ({
//     key: `${i}`,
//     data: {
//       name: category.title,
//       description: category.description,
//       image: category.thumbnail,
//       type: "Category",
//       status: category.status,
//     },
//     children: (category.sub_categories || []).map((sub, j) => ({
//       key: `${i}-${j}`,
//       data: {
//         name: sub.title,
//         image: sub.thumbnail,
//         type: "Subcategory",
//       },
//       children: (sub.sub_sub_categories || []).map((subsub, k) => ({
//         key: `${i}-${j}-${k}`,
//         data: {
//           name: subsub.title,
//           image: subsub.thumbnail,
//           type: "Sub-subcategory",
//         },
//       })),
//     })),
//   }))
// );

const home = ref({
  icon: "pi pi-home",
  route: "/dashboard",
});
const breadcrumb = ref([{ label: "Product", route: "/admin/products" }]);

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
  <Head :title="props.title[0]" />
  <app-layout>
    <div class="card">
      <Breadcrumb :home="home" :model="breadcrumb">
        <template #item="{ item }">
          <Link v-if="item.route" :href="item.route">
            <span v-if="item.icon" :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </Link>
          <span v-else class="text-surface-700 dark:text-surface-0">{{
            item.label
          }}</span>
        </template>
      </Breadcrumb>
      <Create
        :show="data.createOpen"
        @close="data.createOpen = false"
        :title="props.title[1]"
      />
      <Edit
        :show="data.editOpen"
        @close="data.editOpen = false"
        :data="data.item"
        :title="props.title[1]"
      />
      <DataTable
        :value="getData.data"
        size="small"
        lazy
        stripedRows
        :loading="!getData.data"
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
              :severity="
                getSeverity(getNestedValue(slotProps.data, column.path))
              "
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
            <div class="capitalize truncate" v-else>
              {{ slotProps.data[column.path] }}
            </div>
          </template>
        </Column>
        <Column style="width: 10rem">
          <template #body="slotProps">
            <div class="flex flex-wrap gap-2 items-center">
              <Button
                type="button"
                icon="pi pi-ellipsis-v"
                rounded
                raised
                variant="text"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                @click="(e) => $refs.menu.toggle(e)"
              />
              <Menu
                ref="menu"
                :model="[
                  {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () => {
                      data.editOpen = true;
                      data.item = data.item = slotProps.data;
                    },
                  },
                  {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => {
                      deleteDialog = true;
                      data.item = data.item = slotProps.data;
                    },
                  },
                ]"
                popup
                id="overlay_menu"
              />
            </div>
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
  </app-layout>
</template>

<style scoped lang="scss"></style>
