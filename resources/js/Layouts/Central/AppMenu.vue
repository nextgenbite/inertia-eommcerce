<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" }],
  },
  {
    items: [
      {
        label: "Mail",
        icon: "pi pi-fw pi-envelope",
        items: [
          {
            label: "Compose",
            icon: "pi pi-fw pi-pencil",
            to: "/auth/error",
          },
          {
            label: "Inbox",
            icon: "pi pi-fw pi-inbox",
            to: "/auth/login",
          },
        ],
      },
    ],
  },
  {
    label: "Activities",
    items: [
      {
        label: "Tenant",
        icon: "pi pi-fw pi-unlock",
          to: "/admin/tenants",

      },
      {
        label: "Domain",
        icon: "pi pi-fw pi-globe",
          to: "/admin/domains",

      },
      {
        label: "Plan",
        icon: "pi pi-fw pi-key",
          to: "/admin/plans",

      },
        {
            label: "Subscription",
            icon: "pi pi-fw pi-wallet",
            to: "/admin/subscriptions",

        },
        {
            label: "User",
            icon: "pi pi-fw pi-users",
            to: "/admin/users",

        },

    ],
  },
  {
    items: [
      {
        label: "Sales ",
        icon: "pi pi-fw pi-credit-card",
        items: [
          {
            label: "Invoices List",
            icon: "pi pi-fw pi-list",
            to: "/admin/orders",
          },
          {
            label: "POS",
            icon: "pi pi-fw pi-desktop",
            to: "/admin/point-of-sale",
          },
          {
            label: "Return List",
            icon: "pi pi-fw pi-undo",
            to: "/admin/orders/return",
          },
        ],
      },
    ],
  },



{
    label: "Promotion",
    items: [
        {
            label: "Product Promotion",
            icon: "pi pi-fw pi-bolt",
            to: "/admin/promotions",
        },
        {
            label: "Slider",
            icon: "pi pi-fw pi-images",
            to: "/admin/sliders",
        },
    ],
},
  {
    label: "REPORTS",
    items: [
      {
        label: "Sales Report",
        icon: "pi pi-fw pi-chart-line",
        to: "/report/sales",
      },
      {
        label: "Payment Report",
        icon: "pi pi-fw pi-credit-card",
        to: "/report/payment",
      },
      {
        label: "Profit/Loss Report",
        icon: "pi pi-fw pi-chart-line",
        to: "/report/profit-loss",
      },
    ],
  },

  {
    label: "Setup",
    items: [
      {
        label: "Setup",
        icon: "pi pi-fw pi-cog",
        items: [
          {
            label: "General Settings",
            icon: "pi pi-fw pi-cog",
            to: "/admin/general-settings",
          },

          {
            label: "3rd Party Configure",
            icon: "pi pi-fw pi-sync",
            to: "/warehouse",
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: " Database Backup",
        icon: "pi pi-fw pi-database",
        to: "/backup",
      },
    ],
  },

  {
    label: "Submenu",
    items: [
      {
        label: "Submenu 1",
        icon: "pi pi-fw pi-bookmark",
        items: [
          {
            label: "Submenu 1.1",
            icon: "pi pi-fw pi-bookmark",
            items: [
              { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
              { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
              { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
            ],
          },
          {
            label: "Submenu 1.2",
            icon: "pi pi-fw pi-bookmark",
            items: [{ label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" }],
          },
        ],
      },
      {
        label: "Submenu 2",
        icon: "pi pi-fw pi-bookmark",
        items: [
          {
            label: "Submenu 2.1",
            icon: "pi pi-fw pi-bookmark",
            items: [
              { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
              { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
            ],
          },
          {
            label: "Submenu 2.2",
            icon: "pi pi-fw pi-bookmark",
            items: [{ label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" }],
          },
        ],
      },
    ],
  },

]);
</script>
<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
