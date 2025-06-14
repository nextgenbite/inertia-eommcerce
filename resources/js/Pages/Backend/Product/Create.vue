<script setup>
import { useForm, usePage } from "@inertiajs/vue3";
import { computed, ref, watchEffect } from "vue";
import MultipleImageUpload from "@/Components/MultipleImageUpload.vue";


const props = defineProps({
  show: Boolean,
  title: String,
});
const activeStep = ref(1);

const emit = defineEmits(["close"]);

const form = useForm({
  title: "",
  category_id: "",
  sub_category_id: "",
  sub_sub_category_id: "",
  brand_id: "",
  unit_id: "",
  sku: "",
  barcode: "",
  weight: "",
  thumbnail: null,
  images: [],
  description: "",
  buying_date: "",
  expire_date: "",
  buying_price: "",
  discount_price: "",
  price: "",
  has_variants: false,
  attribute_images: [],
  variants: [],
  status: true,
});

//categories
const categoryOptions = usePage().props.categories;
const subcategoryOptions = ref([]);
const subSubcategoryOptions = ref([]);

function onCategoryChange() {
  const selected = categoryOptions.find((cat) => cat.id === form.category_id);
  subcategoryOptions.value = selected?.sub_categories || [];
  form.sub_category_id = "";
  form.sub_sub_category_id = "";
  subSubcategoryOptions.value = [];
}

function onSubCategoryChange() {
  const selected = subcategoryOptions.value.find(
    (sub) => sub.id === form.sub_category_id
  );
  subSubcategoryOptions.value = selected?.sub_sub_categories || [];
  form.sub_sub_category_id = "";
}

//attributes
const attributeOptions = usePage().props.attributes;

const attributeValueOptions = [
  { label: "Red", value: 1 },
  { label: "Blue", value: 2 },
  { label: "XL", value: 3 },
  { label: "XXL", value: 4 },
]; // You should fetch this from the backend via a prop or API

function addAttributeImage() {
  form.attribute_images.push({ attribute_value_id: null, image_path: "" });
}

function addVariant() {
  form.variants.push({
    sku: "",
    price: null,
    quantity: null,
    attribute_value_ids: [],
  });
}
function uploadImage(event, index) {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    form.attribute_images[index].image_path = file; // for actual upload
    form.attribute_images[index].preview = reader.result; // preview only
  };
  reader.readAsDataURL(file);
}

function generateSku() {
  form.sku = usePage().props.sku;
}
const barcode_image = ref("");
const generateIdentifiers = async () => {
  form.barcode = usePage().props.barcode;
  barcode_image.value = usePage().props.barcode_image;
};
const status = ref([
  { name: "Active", code: "1" },
  { name: "Deactive", code: "0" },
]);
const create = () => {
  form.post(route("categories.store"), {
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
  }
});
</script>

