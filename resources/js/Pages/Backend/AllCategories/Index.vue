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

  form.delete(route("permission.destroy", data.item?.id), {
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
    route("all.categories"),
    { page: event.page + 1 },
    { preserveState: true }
  );
};

watch(
  () => _.cloneDeep(data.params),
  debounce(() => {
    let params = pickBy(data.params);
    router.get(route("all.categories"), params, {
      replace: true,
      preserveState: true,
      preserveScroll: true,
    });
  }, 150)
);

// Transform categories to tree structure
const treeData = computed(() =>
  props.getData.data.map((category, i) => ({
    key: `${i}`,
    data: {
      name: category.title,
      description: category.description,
      image: category.thumbnail,
      type: "Category",
      status: category.status,
    },
    children: (category.sub_categories || []).map((sub, j) => ({
      key: `${i}-${j}`,
      data: {
        name: sub.title,
        image: sub.thumbnail,
        type: "Subcategory",
      },
      children: (sub.sub_sub_categories || []).map((subsub, k) => ({
        key: `${i}-${j}-${k}`,
        data: {
          name: subsub.title,
          image: subsub.thumbnail,
          type: "Sub-subcategory",
        },
      })),
    })),
  }))
);

const home = ref({
  icon: "pi pi-home",
  route: "/dashboard",
});
const breadcrumb = ref([
  { label: "Product", route: "/admin/products" },
  { label: "All Categories" },
]);
</script>

<template>
  <Head :title="props.title[0]" />
  <app-layout>
    <div class="card">
      <Breadcrumb :home="home" :model="breadcrumb">
        <template #item="{ item }">
          <Link v-if="item.route" :href="item.route" >
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

      <TreeTable :value="treeData"
         size="small"
      lazy
      stripedRows
      :loading="!getData.data"
       paginator
      :rows="getData.per_page"
      :totalRecords="getData.total"
      :first="(getData.current_page - 1) * getData.per_page"
      @page="onPageChange"
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
        <Column field="name" header="Name" :expander="true">
          <template #body="{ node }">
            <div class="flex items-center gap-2">
              <img
                :src="node.data.image ? `/${node.data.image}` : '/no-image.png'"
                class="w-6 h-6 object-contain"
              />
              <span>{{ node.data.name }}</span>
            </div>
          </template>
        </Column>
        <Column field="type" header="Type" />
        <Column style="width: 10rem">
          <template #body="{ node }">
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
                      data.item = node.data;
                    },
                  },
                  {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => {
                      deleteDialog = true;
                      data.item = node.data;
                    },
                  },
                ]"
                popup
                id="overlay_menu"
              />
            </div>
          </template>
        </Column>
      </TreeTable>
      <Dialog
        v-model:visible="deleteDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="flex items-center gap-4">
          <i class="pi pi-exclamation-triangle !text-3xl" />
          <span v-if="data.item"
            >Are you sure you want to delete <b>{{ data.item.name }}</b
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
