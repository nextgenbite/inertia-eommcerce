<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref, watchEffect } from "vue";

const props = defineProps({
    show: Boolean,
    title: String,
});

const emit = defineEmits(["close"]);
const status = ref([
    { name: 'Active', code: '1' },
    { name: 'Deactive', code: '0' },
]);
const form = useForm({
    title: "",
    thumbnail: null,
    description: "",
    status: true,
});

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
    <Dialog v-model:visible="props.show" position="top" class=" capitalize" modal :header="'Add ' + props.title"
        :style="{ width: '30rem' }" :closable="false" maximizable >
        <form @submit.prevent="create">
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label for="title">Title</label>
                    <InputText id="title" v-model="form.title" class="flex-auto" autocomplete="off"
                        placeholder="Title" />
                    <small v-if="form.errors.title" class="text-red-500">{{ form.errors.title }}</small>
                </div>


                <div class="flex flex-col gap-2">
                    <label for="title">Description</label>
                    <Editor v-model="form.description" editorStyle="height: 120px">
                        <template v-slot:toolbar>
                            <span class="ql-formats">
                                <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
                                <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
                                <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
                            </span>
                        </template>
                    </Editor>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="status">Status</label>
                    <Select v-model="form.status" :options="status" optionValue="code" optionLabel="name" placeholder="Select" />
                    <!-- <ToggleButton v-model="form.status" class="w-24" :invalid="form.errors.status" onLabel="Active"
                        offLabel="Deactive" /> -->
                    <small v-if="form.errors.status" class="text-red-500">{{ form.errors.status }}</small>

                </div>
                <div class="flex justify-end gap-2">
                    <Button type="button"  label="Cancel" severity="secondary" @click="emit('close')"></Button>
                    <Button type="submit" :loading="form.processing" label="Save"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>
