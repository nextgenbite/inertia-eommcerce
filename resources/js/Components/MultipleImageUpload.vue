<template>
    <div class="card">
        <FileUpload name="images[]" :url="null" :customUpload="true" @select="onSelectedFiles" :multiple="true"
            accept="image/*" :maxFileSize="1000000">
            <template #header="{ chooseCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                    <div class="flex gap-2">
                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary" />
                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                            :disabled="!files || files.length === 0" />
                    </div>
                    <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                        <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                    </ProgressBar>
                </div>
            </template>

            <template #content="{ files, removeFileCallback, messages  }">
                <div class="flex flex-col gap-4 pt-4">
                    <Message v-for="message of messages" :key="message" :class="{ 'mb-8': !files.length && !uploadedFiles.length}" severity="error">
                {{ message }}
            </Message>

                    <!-- New Files -->
                    <div v-if="files.length > 0">
                        <h5>Pending</h5>
                        <div class="grid  grid-cols-2 lg:grid-cols-4 gap-2">
                            <div v-for="(file, index) of files" :key="file.name + index"
                                class="p-4 rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100"
                                        height="50" />
                                </div>
                                <span class="font-semibold text-ellipsis max-w-44 text-xs whitespace-nowrap overflow-hidden">
                                    {{ file.name }}
                                    </span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Badge value="Pending" severity="warn" />
                                <Button icon="pi pi-times" @click="onRemoveFile(file, removeFileCallback, index)"
                                    outlined rounded severity="danger" />
                            </div>
                        </div>
                    </div>


                    <!-- Existing Images -->
                    <div v-if="localExistingImages.length > 0">
                        <h5>Current</h5>
                        <div class="grid  grid-cols-2 lg:grid-cols-4 gap-2">
                            <div v-for="(image, index) in localExistingImages" :key="'existing-' + index"
                                class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                <div>
                                    <img role="presentation" :alt="image.name" :src="image.url" width="100"
                                        height="50" />
                                </div>
                                <span class="font-semibold text-ellipsis max-w-44 whitespace-nowrap overflow-hidden text-xs">{{
                                    image.name || 'Image ' + (index + 1) }}</span>
                                <Badge value="Complete" severity="success" />
                                <Button icon="pi pi-times" @click="removeExistingImage(index)" outlined rounded
                                    severity="danger" />
                            </div>
                        </div>
                    </div>

                </div>
            </template>

            <template #empty>
                <div class="text-center py-6">
                    <i class="pi pi-cloud-upload text-4xl mb-2" />
                    <p>Drag and drop files here</p>
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