<template>
  <Dialog
    v-model:visible="props.show"
    position="top"
    class="capitalize"
    modal
    :header="'Add ' + props.title"
    :style="{ width: '60rem' }"
    :closable="false"
    maximizable
  >
    <form @submit.prevent="create">
      <div class="flex flex-col gap-4">
        <Stepper value="1">
          <StepItem value="1">
            <Step>Product Details</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="card shadow-lg border border-gray-200">
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
                <div class="flex flex-col gap-2">
                  <label for="title">Description</label>
                  <Editor
                    v-model="form.description"
                    editorStyle="height: 120px"
                  >
                    <template v-slot:toolbar>
                      <span class="ql-formats">
                        <button
                          v-tooltip.bottom="'Bold'"
                          class="ql-bold"
                        ></button>
                        <button
                          v-tooltip.bottom="'Italic'"
                          class="ql-italic"
                        ></button>
                        <button
                          v-tooltip.bottom="'Underline'"
                          class="ql-underline"
                        ></button>
                      </span>
                    </template>
                  </Editor>
                </div>
              </div>
              <div class="py-6">
                <Button label="Next" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>General Setup</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="card shadow-lg border border-gray-200">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  <!-- Category -->
                  <div class="flex flex-col gap-2">
                    <label for="category">Category</label>
                    <Select
                      v-model="form.category_id"
                      :options="categoryOptions"
                      filter
                      optionLabel="title"
                      optionValue="id"
                      checkmark
                      @change="onCategoryChange"
                      placeholder="Select a Category"
                      class="w-full"
                    />
                    <small v-if="form.errors.category_id" class="text-red-500">
                      {{ form.errors.category_id }}
                    </small>
                  </div>

                  <!-- Subcategory -->
                  <div class="flex flex-col gap-2">
                    <label for="subcategory">Sub Category</label>
                    <Select
                      v-model="form.sub_category_id"
                      :options="subcategoryOptions"
                      filter
                      optionLabel="title"
                      optionValue="id"
                      checkmark
                      @change="onSubCategoryChange"
                      placeholder="Select a Sub Category"
                      class="w-full"
                      :disabled="!form.category_id"
                    />
                    <small
                      v-if="form.errors.sub_category_id"
                      class="text-red-500"
                    >
                      {{ form.errors.sub_category_id }}
                    </small>
                  </div>

                  <!-- Sub-subcategory -->
                  <div class="flex flex-col gap-2">
                    <label for="subsubcategory">Sub Subcategory</label>
                    <Select
                      v-model="form.sub_sub_category_id"
                      :options="subSubcategoryOptions"
                      filter
                      optionLabel="title"
                      optionValue="id"
                      checkmark
                      placeholder="Select a Sub Subcategory"
                      class="w-full"
                      :disabled="!form.sub_category_id"
                    />
                    <small
                      v-if="form.errors.sub_sub_category_id"
                      class="text-red-500"
                    >
                      {{ form.errors.sub_sub_category_id }}
                    </small>
                  </div>
                  <!-- Brand -->
                  <div class="flex flex-col gap-2">
                    <label for="subsubcategory">Brand</label>
                    <Select
                      v-model="form.brand_id"
                      :options="$page.props.brands"
                      filter
                      optionLabel="title"
                      optionValue="id"
                      checkmark
                      placeholder="Select a Brand"
                      class="w-full"
                    />
                    <small v-if="form.errors.brand_id" class="text-red-500">
                      {{ form.errors.brand_id }}
                    </small>
                  </div>
                  <!-- Product Sku -->
                  <div class="flex flex-col gap-2">
                    <label for="sku">
                      Product Sku
                      <span>
                        <i
                          v-tooltip.top="
                            'Create a unique product code by clicking on the Generate button'
                          "
                          class="ml-2 pi pi-info-circle"
                        ></i>
                        <button
                          type="button"
                          @click="generateSku()"
                          class="ml-2 text-primary hover:text-gray-400"
                        >
                          Generate
                        </button>
                      </span>
                    </label>
                    <InputText
                      id="sku"
                      v-model="form.sku"
                      class="flex-auto"
                      autocomplete="off"
                      placeholder="Product Sku"
                    />
                    <small v-if="form.errors.sku" class="text-red-500">{{
                      form.errors.sku
                    }}</small>
                  </div>
                  <!-- Unit -->
                  <div class="flex flex-col gap-2">
                    <label for="subsubcategory">Unit</label>
                    <Select
                      v-model="form.unit_id"
                      :options="$page.props.units"
                      filter
                      optionLabel="title"
                      optionValue="id"
                      checkmark
                      placeholder="Select an Unit"
                      class="w-full"
                    />
                    <small v-if="form.errors.unit_id" class="text-red-500">
                      {{ form.errors.unit_id }}
                    </small>
                  </div>

                  <!-- Barcode Input -->
                  <div class="flex flex-col gap-2 mt-4">
                    <label for="barcode">
                      Barcode
                      <span>
                        <i
                          v-tooltip.top="
                            'Create a unique barcode by clicking on the Generate button'
                          "
                          class="ml-2 pi pi-info-circle"
                        ></i>
                        <button
                          type="button"
                          @click="generateIdentifiers"
                          class="ml-2 text-primary hover:text-gray-400"
                        >
                          Generate
                        </button>
                      </span>
                    </label>
                    <InputText v-model="form.barcode" placeholder="Barcode" />
                    <!-- Barcode Image Preview -->
                    <img
                      v-if="form.barcode && barcode_image"
                      :src="barcode_image"
                      alt="Barcode Image"
                      class="mt-2 max-w-xs"
                    />
                  </div>
                </div>
              </div>
              <div class="flex py-6 gap-2">
                <Button
                  label="Back"
                  severity="secondary"
                  @click="activateCallback('1')"
                />
                <Button label="Next" @click="activateCallback('3')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="3">
            <Step>Pricing & Variations</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="card border border-surface-200 shadow-lg">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
                  <!-- Buying Price -->
                  <div class="flex flex-col gap-2">
                    <label for="buying_price">Buying Price</label>
                    <InputText
                      id="buying_price"
                      v-model="form.buying_price"
                      class="flex-auto"
                      type="number"
                    />
                    <small
                      v-if="form.errors.buying_price"
                      class="text-red-500"
                      >{{ form.errors.buying_price }}</small
                    >
                  </div>
                  <!-- Unit Price -->
                  <div class="flex flex-col gap-2">
                    <label for="price">Unit Price</label>
                    <InputText
                      id="price"
                      v-model="form.price"
                      class="flex-auto"
                      type="number"
                    />
                    <small v-if="form.errors.price" class="text-red-500">{{
                      form.errors.price
                    }}</small>
                  </div>
                  <!-- Discount Price -->
                  <div class="flex flex-col gap-2">
                    <label for="discount_price">Discount Price</label>
                    <InputText
                      id="discount_price"
                      v-model="form.discount_price"
                      class="flex-auto"
                      type="number"
                    />
                    <small
                      v-if="form.errors.discount_price"
                      class="text-red-500"
                      >{{ form.errors.discount_price }}</small
                    >
                  </div>
                  <!-- Min. Order Quantity -->
                  <div class="flex flex-col gap-2">
                    <label for="min_qty">Min. Order Quantity</label>
                    <InputText
                      id="min_qty"
                      v-model="form.min_qty"
                      class="flex-auto"
                      type="number"
                    />
                    <small v-if="form.errors.min_qty" class="text-red-500">{{
                      form.errors.min_qty
                    }}</small>
                  </div>
                  <!-- Max Order Quantity -->
                  <div class="flex flex-col gap-2">
                    <label for="max_qty">Max Order Quantity</label>
                    <InputText
                      id="max_qty"
                      v-model="form.min_qty"
                      class="flex-auto"
                      type="number"
                    />
                    <small v-if="form.errors.max_qty" class="text-red-500">{{
                      form.errors.max_qty
                    }}</small>
                  </div>
                </div>

                <div></div>
              </div>
              <div
                class="flex flex-col gap-6 card border border-surface-200 shadow-lg"
              >
                <!-- Has Variants Toggle -->
                <div class="flex items-center gap-3 mb-2">
                  <ToggleSwitch
                    v-model="form.has_variants"
                    :binary="true"
                    inputId="hasVariants"
                  />
                  <label for="hasVariants" class="font-semibold text-gray-700"
                    >Has Variants?</label
                  >
                </div>

                <!-- Attribute Images Section -->
                <div v-if="form.has_variants">
                  <h4 class="font-semibold text-gray-800 mb-2">
                    Attribute Images
                  </h4>
                  <div
                    v-for="(image, index) in form.attribute_images"
                    :key="index"
                    class="flex items-center gap-3 mb-3"
                  >
                    <InputGroup>
                      <Select
                        filter
                        v-model="image.attribute_value_id"
                        :options="$page.props.attribute_values"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select Attribute Value"
                      />
                      <InputGroupAddon>
                        <FileUpload
                          mode="basic"
                          auto
                          customUpload
                          chooseLabel="Upload"
                          @uploader="(e) => uploadImage(e, index)"
                        />
                      </InputGroupAddon>
                    </InputGroup>
                    <img
                      v-if="image.preview"
                      :src="image.preview"
                      class="w-10 h-10 object-cover rounded"
                    />
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      rounded
                      @click="form.attribute_images.splice(index, 1)"
                      v-if="form.attribute_images.length > 1"
                    />
                  </div>
                  <Button
                    icon="pi pi-plus"
                    label="Add Attribute Image"
                    outlined
                    size="small"
                    @click="addAttributeImage"
                  />
                </div>

                <!-- Variants Section -->
                <div class="border-t pt-4" v-if="form.has_variants">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-800">Variants</h4>
                    <Button
                      icon="pi pi-plus"
                      label="Add Variant"
                      outlined
                      size="small"
                      @click="addVariant"
                    />
                  </div>
                  <div
                    v-for="(variant, i) in form.variants"
                    :key="i"
                    class="grid grid-cols-1 md:grid-cols-4 gap-3 items-center mb-3 bg-gray-50 rounded-lg p-3"
                  >
                    <InputText
                      v-model="variant.sku"
                      placeholder="SKU"
                      class="w-full"
                    />
                    <InputNumber
                      v-model="variant.price"
                      placeholder="Price"
                      class="w-full"
                    />
                    <InputNumber
                      v-model="variant.quantity"
                      placeholder="Qty"
                      class="w-full"
                    />
                    <MultiSelect
                      v-model="variant.attribute_value_ids"
                      :options="$page.props.attribute_values"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Attributes"
                      class="w-full"
                      filter
                    />
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      text
                      rounded
                      @click="form.variants.splice(i, 1)"
                      v-if="form.variants.length > 1"
                    />
                  </div>
                </div>
              </div>
              <div class="flex py-6 gap-2">
                <Button
                  label="Back"
                  severity="secondary"
                  @click="activateCallback('2')"
                />
                <Button label="Next" @click="activateCallback('4')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="4">
            <Step>Media</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="grid grid-cols-4 gap-4 card  border border-surface-200 shadow-lg">
           <div>
                 <div class="border border-surface-200 shadow rounded-lg">
                  <img
                    src="/no-image.png"
                    alt="thumbnail"
                    class=" w-40 mx-auto"
                  />
                  <FileUpload
                    mode="basic"
                    auto
                    customUpload
                    size="small"
                    chooseLabel="Upload"
                  />
                </div>
           </div>
                                <MultipleImageUpload v-model="form.images" itemShow="lg:grid-cols-3" class="w-full col-span-3 m-0"/>

              </div>
              <div class="flex py-6 gap-2 justify-end">
                <Button
                  label="Back"
                  severity="secondary"
                  outlined
                  @click="activateCallback('3')"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="activateCallback('5')"
                />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="5">
            <Step>Seo section</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div
                  class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
                >
                  Content III
                </div>
              </div>
              <div class="py-6">
                <Button
                  label="Back"
                  severity="secondary"
                  @click="activateCallback('4')"
                />
              </div>
            </StepPanel>
          </StepItem>
        </Stepper>

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
            label="Save"
          ></Button>
        </div>
      </div>
    </form>
  </Dialog>
</template>
