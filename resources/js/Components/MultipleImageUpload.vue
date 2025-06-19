<template>
    <div class="space-y-6">
        <FileUpload
            name="images[]"
            :url="null"
            :customUpload="true"
            @select="onSelectedFiles"
            :multiple="true"
            accept="image/*"
            :maxFileSize="2000000"
        >
            <template #header="{ chooseCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <div class="flex gap-2">
                        <Button
                            @click="chooseCallback()"
                            icon="pi pi-images"
                            rounded
                            outlined
                            severity="secondary"
                            class="transition hover:bg-gray-100"
                        />
                        <Button
                            @click="clearCallback()"
                            icon="pi pi-times"
                            rounded
                            outlined
                            severity="danger"
                            :disabled="!files || files.length === 0"
                            class="transition hover:bg-red-100"
                        />
                    </div>
                    <div class="flex items-center gap-2">
                        <ProgressBar
                            :value="totalSizePercent"
                            :showValue="false"
                            class="w-48 h-2 rounded bg-gray-200"
                        />
                        <span class="text-xs text-gray-500">{{ totalSize }}B / 2Mb</span>
                    </div>
                </div>
            </template>

            <template #content="{ files, removeFileCallback, messages }">
                <div class="flex flex-col gap-6 pt-4">
                    <Message
                        v-for="message of messages"
                        :key="message"
                        :class="{ 'mb-8': !files.length && !uploadedFiles.length }"
                        severity="error"
                    >
                        {{ message }}
                    </Message>

                    <!-- New Files -->
                    <div v-if="files.length > 0">
                        <h5 class="font-semibold text-gray-700 mb-2">Pending</h5>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4" :class="itemShow ? itemShow : 'lg:grid-cols-4'">
                            <div
                                v-for="(file, index) of files"
                                :key="file.name + index"
                                class="bg-white rounded-lg shadow p-2 flex flex-col items-center gap-2 transition hover:shadow-lg"
                            >
                                <img
                                    role="presentation"
                                    :alt="file.name"
                                    :src="file.objectURL"
                                    class="rounded w-24 h-16 object-cover border"
                                />
                                <p class="font-medium text-xs truncate max-w-[100px] text-gray-800">
                                    {{ file.name }}
                                </p>
                                <div class="text-xs text-gray-500">{{ formatSize(file.size) }}</div>
                                <Badge value="Pending" severity="warn" />
                                <Button
                                    icon="pi pi-times"
                                    @click="onRemoveFile(file, removeFileCallback, index)"
                                    outlined
                                    rounded
                                    severity="danger"
                                    class="mt-2 transition hover:bg-red-100"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Existing Images -->
                    <div v-if="localExistingImages.length > 0">
                        <h5 class="font-semibold text-gray-700 mb-2">Current</h5>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div
                                v-for="(image, index) in localExistingImages"
                                :key="'existing-' + index"
                                class="bg-white rounded-lg shadow p-4 flex flex-col items-center gap-2 transition hover:shadow-lg"
                            >
                                <img
                                    role="presentation"
                                    :alt="image.name"
                                    :src="image.url"
                                    class="rounded w-24 h-16 object-cover border"
                                />
                                <span class="font-medium text-xs truncate max-w-[100px] text-gray-800">
                                    {{ image.name || 'Image ' + (index + 1) }}
                                </span>
                                <Badge value="Complete" severity="success" />
                                <Button
                                    icon="pi pi-times"
                                    @click="removeExistingImage(index)"
                                    outlined
                                    rounded
                                    severity="danger"
                                    class="mt-2 transition hover:bg-red-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <i class="pi pi-cloud-upload text-5xl text-gray-400 mb-2" />
                    <p class="text-gray-500">Drag and drop files here</p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { usePrimeVue } from 'primevue/config';

const $primevue = usePrimeVue();
const emit = defineEmits(["update:modelValue", "update:existingImages"]);
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    existingImages: {
        type: Array,
        default: () => [],
    },
    itemShow: String
});

const totalSize = ref(0);
const totalSizePercent = ref(0);
const selectedFiles = ref([]);
const localExistingImages = ref([...props.existingImages]);

watch(() => props.existingImages, (newVal) => {
    localExistingImages.value = [...newVal];
});

const onSelectedFiles = (event) => {
    selectedFiles.value = event.files;
    totalSize.value = selectedFiles.value.reduce((sum, file) => sum + file.size, 0);
    totalSizePercent.value = totalSize.value / 10;
    emit("update:modelValue", selectedFiles.value);
};

const onRemoveFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    selectedFiles.value.splice(index, 1);
    totalSize.value -= file.size;
    totalSizePercent.value = totalSize.value / 10;
    emit("update:modelValue", selectedFiles.value);
};

const removeExistingImage = (index) => {
    localExistingImages.value.splice(index, 1);
    emit("update:existingImages", localExistingImages.value);
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${formattedSize} ${sizes[i]}`;
};
</script>
