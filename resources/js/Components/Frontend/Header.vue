<template>
  <div>
    <div ref="header" id="header" class="w-full z-50">
      <!-- ---- Start Header ----- -->

      <header class="py-1 px-4 lg:px-8 md:pt-2 shadow-sm bg-white/20 w-full">
        <div class="flex items-center justify-between lg:gap-4">
          <!-- logo  -->
          <Link href="/" title="title" class="">
            <img
              :src="`/${$page.props.settings.logo}` || '/no-image.png'"
              alt="logo"
              class="w-full h-12 hidden lg:block object-contain"
            />
            <img
              :src="`/${$page.props.settings.favicon}` || '/no-image.png'"
              alt="mobile logo"
              class="w-full h-12 lg:hidden object-contain"
            />
          </Link>
          <!-- logo end  -->
          <!-- search   -->
          <Search />
          <!-- search End  -->

          <!-- NavIcons -->

          <div class="space-x-3 flex items-center">
            <div class="hidden lg:flex items-center justify-around space-x-4">
              <OverlayBadge :value="'0'" severity="danger">
                <Button
                  icon="pi pi-heart"
                  variant="text"
                  raised
                  rounded
                  aria-label="Filter"
                />
              </OverlayBadge>
              <!-- <OverlayBadge :value="cartCount" severity="danger">
   <Button icon="pi pi-shopping-bag" @click="CartToggle"  variant="text" raised rounded aria-label="Filter"  />
      <Menu ref="cart" id="overlay_tmenu" :model="carts" popup>
            <template #item="{ item}">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" class="pi pi-angle-right ml-auto"></i>
                </a>
            </template>
        </Menu>
