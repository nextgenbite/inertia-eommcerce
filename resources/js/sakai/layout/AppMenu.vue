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
    label: "Actvities",
    items: [
      {
        label: "Expenses",
        icon: "pi pi-fw pi-wallet",
        items: [
          {
            label: "Category",
            icon: "pi pi-fw pi-tag",
            to: "/admin/expenses/category",
          },
          {
            label: "Expenses List",
            icon: "pi pi-fw pi-list",
            to: "/admin/expenses",
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: "Purchase",
        icon: "pi pi-fw pi-shopping-cart",
        items: [
          {
            label: "Purchase List",
            icon: "pi pi-fw pi-list",
            to: "/admin/purchases",
          },
          {
            label: "Purchase Return",
            icon: "pi pi-fw pi-undo",
            to: "/admin/purchases/return",
          },
        ],
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
    label: "Contact",
    items: [
      { label: "Customer", icon: "pi pi-fw pi-users", to: "/admin/customers" },
    ],
  },
  {
    items: [
      { label: "Suppiler", icon: "pi pi-fw pi-truck", to: "/admin/suppliers" },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Role",
        icon: "pi pi-fw pi-id-card",
        to: "/admin/role",
        can: "role.menu",
      },
      {
        label: "Permission",
        icon: "pi pi-fw pi-key",
        to: "/admin/permission",
        class: "rotated-icon",
        can: "permission.menu",
      },
    ],
  },
  {
    items: [
      {
        label: "User",
        icon: "pi pi-fw pi-user",
        to: "/admin/users",
        can: "user.menu",
      },
    ],
  },

  {
    label: "INVENTORY",
    items: [
      {
        label: "Products",
        icon: "pi pi-fw pi-box",
        items: [
          {
            label: "Categories",
            icon: "pi pi-fw pi-tags",
            to: "/admin/categories",
          },
          {
            label: "Sub Categories",
            icon: "pi pi-fw pi-tags",
            to: "/admin/sub-categories",
          },
          {
            label: "Sub Sub Categories",
            icon: "pi pi-fw pi-tags",
            to: "/admin/sub-subcategories",
          },
          {
            label: "All Categories",
            icon: "pi pi-fw pi-list",
            to: "/admin/all/categories",
          },
          {
            label: "Brand",
            icon: "pi pi-fw pi-briefcase",
            to: "/admin/brands",
          },
          {
            label: "Unit",
            icon: "pi pi-fw pi-sliders-h",
            to: "/admin/units",
          },
          {
            label: "Attribute",
            icon: "pi pi-fw pi-sliders-v",
            to: "/admin/attributes",
          },
          {
            label: "Attribute Value",
            icon: "pi pi-fw pi-list",
            to: "/admin/attribute-values",
          },
          {
            label: "Products List",
            icon: "pi pi-fw pi-list",
            to: "/admin/products",
          },
          {
            label: "Rating",
            icon: "pi pi-fw pi-star",
            to: "/admin/ratings",
          },
        ],
      },
      {
        label: "Warehouses List",
        icon: "pi pi-fw pi-building",
        to: "/admin/warehouses",
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
        label: "Expenses Report",
        icon: "pi pi-fw pi-chart-bar",
        to: "/report/expenses",
      },
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
        label: "Purchase Report",
        icon: "pi pi-fw pi-shopping-cart",
        to: "/report/purchase",
      },
      {
        label: "Profit/Loss Report",
        icon: "pi pi-fw pi-chart-line",
        to: "/report/profit-loss",
      },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      {
        label: "Account",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Billing",
            icon: "pi pi-fw pi-credit-card",
            to: "/account/billing",
          },

          {
            label: "Profile",
            icon: "pi pi-fw pi-user-edit",
            to: "/profile",
          },
        ],
      },
    ],
  },
  {
    // label: 'ACCOUNT',
    items: [
      {
        label: "Domain",
        icon: "pi pi-fw pi-globe",
        items: [
          {
            label: "Domain Management",
            icon: "pi pi-fw pi-server",
            to: "/warehouse",
          },

          {
            label: "Domain Request",
            icon: "pi pi-fw pi-send",
            to: "/warehouse",
          },
        ],
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
            to: "/general-settings",
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
  {
    items: [
      {
        label: "Template Source",
        icon: "pi pi-fw pi-github",
        url: "https://sakai.primevue.org/",
        target: "_blank",
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
