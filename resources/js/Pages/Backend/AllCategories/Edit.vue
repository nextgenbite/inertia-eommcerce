<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref, watchEffect } from "vue";
import Editor from "primevue/editor";
const props = defineProps({
  show: Boolean,
  title: String,
  data: Object,
});

const imagePreview = ref(null);
const emit = defineEmits(["close"]);


const status = ref([
  { name: "Active", code: "1" },
  { name: "Deactive", code: "0" },
]);

const form = useForm({
  title: "",
  thumbnail: null,
  description: "",
  status: true,
});


const onFileSelect = (event, field) => {
  const file = event.files[0];
  if (!file) return;

    form['thumbnail'] = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);

};


const update = () => {
  form.put(route("categories.update", props.data?.id), {
    preserveScroll: true,
    onSuccess: () => {
      emit("close");
      form.reset();
    },
    onError: () => null,
    onFinish: () => null,
  });
};

watchEffect(() => {
  if (props.show) {
    form.errors = {};
    form.title = props.data?.name;
    form.description = props.data?.description;
    form.status = props.data?.status;
  }
});

const selectedCategory = ref();

</script>

<template>
  <Dialog
    v-model:visible="props.show"
    position="top"
    modal
    :header="'Update ' + props.title"
    :style="{ width: '30rem' }"
    :closable="false"
  >
    {{ selectedCategory }}
    <form @submit.prevent="update">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="title">Title</label>
          <InputText
            id="title"
            v-model="form.title"
            class="flex-auto"
            autocomplete="off"
            placeholder="Title"
          />
          <small v-if="form.errors.title" class="text-red-500">{{
            form.errors.title
          }}</small>
        </div>
        <CascadeSelect
          v-model="selectedCategory"
          :options="$page.props.getData.data"
          optionLabel="title"
          optionGroupLabel="title"
          :optionGroupChildren="['sub_categories']"
          placeholder="Select a Category"
        >
          <template #option="slotProps">
            <div class="flex items-center">
              <i
                v-if="slotProps.option.sub_categories"
                class="pi pi-folder-open mr-2"
              ></i>
              <i v-else class="pi pi-tag mr-2"></i>
              <span>{{ slotProps.option.title }}</span>
            </div>
          </template>
          <template #dropdownicon>
            <i class="pi pi-list" />
          </template>
          <template #header>
            <div class="font-medium px-3 py-2">Available Categories</div>
          </template>
        </CascadeSelect>

        <div class="flex flex-col gap-2">
          <label for="title">Description</label>
          <Editor v-model="form.description" editorStyle="height: 120px">
            <template v-slot:toolbar>
              <span class="ql-formats">
                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                <button
                  v-tooltip.bottom="'Underline'"
                  class="ql-underline"
                ></button>
              </span>
            </template>
          </Editor>
        </div>
           <div  class="card flex flex-col items-center gap-6">
            <img v-if="imagePreview" :src="imagePreview" alt="Thumbnail" class="shadow-md rounded-xl w-full sm:w-64" />
            <FileUpload mode="basic" @select="(event) => onFileSelect(event, input)" auto customUpload accept="image/*"
              chooseLabel="Select Thumbnail" />
          </div>
        <div class="flex flex-col gap-2">
          <label for="status">Status</label>
          <Select
            v-model="form.status"
            :options="status"
            optionValue="code"
            optionLabel="name"
            placeholder="Select"
          />
          <!-- <ToggleButton v-model="form.status" class="w-24" :invalid="form.errors.status" onLabel="Active"
                        offLabel="Deactive" /> -->
          <small v-if="form.errors.status" class="text-red-500">{{
            form.errors.status
          }}</small>
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="emit('close')"
          ></Button>
          <Button
            type="submit"
            :loading="form.processing"
            label="Update"
          ></Button>
        </div>
      </div>
    </form>
  </Dialog>
</template>