</OverlayBadge> -->
              <CartComponent />
              <div>
                <div class="layout-topbar-menu hidden lg:block">
                  <div class="layout-topbar-menu-content">
                    <div class="relative">
                      <Button
                        icon="pi pi-user"
                        variant="text"
                        raised
                        rounded
                        aria-label="Filter"
                        class="layout-topbar-action"
                        v-styleclass="{
                          selector: '@next',
                          enterFromClass: 'hidden',
                          enterActiveClass: 'animate-scalein',
                          leaveToClass: 'hidden',
                          leaveActiveClass: 'animate-fadeout',
                          hideOnOutsideClick: true,
                        }"
                      />
                      <div
                        class="hidden bg-white shadow-md absolute right-0 mt-2 w-48 py-2 rounded-md z-50 divide-y divide-slate-200"
                      >
                        <DropdownLink
                          :href="route('login')"
                          method="get"
                          as="button"
                        >
                          Sign In
                        </DropdownLink>
                        <DropdownLink
                          :href="route('register')"
                          method="get"
                          as="button"
                        >
                          Sign Up
                        </DropdownLink>
                        <DropdownLink
                          :href="route('logout')"
                          method="post"
                          as="button"
                        >
                          Sign Out
                        </DropdownLink>
                        <!-- <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--
          <Link
            href="/login"
            title="Login"
            class="text-gray-800 hover:text-secondary transition font-semibold hidden lg:inline"
          >
            Login
          </Link>
          <span class="hidden lg:inline text-gray-200">|</span>
          <Link
            href="/register"
            title="Register"
            class="text-gray-800 hover:text-secondary transition font-semibold hidden lg:inline"
          > Register</Link> -->

            <!-- <a  href="#" class="md:block hidden text-center text-white md:text-gray-700 hover:text-primary transition relative " title="Cart">
                    <span class=" absolute -right-2 -top-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5 rounded-full flex items-center justify-center  bg-primary text-white text-xs "> 5 </span>
                    <div class="text-xl lg:text-2xl">
                         <i class="pi pi-shopping-bag "></i>
                    </div>
               </a> -->

            <a
              href="#"
              id="menuBar"
              class="lg:hidden text-gray-800 hover:text-primary transition"
              title="Account"
            >
              <div
                class="text-xl lg:text-2xl"
                @click.prevent="toggleMenu = true"
              >
                <i class="pi pi-bars"></i>
              </div>
            </a>
          </div>
          <!-- NavIcons End  -->
        </div>
      </header>

      <!-- ---- End Header ----- -->

      <!-- ---- Start NavBar ----- -->
      <nav class="bg-primary hidden lg:block w-full" id="navbar">
        <div class="container">
          <div class="flex justify-between">
            <!-- ---- All Category ----- -->
            <div
              class="lg:px-[2.2rem] xl:px-[3.85rem] 2xl:px-[8.8rem] py-4 bg-white/10 flex items-center cursor-pointer group relative"
            >
              <span class="text-white text-lg">
                <i class="pi pi-bars"></i>
              </span>
              <span
                class="capitalize text-white text-lg font-semibold ml-[1.52rem]"
                >All categories</span
              >

              <div
                class="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed max-h-96 overflow-y-auto"
              >
                <!-- ---- Start single category ----- -->
                <Link
                  v-for="category in store.categories"
                  :key="category.id"
                  :title="category.title"
                  :href="`/shop?categories[]=${category.id}`"
                  class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                >
                  <img
                    :src="category.thumbnail || '/no-image.png'"
                    :alt="category.title"
                    class="w-5 h-5 object-contain"
                  />
                  <span class="ml-6 text-gray-700 text-sm font-semibold">
                    {{ category.title }}</span
                  >
                </Link>
                <!-- ---- single category End ----- -->
              </div>
            </div>
            <!-- ---- All Category End ----- -->

            <!-- ---- Nav Menu ----- -->
            <!-- <div class="flex flex-1 justify-center"> -->
            <div class="flex justify-center">
    <nav class="flex items-center space-x-6 text-base capitalize">
      <template v-for="item in menus" :key="item.label">
        <!-- Parent Item with Children -->
        <div v-if="item.children" class="relative group">
          <button
            class="relative w-fit block text-gray-200 hover:text-white font-semibold transition duration-300 after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
          >
            <span>{{ item.label }}</span>
            <i class="pi pi-chevron-down ml-2 !text-xs" />
          </button>

          <!-- Dropdown Menu -->
          <ul
            class="hidden absolute  right-0   mt-2 min-w-[200px] bg-white shadow-xl rounded-md z-50 p-2 space-y-1 text-sm text-gray-700 animate-duration-300"
          >
            <MenuItem v-for="(sub, i) in item.children" :key="i" :item="sub" />
          </ul>
        </div>

        <!-- Single Link Item -->
        <Link
          v-else
          :href="item.route"
          :title="item.label"
          class="relative w-fit block text-gray-200 hover:text-white font-semibold transition duration-300 after:block after:content-[''] after:absolute after:h-[2px] after:bg-white after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
          :class="{
            'text-white after:scale-x-100': $page.component === item.component,
          }"
        >
          {{ item.label }}
        </Link>
      </template>
    </nav>
  </div>

            <!-- ---- Nav Menu End ----- -->
          </div>
        </div>
      </nav>
    </div>
    <!-- ---- End NavBar ----- -->

    <!-- ---- Mobile Menu Bar ----- -->

    <BottomNavigation />

    <!-- ----End Mobile Menu Bar ----- -->

    <!-- ---- Mobile Side Bar ----- -->
    <!-- <Drawer v-model:visible="toggleMenu">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-6 pt-4 shrink-0">
          <span class="inline-flex items-center gap-2">
            <span class="font-semibold text-2xl text-primary">Menu</span>
          </span>
          <Button
            type="button"
            @click="closeCallback"
            icon="pi pi-times pi"
            rounded
            outlined
          />
        </div>

        <div class="overflow-y-auto">
          <ul class="list-none p-4 m-0">
            <MenuItem
              v-for="(item, index) in menuItems"
              :key="index"
              :item="item"
            />
          </ul>
        </div>

        <div class="mt-auto">
          <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
          <a
            v-ripple
            class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
          >
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold">Amy Elsner</span>
          </a>
        </div>
      </div>
    </template>
  </Drawer> -->
    <Drawer v-model:visible="toggleMenu">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <span class="font-semibold text-2xl text-primary">Menu</span>
            </span>
            <span>
              <Button
                type="button"
                @click="closeCallback"
                icon="pi pi-times"
                rounded
                outlined
              ></Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-4 m-0">
              <li>
                <div
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                  class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                >
                  <span class="font-medium">Menu</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <MenuItem
                    v-for="(item, index) in menus"
                    :key="index"
                    :item="item"
                  />
                </ul>
              </li>
              <li>
                <div
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                  class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                >
                  <span class="font-medium">Categories</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <MenuItem
                    v-for="(item, index) in menus"
                    :key="index"
                    :item="item"
                  />
                </ul>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr
              class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700"
            />
            <a
              v-ripple
              class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
            >
              <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
              />
              <span class="font-bold">Amy Elsner</span>
            </a>
          </div>
        </div>
      </template>
    </Drawer>
    <!-- ---- End Mobile Side Bar ----- -->
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { Head, Link, usePage, router } from "@inertiajs/vue3";
import { useScroll, useEventListener } from "@vueuse/core";
import { useAppStore } from "@/stores/appStore";
import DropdownLink from "@/Components/DropdownLink.vue";
import Search from "./Search.vue";
import CartComponent from "@/Components/Frontend/Cart.vue";
import BottomNavigation from "./BottomNavigation.vue";
import MenuItem from "./MenuItem.vue";
const store = useAppStore();
const toggleMenu = ref(false);
const userMenu = ref();
const userToggle = (event) => {
  userMenu.value.toggle(event);
};

