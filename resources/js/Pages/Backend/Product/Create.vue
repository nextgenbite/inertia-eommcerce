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
  length: "",
  width: "",
  height: "",
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
  min_qty: null,
max_qty: null,
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
const imagePreview = ref("/no-image.png");
function onFileSelect(event, field) {
  const file = event.files[0];
  if (!file) return;
  // Directly use the file object for image field

  form.thumbnail = file; // Store the file object directly

  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };

  reader.readAsDataURL(file); // Convert the file to a base64 data URL
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
  form.post(route("products.store"), {
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
        <Stepper :value="1">
          <StepItem :value="1">
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
                  <label for="description">Description</label>
                  <Editor
                    v-model="form.description"
                    editorStyle="height: 120px"
                  >
                    <template #toolbar>
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

              <div class="flex py-6 gap-4 justify-end">
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="rounded-lg px-6"
                  @click="activateCallback('2')"
                />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>General Setup </Step>
            <StepPanel v-slot="{ activateCallback }">
              <div
                class="card shadow-lg border border-gray-200 p-8 rounded-2xl bg-white"
              >
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <!-- Category -->
                  <div>
                    <label
                      for="category"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Category</label
                    >
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
                    <small
                      v-if="form.errors.category_id"
                      class="text-red-500"
                      >{{ form.errors.category_id }}</small
                    >
                  </div>
                  <!-- Subcategory -->
                  <div>
                    <label
                      for="subcategory"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Sub Category</label
                    >
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
                      >{{ form.errors.sub_category_id }}</small
                    >
                  </div>
                  <!-- Sub-subcategory -->
                  <div>
                    <label
                      for="subsubcategory"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Sub Subcategory</label
                    >
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
                      >{{ form.errors.sub_sub_category_id }}</small
                    >
                  </div>
                  <!-- Brand -->
                  <div>
                    <label
                      for="brand"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Brand</label
                    >
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
                    <small v-if="form.errors.brand_id" class="text-red-500">{{
                      form.errors.brand_id
                    }}</small>
                  </div>
                  <!-- Product SKU -->
                  <div>
                    <label
                      for="sku"
                      class=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                    >
                      Product SKU
                      <i
                        v-tooltip.top="
                          'Create a unique product code by clicking on the Generate button'
                        "
                        class="pi pi-info-circle text-gray-400"
                      ></i>
                      <button
                        type="button"
                        @click="generateSku()"
                        class="ml-2 text-primary-600 hover:text-primary-800 text-xs underline"
                      >
                        Generate
                      </button>
                    </label>
                    <InputText
                      id="sku"
                      v-model="form.sku"
                      class="w-full"
                      autocomplete="off"
                      placeholder="Product SKU"
                    />
                    <small v-if="form.errors.sku" class="text-red-500">{{
                      form.errors.sku
                    }}</small>
                  </div>
                  <!-- Unit -->
                  <div>
                    <label
                      for="unit"
                      class="block text-sm font-medium text-gray-700 mb-1"
                      >Unit</label
                    >
                    <Select
                      v-model="form.unit_id"
                      :options="$page.props.units"
                      filter
                      optionLabel="title"
                      optionValue="id"
                      checkmark
                      placeholder="Select a Unit"
                      class="w-full"
                    />
                    <small v-if="form.errors.unit_id" class="text-red-500">{{
                      form.errors.unit_id
                    }}</small>
                  </div>
                  <!-- Barcode Input -->
                  <div class="md:col-span-2">
                    <label
                      for="barcode"
                      class="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
                    >
                      Barcode
                      <i
                        v-tooltip.top="
                          'Create a unique barcode by clicking on the Generate button'
                        "
                        class="pi pi-info-circle text-gray-400"
                      ></i>
                      <button
                        type="button"
                        @click="generateIdentifiers"
                        class="ml-2 text-primary-600 hover:text-primary-800 text-xs underline"
                      >
                        Generate
                      </button>
                    </label>
                    <InputText
                      v-model="form.barcode"
                      placeholder="Barcode"
                      class="w-full"
                    />
                    <img
                      v-if="form.barcode && barcode_image"
                      :src="barcode_image"
                      alt="Barcode Image"
                      class="mt-2 max-w-xs rounded border border-gray-200"
                    />
                  </div>
                  <!-- Product Dimension -->
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Product Dimensions (L × W × H in cm)</label
                    >
                    <div class="flex gap-2">
                      <InputText
                        v-model="form.length"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Length"
                        class="w-1/3"
                      />
                      <InputText
                        v-model="form.width"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Width"
                        class="w-1/3"
                      />
                      <InputText
                        v-model="form.height"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Height"
                        class="w-1/3"
                      />
                    </div>
                    <div class="flex gap-2 mt-1">
                      <small v-if="form.errors.length" class="text-red-500">{{
                        form.errors.length
                      }}</small>
                      <small v-if="form.errors.width" class="text-red-500">{{
                        form.errors.width
                      }}</small>
                      <small v-if="form.errors.height" class="text-red-500">{{
                        form.errors.height
                      }}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex py-6 gap-4 justify-end">
                <Button
                  label="Back"
                  severity="secondary"
                  outlined
                  class="rounded-lg px-6"
                  @click="activateCallback(1)"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="rounded-lg px-6"
                  @click="activateCallback('3')"
                />
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
                      v-model="form.max_qty"
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

              <div class="flex py-6 gap-4 justify-end">
                <Button
                  label="Back"
                  severity="secondary"
                  outlined
                  class="rounded-lg px-6"
                  @click="activateCallback('2')"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="rounded-lg px-6"
                  @click="activateCallback('4')"
                />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="4">
            <Step>Media</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div
                class="grid grid-cols-1 md:grid-cols-3 gap-8 card border border-surface-200 shadow-lg p-8 bg-white rounded-2xl"
              >
                <!-- Thumbnail Upload -->
                <div class="flex flex-col items-center gap-4">
                  <label
                    class="font-semibold text-gray-900 mb-2 text-base tracking-wide"
                    >Thumbnail</label
                  >
                  <div
                    class="bg-gray-100 rounded-2xl p-2 border border-gray-200 shadow transition-shadow hover:shadow-md"
                  >
                    <div
                      class="rounded-xl overflow-hidden flex items-center justify-center bg-white"
                    >
                      <img
                        :src="imagePreview"
                        alt="Thumbnail"
                        class="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                      />
                    </div>
                    <FileUpload
                      mode="basic"
                      @select="(event) => onFileSelect(event, input)"
                      auto
                      accept="image/*"
                      customUpload
                      size="small"
                      chooseLabel="Upload"
                      class="w-full mt-3"
                      :pt="{
                        button:
                          'rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 transition',
                      }"
                    />
                  </div>
                  <small
                    v-if="form.errors.thumbnail"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ form.errors.thumbnail }}
                  </small>
                </div>
                <!-- Multiple Images Upload -->
                <div class="md:col-span-2 flex flex-col gap-4">
                  <label
                    class="font-semibold text-gray-900 mb-2 text-base tracking-wide"
                    >Gallery Images</label
                  >
                  <MultipleImageUpload
                    v-model="form.images"
                    itemShow="lg:grid-cols-3"
                    class="w-full"
                  />
                  <small
                    v-if="form.errors.images"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ form.errors.images }}
                  </small>
                </div>
              </div>
              <div class="flex py-8 gap-4 justify-end">
                <Button
                  label="Back"
                  severity="secondary"
                  outlined
                  class="rounded-lg px-6"
                  @click="activateCallback('3')"
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  class="rounded-lg px-6"
                  @click="activateCallback('5')"
                />
              </div>
            </StepPanel>
          </StepItem>

          <StepItem value="5">
            <Step>SEO Section</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                  <label for="meta_title" class="font-semibold"
                    >Meta Title</label
                  >
                  <InputText
                    id="meta_title"
                    v-model="form.meta_title"
                    class="flex-auto"
                    autocomplete="off"
                    placeholder="Meta Title"
                  />
                  <small v-if="form.errors.meta_title" class="text-red-500">
                    {{ form.errors.meta_title }}
                  </small>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="meta_description" class="font-semibold"
                    >Meta Description</label
                  >
                  <Textarea
                    id="meta_description"
                    v-model="form.meta_description"
                    rows="3"
                    class="flex-auto"
                    placeholder="Meta Description"
                  />
                  <small
                    v-if="form.errors.meta_description"
                    class="text-red-500"
                  >
                    {{ form.errors.meta_description }}
                  </small>
                </div>
                <div class="flex flex-col gap-2">
                  <label for="meta_keywords" class="font-semibold"
                    >Meta Keywords</label
                  >
                  <InputText
                    id="meta_keywords"
                    v-model="form.meta_keywords"
                    class="flex-auto"
                    placeholder="Meta Keywords (comma separated)"
                  />
                  <small v-if="form.errors.meta_keywords" class="text-red-500">
                    {{ form.errors.meta_keywords }}
                  </small>
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
