<script setup>
import { ref, watchEffect, computed } from "vue";
import { useForm } from "@inertiajs/vue3";
import MultipleImageUpload from "@/Components/MultipleImageUpload.vue";
const props = defineProps({
  show: Boolean,
  title: String,
  route: String,
  dynamicFrom: Array,
  modalWidth: String,
});

const emit = defineEmits(["close"]);

// Dynamically initialize item object based on form paths
const item = ref({});
// Helper function to initialize form fields
function initializeForm() {
  props.dynamicFrom.forEach((field) => {
    const defaultValue =
      field.type === "attribute"
        ? []
        : //   : field.type === "select" && field.options[0]
        //     ? field.options[0][field.optionValue] || ""
        field.type === "images"
        ? []
        : "";

    item.value[field.path] = defaultValue;
  });
}
// props.dynamicFrom.forEach((field) => {
//   if (field.type === "attribute") {
//     item.value[field.type] = field.items || []; // Fallback to empty array
//   }if (field.key === "images") {

//       item.value[field.path] = [];
//   } else {
//     item.value[field.path] = "";
//   }
// });
initializeForm();
const form = useForm(item.value);
const imagePreview = ref();

const create = () => {
  form.post(route(`${props.route}.store`), {
    preserveScroll: true,
    onSuccess: () => {
      emit("close");
      form.reset();
    },
    onError: () => null,
    onFinish: () => null,
  });
};

// Watch modal show and populate form
let initialized = false;

watchEffect(() => {
  if (props.show && !initialized) {
    initialized = true;
    form.errors = {};

    props.dynamicFrom.forEach((field) => {
      if (field.type === "attribute") {
        // Ensure attribute is initialized as an array of objects
        form[field.path] = Array.isArray(field.items) ? [...field.items] : [];
      } else if (field.type === "images") {
        form[field.path] = [];
      } else {
        form[field.path] = "";
      }
    });
  }

  if (!props.show) {
    initialized = false;
  }
});
const isBase64 = (str) => {
  const base64Pattern = /^data:image\/[a-zA-Z]+;base64,/;
  return base64Pattern.test(str);
};

const calculateTotal = (item) => {
  // Check if both price and quantity are provided
  if (item.price && item.quantity) {
    return item.price * item.quantity;
  }
  return item.price || 0; // Return price if only price is available
};

const addMore = () => {
  const attributeInput = props?.dynamicFrom.find(
    (item) => item.key === "attribute"
  );

  if (attributeInput && Array.isArray(attributeInput.items)) {
    const defaultItem = attributeInput.items[0] || {};
    const newItem = Object.keys(defaultItem).reduce((acc, key) => {
      acc[key] = ""; // Initialize with default empty values
      return acc;
    }, {});
    attributeInput.items.push(newItem);

    // Ensure reactivity by directly assigning the array
    form.attribute = [...attributeInput.items];
  }
};

const remove = (index) => {
  const attributeInput = props?.dynamicFrom.find(
    (item) => item.key === "attribute"
  );
  if (attributeInput && Array.isArray(attributeInput.items)) {
    attributeInput.items.splice(index, 1);

    // Update form to ensure reactivity
    form.attribute = [...attributeInput.items];
  }
};

function onFileSelect(event, field) {
  const file = event.files[0];
  if (!file) return;
  // Directly use the file object for image field
  if (field.type === "image") {
    form[field.path] = file; // Store the file object directly

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };

    reader.readAsDataURL(file); // Convert the file to a base64 data URL
  }
}

const columnClassMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
};

const columnClass = computed(() => {
  const count = (form.attribute.items ?? []).length;
  return columnClassMap[count] || "grid-cols-1";
});
</script>

<template>
  <Dialog
    v-model:visible="props.show"
    position="top"
    class="capitalize"
    modal
    :header="'Add ' + props.title"
    :style="{ width: props.modalWidth || '32rem' }"
    :closable="false"
    maximizable
  >
    <form @submit.prevent="create">
      <div class="grid grid-cols-12 gap-2">
        <div
          v-for="input in dynamicFrom"
          :key="input.key"
             class="field col-span-12"
          :class="input.class || ''"
        >
          <label :for="input.path">{{ input.label }}</label>
          <Editor
            v-if="input.type === 'textarea'"
            v-model="form[input.path]"
            editorStyle="height: 120px"
          />
          <!-- select option-->
          <Select
            filter
            checkmark
            class="w-full"
            v-else-if="input.type === 'select'"
            :id="input.path"
            v-model="form[input.path]"
            :options="input.options"
            :optionValue="input.optionValue"
            :optionLabel="input.optionLabel"
            :placeholder="'Select a ' + input.label"
          />
          <!-- multi select option-->
          <MultiSelect
            v-else-if="input.type === 'multi_select'"
            class="w-full"
            v-model="form[input.path]"
            filter
            checkmark
            :options="input.options"
            display="chip"
            :optionValue="input.optionValue"
            :optionLabel="input.optionLabel"
            :placeholder="'Select ' + input.label"
          />

          <!-- Thumbnail Input and Preview -->
          <div
            class="card flex flex-col items-center gap-6"
            v-else-if="input.type === 'image'"
          >
            <div v-if="imagePreview">
              <!-- Image Preview -->
              <img
                :src="imagePreview"
                alt="Thumbnail"
                class="shadow-md rounded-xl w-full sm:w-64"
              />
            </div>
            <div v-else>
              <!-- Placeholder when no image is selected -->
              <div class="placeholder-image">No thumbnail selected.</div>
            </div>

            <!-- FileUpload for Thumbnail, dynamically use input -->
            <FileUpload
              mode="basic"
              @select="(event) => onFileSelect(event, input)"
              auto
              customUpload
              accept="image/*"
              chooseLabel="Select Thumbnail"
              severity="secondary"
              class="p-button-outlined"
            />
          </div>

          <MultipleImageUpload
            v-else-if="input?.type === 'images'"
            v-model="form[input.path]"
          />

          <div
            v-else-if="input.type === 'attribute'"
            class="grid gap-1"
            :class="columnClass"
          >
            <div
              v-for="(attribute, index) in form.attribute"
              :key="index"
              class="flex gap-2"
            >
              <div
                v-for="(value, key) in attribute"
                :key="key"
                class="col-span-1"
              >
                <InputText
                  v-model="attribute[key]"
                  :placeholder="key"
                  required
                  class="w-full"
                />
              </div>
              <Button
                v-if="index > 0"
                @click="remove(index)"
                icon="pi pi-minus"
                severity="danger"
                rounded
                raised
                outlined
                size="small"
              />
            </div>
            <Button
              @click="addMore"
              icon="pi pi-plus"
              severity="success"
              rounded
              raised
              outlined
              size="small"
            />
          </div>

          <DatePicker
            id="datepicker-24h"
            v-else-if="input.type === 'date_time'"
            v-model="form[input.path]"
            showTime
            hourFormat="24"
            fluid
          />

          <!-- text input -->
          <InputText
            class="w-full"
            v-else
            :type="input?.type"
            :id="input.path"
            v-model.trim="form[input.path]"
            autofocus
            :class="{ 'p-invalid': form.errors[[input.path]] }"
          />
          <small v-if="form.errors[[input.path]]" class="text-red-500">{{
            form.errors.title
          }}</small>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="emit('close')"
        ></Button>
        <Button type="submit" :loading="form.processing" label="Save"></Button>
      </div>
    </form>
  </Dialog>
</template>