const user = ref([
  {
    label: "Login",
    icon: "pi pi-key",
    route: "/login",
  },
]);
const search = ref("");

const { props } = usePage();

const title = computed(() => props.title || "NextGen Bite");
const favicon = computed(() => props.settings?.favicon || "/no-image.png");
const logo = computed(() => props.settings?.logo || "/no-image.png");

const menus = ref([
  { label: "Home", icon: "pi pi-home", route: "/", component: "Index" },

  //   { label: "Top Products", icon: "pi pi-star", route: "/top-products" },
  //   { label: "Flash Sale", icon: "pi pi-bolt", route: "/flash-sale" },

  //   { label: "Top New Arrivals", icon: "pi pi-envelope", route: "/contact" },
  // { label: 'Categories', icon: 'pi pi-list', route: '/categories' },
  // { label: 'Brands', icon: 'pi pi-tags', route: '/brands' },
  // { label: 'Blog', icon: 'pi pi-pencil', route: '/blog' },

  {
    label: "Shop",
    icon: "pi pi-shopping-bag",
    route: "/shop",
    component: "Shop",
  },
  //   { label: "About", icon: "pi pi-info-circle", route: "/about" },
  {
    label: "Offers",
    icon: "pi pi-chart-line",
     component: "Shop",
    //   route: "/shop",
    children: [
      {
        label: "Flash Sale",
        icon: "pi pi-bolt",
        route: "/flash-sale"
      },
      {
        label: "Top Deals",
        icon: "pi pi-tags",
        route: "/top-deals"
      },
      {
        label: "New Arrival",
        icon: "pi pi-star",
        route: "/new-arrival"
      }
    ],
  },
  { label: "Contact", icon: "pi pi-envelope", route: "/contact" },
  //   {
  //     label: 'Reports',
  //     icon: 'pi pi-chart-line',
  //     children: [
  //       {
  //         label: 'Revenue',
  //         icon: 'pi pi-chart-line',
  //         children: [
  //           { label: 'View', icon: 'pi pi-table' },
  //           { label: 'Search', icon: 'pi pi-search' },
  //         ],
  //       },
  //       {
  //         label: 'Expenses',
  //         icon: 'pi pi-chart-line',
  //       },
  //     ],
  //   },

  //   {
  //     label: 'Messages',
  //     icon: 'pi pi-comments',
  //     badge: 3,
  //   },
]);

const header = ref(null);
const { y } = useScroll(window);

const handleScroll = () => {
  if (!header.value) return;

  if (y.value > 50) {
    header.value.classList.add(
      "fixed",
      "backdrop-blur-sm",
      "animate-slide-down"
    );
  } else {
    header.value.classList.remove(
      "fixed",
      "backdrop-blur-sm",
      "animate-slide-down"
    );
    document.body.style.paddingTop = "0";
  }
};

onMounted(() => {
  handleScroll(); // Initial check
  useEventListener(window, "scroll", handleScroll);
});

// Optional: make it reactive in case `y` changes and you want to auto-apply styles
watch(y, () => handleScroll());
</script>

<style scoped>
/* This is optional if not using Tailwind custom animations */
@keyframes slideDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out forwards;
}
</style>
