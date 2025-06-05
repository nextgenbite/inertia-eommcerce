<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref, watchEffect, computed } from "vue";
import Editor from "primevue/editor";
import MultipleImageUpload from "@/Components/MultipleImageUpload.vue";

// Define props and emits
const props = defineProps({
  show: Boolean,
  title: String,
  route: String,
  data: Object,
  dynamicFrom: Array,
  modalWidth: String,
});

const emit = defineEmits(["close"]);

const imagePreview = ref(null);
const item = ref({});

// Helper function to initialize form fields
function initializeForm() {
  props.dynamicFrom.forEach((field) => {
    const defaultValue = field.type === "attribute"
      ? []
      : field.type === "select" && field.options[0]
        ? field.options[0][field.optionValue] || ""
        : field.type === "images"
          ? []
          : "";

    item.value[field.path] = defaultValue;
  });
}

// Helper function to convert select value types
function convertSelectValue(value, options, optionValue) {
  if (!options || options.length === 0) return value;

  const sampleOptionValue = options[0][optionValue];
  const isNumber = typeof sampleOptionValue === "number";
  const isBoolean = typeof sampleOptionValue === "boolean";

  if (isNumber) return Number(value);
  if (isBoolean) return value === 'true' || value === true;
  return String(value);
}

// Initialize form
initializeForm();
const form = useForm({
  _method: "put",
  ...item.value,
});

// Update form data
const update = () => {
  form.post(route(`${props.route}.update`, props.data?.id), {
    preserveScroll: true,
    onSuccess: () => {
      emit("close");
      form.reset();
    },
  });
};

// Watch modal show and populate form
let initialized = false;

watchEffect(() => {
  if (props.show && !initialized) {
    initialized = true;
    form.errors = {};

    props.dynamicFrom.forEach((field) => {
      if (field.type === "image") {
        imagePreview.value = "/" + props.data[field.path];
      } else if (field.type === "images") {
        form[field.path] = [];
      } else if (field.type === "attribute") {
        const data = props.data[field.path] ? JSON.parse(props.data[field.path]) : [];
        field.items = data.map((item) => {
          return Object.keys(field.items[0] || {}).reduce((acc, key) => {
            acc[key] = item[key] || "";
            return acc;
          }, {});
        });
        form[field.key] = [...field.items];
      } else if (field.type === "select") {
        form[field.path] = convertSelectValue(props.data[field.path], field.options, field.optionValue);
      } else {
        form[field.path] = props.data[field.path] ?? "";
      }
    });
  }

  if (!props.show) {
    initialized = false;
  }
});

// Add more attributes
const addMore = () => {
  const attributeInput = props.dynamicFrom.find((item) => item.key === "attribute");

  if (attributeInput && Array.isArray(attributeInput.items)) {
    const newItem = Object.keys(attributeInput.items[0] || {}).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    attributeInput.items.push(newItem);
    form[attributeInput.type] = [...attributeInput.items];
  }
};

// Remove attribute
const remove = (index) => {
  const attributeInput = props.dynamicFrom.find((item) => item.key === "attribute");

  if (attributeInput && Array.isArray(attributeInput.items)) {
    attributeInput.items.splice(index, 1);
    form[attributeInput.type] = [...attributeInput.items];
  }
};

// Handle image file selection
const onFileSelect = (event, field) => {
  const file = event.files[0];
  if (!file) return;

  if (field.type === "image") {
    form[field.path] = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Parse images for preview
function parseImages(value) {
  try {
    const images = typeof value === 'string' ? JSON.parse(value) : value || [];
    return images.map((img) =>
      typeof img === 'string' ? { url: '/' + img, name: img.split('/').pop() } : img
    );
  } catch (e) {
    return [];
  }
}

const columnClassMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
};

const columnClass = computed(() => {
  const count = (form.attribute.items ?? []).length;
  return columnClassMap[count] || 'grid-cols-1';
});
</script>

<template>
  <Dialog v-model:visible="props.show" position="top" modal :header="'Update ' + props.title"
    :style="{ width: props.modalWidth || '32rem' }" :closable="false">

    <form @submit.prevent="update">
      <div class="grid grid-cols-12 gap-2">
        <div v-for="input in dynamicFrom" :key="input.key" class="field col-span-12" :class="input.class || ''">
          <label :for="input.path">{{ input.label }}</label>

          <Editor v-if="input.type === 'textarea'" v-model="form[input.path]" editorStyle="height: 120px" />

          <Select v-else-if="input.type === 'select'" class="w-full" v-model="form[input.path]" :options="input.options"
            :optionValue="input.optionValue" :optionLabel="input.optionLabel" :placeholder="'Select ' + input.label" />

          <div v-else-if="input.type === 'image'" class="card flex flex-col items-center gap-6">
            <img v-if="imagePreview" :src="imagePreview" alt="Thumbnail" class="shadow-md rounded-xl w-full sm:w-64" />
            <FileUpload mode="basic" @select="(event) => onFileSelect(event, input)" auto customUpload accept="image/*"
              chooseLabel="Select Thumbnail" />
          </div>

          <MultipleImageUpload v-else-if="input?.type === 'images'" v-model="form[input.path]"
            :existingImages="parseImages(data[input.path])" @update:existingImages="form[input.path] = $event" />

          <div v-else-if="input.type === 'attribute'" class="grid gap-1" :class="columnClass">
            <div v-for="(attribute, index) in form.attribute" :key="index" class="flex gap-2">
              <div v-for="(value, key) in attribute" :key="key" class="col-span-1">
                <InputText v-model="attribute[key]" :placeholder="key" required />
              </div>
              <Button v-if="index > 0" @click="remove(index)" icon="pi pi-minus" severity="danger" rounded raised outlined size="small" />
            </div>
            <Button @click="addMore" icon="pi pi-plus" severity="success" rounded raised outlined size="small" />
          </div>

          <InputText v-else class="w-full" v-model="form[input.path]" :type="input.type" />

          <small v-if="form.errors[input.path]" class="text-red-500">{{ form.errors[input.path] }}</small>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancel" severity="secondary" @click="emit('close')" />
        <Button type="submit" label="Update" :loading="form.processing" />
      </div>
    </form>
  </Dialog>
</template>

