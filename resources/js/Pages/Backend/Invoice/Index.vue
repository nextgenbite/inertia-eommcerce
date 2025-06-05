<script setup>
import AppLayout from "@/sakai/layout/AppLayout.vue";
import Table from "@/Components/Crud/Table.vue";
import { Head } from "@inertiajs/vue3";
const props = defineProps({
    title: Array,
    filters: Object,
    getData: Object,
    perPage: Number,
    columns: {
      type: Array,
    //   required: true,
    },
    form: {
      type: Array,
      required: true,
    },
      route: {
      type: String,
      required: true,
    }
});

</script>

<template>

    <Head :title="props.title[0]" />
    <app-layout>
        <Table
          :title="props.title" :filters="props.filters"
           :getData="props.getData"
            :perPage="props.perPage"
            :columns="props.columns"
             :route="route"
              :dynamicFrom="props.form"
               />
    </app-layout>
</template>

<style scoped lang="scss"></style>
