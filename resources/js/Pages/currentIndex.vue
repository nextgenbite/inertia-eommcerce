<template>
  <div>
    <!-- ---- Start Header ----- -->

    <header
      id="header"
      class="py-1 px-8 md:pt-2 shadow-sm bg-primary lg:bg-white w-full top-0 right-0 left-0 z-50"
    >
      <div class="flex items-center justify-between gap-4">
        <!-- logo  -->
        <a title="title" href="#" class="">
          <img
            :src="$page.props.settings.logo || '/no-image.png'"
            alt="logo"
            class="w-full h-12 hidden lg:block object-contain"
          />
          <img
            :src="$page.props.settings.favicon || '/no-image.png'"
            alt="mobile logo"
            class="w-full h-12 lg:hidden object-contain"
          />
        </a>
        <!-- logo end  -->
        <!-- search   -->
        <div class="w-full lg:max-w-lg lg:hidden">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              class="w-full"
              placeholder="what are you looking for..."
            />
          </IconField>
        </div>
        <div class="w-full lg:max-w-lg hidden lg:flex">
          <InputGroup>
            <InputText placeholder="what are you looking for..." />
            <Button icon="pi pi-search" />
          </InputGroup>
        </div>

        <!-- search End  -->

        <!-- NavIcons -->

        <div class="space-x-3 flex items-center">
            <div class="hidden lg:inline">

            <Button icon="pi pi-user"  variant="text" raised rounded aria-label="Filter" />
            </div>

          <a
            title="Login"
            href="/login"
            class="text-gray-800 hover:text-secondary transition font-semibold hidden lg:inline"
          >
            Login
          </a>
          <span>|</span>
          <a
            title="title"
            href="register.html"
            class="text-gray-800 hover:text-secondary transition font-semibold hidden lg:inline"
          > Register</a>

               <a  href="#" class="md:block hidden text-center text-white md:text-gray-700 hover:text-primary transition relative " title="Cart">
                    <span class=" absolute -right-2 -top-1 w-4 h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5 rounded-full flex items-center justify-center  bg-primary text-white text-xs "> 5 </span>
                    <div class="text-xl lg:text-2xl">
                         <i class="pi pi-shopping-bag "></i>
                    </div>
               </a>



          <a
            href="#"
            id="menuBar"
            class="lg:hidden text-center text-white lg:text-gray-700 hover:scale-75 transition relative"
            title="Account"
          >
            <div class="text-xl lg:text-2xl" @click="toggleMenu = true">
              <i class="pi pi-bars"></i>
            </div>
          </a>
        </div>
        <!-- NavIcons End  -->
      </div>
    </header>

    <!-- ---- End Header ----- -->

    <!-- ---- Start NavBar ----- -->
    <nav class="bg-primary hidden lg:block">
      <div class="container">
        <div class="flex">
          <!-- ---- All Category ----- -->
          <div
            class="lg:px-[2.2rem] xl:px-[3.65rem] 2xl:px-[8.8rem] py-4 bg-white/10 flex items-center cursor-pointer group relative"
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
              <a
                v-for="category in $page.props.categories"
                :key="category.id"
                :title="category.title"
                href="#"
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
              </a>
              <!-- ---- single category End ----- -->
            </div>
          </div>

          <!-- ---- All Category End ----- -->

          <!-- ---- Nav Menu ----- -->

          <div class="flex items-center justify-between flex-grow pl-12">
            <div class="flex items-center space-x-10 text-base capitalize">
              <a
                title="title"
                href="index.html"
                class="text-gray-200 hover:text-white font-semibold hover:border-b transition-all ease-in-out duration-300"
                >Home</a
              >
              <a
                title="title"
                href="index.html"
                class="text-gray-200 hover:text-white font-semibold hover:border-b transition-all ease-in-out duration-300"
                >Shop</a
              >
              <a
                title="title"
                href="index.html"
                class="text-gray-200 hover:text-white font-semibold hover:border-b transition-all ease-in-out duration-300"
                >About</a
              >
              <a
                title="title"
                href="index.html"
                class="text-gray-200 hover:text-white font-semibold hover:border-b transition-all ease-in-out duration-300"
                >Contact</a
              >
            </div>
            <div class="ml-auto">
              <!-- ---- Start Cart ----- -->
              <div
                class="px-4 py-5 text-white bg-white/20 flex items-center cursor-pointer group relative"
              >
                <span class="  ">
                  <i class="pi pi-shopping-cart"></i>
                </span>
                <span class="capitalize font-normal text-base ml-2"
                  >৳0.00 (0 Items)</span
                >

                <div
                  class="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed"
                >
                  <!-- ---- Start single category ----- -->
                  <a
                    title="title"
                    href="#"
                    class="px-8 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src="/images/icons/bed.svg"
                      alt="category thumb"
                      class="w-5 h-5 object-contain"
                    />
                    <span class="ml-6 text-gray-700 text-sm font-semibold">
                      BedRoom</span
                    >
                  </a>
                  <!-- ---- single category End ----- -->

                  <!-- ---- Start single category ----- -->
                  <a
                    title="title"
                    href="#"
                    class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src="/images/icons/sofa.svg"
                      alt="category thumb"
                      class="w-5 h-5 object-contain"
                    />
                    <span class="ml-6 text-gray-700 text-sm font-semibold">
                      Sofa</span
                    >
                  </a>
                  <!-- ---- single category End ----- -->

                  <!-- ---- Start single category ----- -->
                  <a
                    title="title"
                    href="#"
                    class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src="/images/icons/office.svg"
                      alt="category thumb"
                      class="w-5 h-5 object-contain"
                    />
                    <span class="ml-6 text-gray-700 text-sm font-semibold">
                      Office</span
                    >
                  </a>
                  <!-- ---- single category End ----- -->

                  <!-- ---- Start single category ----- -->
                  <a
                    title="title"
                    href="#"
                    class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src="/images/icons/outdoor-cafe.svg"
                      alt="category thumb"
                      class="w-5 h-5 object-contain"
                    />
                    <span class="ml-6 text-gray-700 text-sm font-semibold">
                      OutDoor</span
                    >
                  </a>
                  <!-- ---- single category End ----- -->

                  <!-- ---- Start single category ----- -->
                  <a
                    title="title"
                    href="#"
                    class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src="/images/icons/terrace.svg"
                      alt="category thumb"
                      class="w-5 h-5 object-contain"
                    />
                    <span class="ml-6 text-gray-700 text-sm font-semibold">
                      Mattress</span
                    >
                  </a>
                  <!-- ---- single category End ----- -->

                  <!-- ---- Start single category ----- -->
                  <a
                    title="title"
                    href="#"
                    class="px-6 py-3 flex items-center hover:bg-gray-100 transition"
                  >
                    <img
                      src="/images/icons/sofa.svg"
                      alt="category thumb"
                      class="w-5 h-5 object-contain"
                    />
                    <span class="ml-6 text-gray-700 text-sm font-semibold">
                      Sofa</span
                    >
                  </a>
                  <!-- ---- single category End ----- -->
                </div>
              </div>

              <!-- ---- Cart End ----- -->
            </div>
          </div>

          <!-- ---- Nav Menu End ----- -->
        </div>
      </div>
    </nav>
    <!-- ---- End NavBar ----- -->

    <!-- ---- Mobile Menu Bar ----- -->

    <div
      class="fixed w-full border-t border-gray-200 shadow-sm bg-white py-2 bottom-0 left-0 flex justify-between px-6 lg:hidden z-40"
    >
      <a
        href="/"
        class="block text-center text-gray-700 hover:text-primary transition relative"
        title="Menu"
      >
        <div class="text-xs flex justify-center flex-col items-center">
<i class="pi pi-home"></i>
          <span class="font-serif">Home</span>
        </div>
      </a>
      <a
        title="phone"
        href="tel:+8801715808563"
        class="block text-center text-gray-700 hover:text-primary transition relative"
      >
        <div class="text-xs flex justify-center flex-col items-center">
<i class="pi pi-phone"></i>
          <span class="font-serif">Call Us Now</span>
        </div>
      </a>

      <a
        href="javascript:void(0)"
        class="block text-center text-gray-700 hover:text-primary transition relative"
        title="Cart"
      >
        <span
          class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs"
          >5
        </span>
        <div class="text-xs flex justify-center flex-col items-center">
          <i class="pi pi-cart-plus"></i>
          <span class="font-serif">Cart</span>
        </div>
      </a>
    </div>

    <!-- ----End Mobile Menu Bar ----- -->

    <!-- ---- Mobile Side Bar ----- -->
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
                  <span class="font-medium">FAVORITES</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-bookmark mr-2"></i>
                      <span class="font-medium">Bookmarks</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      v-styleclass="{
                        selector: '@next',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-slidedown',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-slideup',
                      }"
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">Reports</span>
                      <i class="pi pi-chevron-down ml-auto"></i>
                    </a>
                    <ul
                      class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                    >
                      <li>
                        <a
                          v-ripple
                          v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-slidedown',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-slideup',
                          }"
                          class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Revenue</span>
                          <i class="pi pi-chevron-down ml-auto"></i>
                        </a>
                        <ul
                          class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out"
                        >
                          <li>
                            <a
                              v-ripple
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                            >
                              <i class="pi pi-table mr-2"></i>
                              <span class="font-medium">View</span>
                            </a>
                          </li>
                          <li>
                            <a
                              v-ripple
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                            >
                              <i class="pi pi-search mr-2"></i>
                              <span class="font-medium">Search</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a
                          v-ripple
                          class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                        >
                          <i class="pi pi-chart-line mr-2"></i>
                          <span class="font-medium">Expenses</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-users mr-2"></i>
                      <span class="font-medium">Team</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-comments mr-2"></i>
                      <span class="font-medium">Messages</span>
                      <span
                        class="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full"
                        style="min-width: 1.5rem; height: 1.5rem"
                        >3</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-calendar mr-2"></i>
                      <span class="font-medium">Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a
                      v-ripple
                      class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                    >
                      <i class="pi pi-cog mr-2"></i>
                      <span class="font-medium">Settings</span>
                    </a>
                  </li>
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

    <!-- ----  Hero ----- -->
    <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 container">
      <!-- ---- Start Category  ----- -->
      <div
        class="w-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed max-h-96 overflow-y-hidden hidden lg:block"
      >
        <!-- ---- Start single category ----- -->
        <a
          v-for="category in $page.props.categories"
          :key="category.id"
          :title="category.title"
          href="#"
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
        </a>
        <!-- ---- single category End ----- -->
      </div>
      <!-- ---- End Category  ----- -->
      <div class="md:col-span-3 lg:col-span-4">
        <!-- ---- Start Banner  ----- -->
        <swiper
          :modules="[Autoplay, EffectCreative, Pagination]"
          :autoplay="{
            delay: 10000,
            disableOnInteraction: false,
          }"
          :pagination="{ clickable: true }"
          :slides-per-view="1"
          :loop="true"
          :grabCursor="true"
          :effect="'creative'"
          :creativeEffect="{
            prev: {
              shadow: true,
              translate: ['-20%', 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide>
            <div
              class="bg-cover w-full bg-no-repeat bg-center py-6 lg:py-[6.26rem] xl:py-[5.75rem] relative text-center bg-[url('https://images.unsplash.com/photo-1746908592757-2c1d682b71db?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
            >
              <div class="container">
                <!-- ---- Banner Content   ----- -->
                <h1
                  class="xl:text-4xl md:text-2xl text-lg text-gray-800 font-semibold mb-2 lg:mb-4"
                >
                  Best Collection For <br class="hidden sm:block" />
                  Home Decoration
                </h1>
                <p
                  class="text-xs text-gray-600 leading-4 line-clamp-2 lg:line-clamp-none"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vulputate
                  <br class="hidden sm:block" />
                  rhoncus pellentesque id integer neque, vel accumsan dolor
                  diam.
                </p>

                <div class="mt-3 lg:mt-12">
                  <a
                    title="title"
                    href="shop.html"
                    class="bg-primary border text-xs border-primary text-white px-3 py-1.5 lg:px-5 lg:py-2.5 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition duration-300 ease-in"
                  >
                    Shop Now
                  </a>
                </div>
                <!-- ---- Banner Content End  ----- -->
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              class="bg-cover w-full bg-no-repeat bg-center py-6 lg:py-[6.26rem] xl:py-[5.75rem] relative text-center bg-[url('https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
            >
              <div class="container">
                <!-- ---- Banner Content   ----- -->
                <h1
                  class="xl:text-4xl md:text-2xl text-lg text-gray-800 font-semibold mb-2 lg:mb-4"
                >
                  Best Collection For <br class="hidden sm:block" />
                  Home Decoration
                </h1>
                <p
                  class="text-xs text-gray-600 leading-4 line-clamp-2 lg:line-clamp-none"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vulputate
                  <br class="hidden sm:block" />
                  rhoncus pellentesque id integer neque, vel accumsan dolor
                  diam.
                </p>

                <div class="mt-3 lg:mt-12">
                  <a
                    title="title"
                    href="shop.html"
                    class="bg-primary border text-xs border-primary text-white px-3 py-1.5 lg:px-5 lg:py-2.5 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition duration-300 ease-in"
                  >
                    Shop Now
                  </a>
                </div>
                <!-- ---- Banner Content End  ----- -->
              </div>
            </div>
          </swiper-slide>
        </swiper>

        <!-- ---- End Banner ----- -->
      </div>
    </div>
    <!-- ---- End Hero ----- -->
    <!-- ---- Start feature ----- -->

    <div class="container">
      <div
        class="grid grid-cols-1 lg:grid-cols-4 mx-auto justify-center border border-gray-200 divide-x-2 divide-gray-200 divide-double shadow shadow-primary/20"
      >
        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 transition text-center hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
    <BaseIcon customClass="mx-auto" name="truck" size="50px" fill="var(--p-primary-color)" />


          <h4 class="font-semibold capitalize lg:text-lg">
            Fast Delivery all across the country
          </h4>
        </div>
        <!-- ----End  Single Features  ----- -->

        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 text-center gap-3 transition hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
        <BaseIcon customClass="mx-auto" name="money" size="50px" fill="var(--p-primary-color)" />
          <div>
            <h4 class="font-semibold capitalize lg:text-lg">Safe Payment</h4>
          </div>
        </div>
        <!-- ----End  Single Features  ----- -->

        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 text-center transition hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
        <BaseIcon customClass="mx-auto" name="money_return" size="50px" fill="var(--p-primary-color)" />

          <div>
            <h4 class="font-medium capitalize text-sm lg:text-lg">
              7 Days Money Return
            </h4>
          </div>
        </div>
        <!-- ----End  Single Features  ----- -->
        <!-- ---- Single Features  ----- -->
        <div
          class="px-3 lg:px-3 lg:py-6 py-2 text-center transition hover:border-slate-400 hover:bg-gray-200 duration-300"
        >
        <BaseIcon customClass="mx-auto" name="shield" size="50px" fill="var(--p-primary-color)" />
          <div>
            <h4 class="font-medium capitalize text-sm lg:text-lg">
              100% Authentic Products
            </h4>
          </div>
        </div>
        <!-- ----End  Single Features  ----- -->
      </div>
    </div>
    <!-- ---- End feature ----- -->

    <!-- ---- Start Flash Sale  ----- -->
    <div class="container my-4 bg-white shadow-md p-4 lg:p-6">
      <div class="grid grid-cols-1 lg:grid-cols-6">
        <div class="lg:col-span-2">
          <h2 class="text-lg md:text-2xl font-bold text-primary uppercase">
            Flash Sale
          </h2>
          <h3 class="text-primary-400 mb-4">
            Hurry Up ! The offer is limited. Grab while it lasts
          </h3>
          <div class="card bg-primary">
            <div
              class="flex items-center justify-center gap-4 text-white font-bold text-2xl"
            >
              <span
                class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center"
              >
                {{ String(hours).padStart(2, "0") }} </span
              >:
              <span
                class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center"
              >
                {{ String(minutes).padStart(2, "0") }} </span
              >:
              <span
                class="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center"
              >
                {{ String(seconds).padStart(2, "0") }}
              </span>
            </div>
          </div>
        </div>
        <div class="lg:col-span-4">
          <swiper
            :modules="[Autoplay, Pagination]"
            :autoplay="{
              delay: 10000,
              disableOnInteraction: false,
            }"
            :pagination="{ clickable: true }"
            :slides-per-view="4"
            :space-between="16"
            :loop="true"
            class="flash-sale-swiper"
            :breakpoints="{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 4 },
            }"
          >
            <swiper-slide
              v-for="product in flashSaleProducts"
              :key="product.id"
            >
              <div
                class="p-2 group rounded bg-white shadow overflow-hidden hover:shadow-lg transition duration-300 ease-in-out relative"
              >
                <span class="badge-custom">Flash Sale</span>
                <div class="relative overflow-hidden">
                  <img
                    :src="product.thumbnail || '/no-image.png'"
                    :alt="product.title"
                    class="w-full group-hover:brightness-75 transition-all duration-300 ease-in-out rounded"
                  />
                  <div
                    class="absolute top-2 -right-12 group-hover:right-0 rounded text-gray-600 bg-white duration-300 ease-in-out"
                  >
                    <a
                      href="view.html"
                      title="Quick view"
                      class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
                    >
                      <i class="pi pi-eye"></i>
                    </a>
                    <a
                      href="#"
                      title="Add to cart"
                      class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
                    >
                      <i class="pi pi-cart-arrow-down"></i>
                    </a>
                  </div>
                </div>
                <div class="pt-4">
                  <div class="flex items-center">
                    <div class="flex gap-1 text-sm text-yellow-400">
                      <span><i class="pi pi-star"></i></span>
                      <span><i class="pi pi-star"></i></span>
                      <span><i class="pi pi-star"></i></span>
                      <span><i class="pi pi-star"></i></span>
                      <span><i class="pi pi-star"></i></span>
                    </div>
                    <div class="text-xs text-gray-500 ml-3">(99)</div>
                  </div>
                  <a :title="product.title" href="view.html">
                    <h4
                      class="capitalize font-semibold mb-2 px-1 text-gray-800 group-hover:text-primary transition duration-300 ease-in truncate"
                    >
                      {{ product.title }}
                    </h4>
                  </a>
                  <div class="flex justify-left items-baseline space-x-3">
                    <p class="text-lg font-bold text-red-600 font-roboto">
                      ${{ product.flash_price || "29.00" }}
                    </p>
                    <p class="font-bold text-gray-400 font-roboto line-through">
                      ${{ product.price || "39.00" }}
                    </p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase">
          Flash Sale
        </h2>
        <div
          class="flex items-center space-x-2 text-red-600 font-bold text-base"
        >
          <span>Ends in:</span>
          <span>
            {{ String(hours).padStart(2, "0") }}:
            {{ String(minutes).padStart(2, "0") }}:
            {{ String(seconds).padStart(2, "0") }}
          </span>
        </div>
      </div>

      <swiper
        :modules="[Autoplay, Pagination]"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{ clickable: true }"
        :slides-per-view="5"
        :space-between="16"
        :loop="true"
        class="flash-sale-swiper"
        :breakpoints="{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }"
      >
        <swiper-slide v-for="product in flashSaleProducts" :key="product.id">
          <div
            class="p-2 group rounded bg-white shadow overflow-hidden hover:shadow-lg transition duration-300 ease-in-out relative"
          >
            <span class="badge-custom">Flash Sale</span>
            <div class="relative overflow-hidden">
              <img
                :src="product.thumbnail || '/no-image.png'"
                :alt="product.title"
                class="w-full group-hover:brightness-75 transition-all duration-300 ease-in-out rounded"
              />
              <div
                class="absolute top-2 -right-12 group-hover:right-0 rounded text-gray-600 bg-white duration-300 ease-in-out"
              >
                <a
                  href="view.html"
                  title="Quick view"
                  class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
                >
                  <i class="pi pi-eye"></i>
                </a>
                <a
                  href="#"
                  title="Add to cart"
                  class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
                >
                  <i class="pi pi-cart-arrow-down"></i>
                </a>
              </div>
            </div>
            <div class="pt-4">
              <div class="flex items-center">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(99)</div>
              </div>
              <a :title="product.title" href="view.html">
                <h4
                  class="capitalize font-semibold mb-2 px-1 text-gray-800 group-hover:text-primary transition duration-300 ease-in truncate"
                >
                  {{ product.title }}
                </h4>
              </a>
              <div class="flex justify-left items-baseline space-x-3">
                <p class="text-lg font-bold text-red-600 font-roboto">
                  ${{ product.flash_price || "29.00" }}
                </p>
                <p class="font-bold text-gray-400 font-roboto line-through">
                  ${{ product.price || "39.00" }}
                </p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- ---- End Flash Sale  ----- -->
    <!-- ---- Start Categories  ----- -->
    <div class="container pb-16 card">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
          Categories
        </h2>
        <a href="#" class="text-primary font-bold text-lg"
          >View All <span class="pi pi-chevron-right"></span
        ></a>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-8 gap-2 lg:gap-6">
        <!-- ---- Start Single Category  ----- -->
        <div
          v-for="(category, index) in $page.props.categories.slice(0, 8)"
          :key="category.id"
          class="p-2 group rounded transition duration-300 ease-in-out text-center"
        >
          <!-- color bgColors -->
          <!-- <div class="rounded-full shadow-md p-4 mb-2 flex items-center justify-center  mx-auto overflow-hidden  group-hover:ring-4 group-hover:ring-primary group-hover:scale-95" :class="bgColors[index % bgColors.length]"> -->
          <div
            class="rounded-full p-4 mb-2 flex items-center justify-center mx-auto overflow-hidden group-hover:ring-4 group-hover:ring-primary-100 group-hover:scale-95 white-box"
          >
            <img
              :src="category.thumbnail || '/no-image.png'"
              :alt="category.title"
              class="w-full h-full object-cover rounded-full group-hover:brightness-75 transition-all duration-300 ease-in-out"
            />
          </div>
          <a
            :title="category.title"
            href="#"
            class="w-full text-center font-roboto font-semibold capitalize"
          >
            {{ category.title }}
          </a>
        </div>
        <!-- ---- End Single Category  ----- -->
      </div>
    </div>
    <!-- ---- End Categories  ----- -->

    <!-- ---- Start Top Products  ----- -->

    <div class="container pb-16">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
        Top Products
        <hr
          class="lg:w-1/4 min-h-0.5 my-4 bg-gray-300 border-0 rounded lg:my-1 dark:bg-gray-700"
        />
      </h2>
      <swiper
        :modules="[Autoplay, Pagination]"
        :autoplay="{
          delay: 10000,
          disableOnInteraction: false,
        }"
        :pagination="{ clickable: true }"
        :slides-per-view="5"
        :space-between="16"
        :loop="true"
        class="flash-sale-swiper"
        :breakpoints="{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 5 },
        }"
      >
        <swiper-slide v-for="product in $page.props.products" :key="product.id">
          <div
            class="p-2 group rounded bg-white shadow overflow-hidden hover:shadow-lg transition duration-300 ease-in-out relative"
          >
            <span class="badge-custom">Flash Sale</span>
            <div class="relative overflow-hidden">
              <img
                :src="product.thumbnail || '/no-image.png'"
                :alt="product.title"
                class="w-full group-hover:brightness-75 transition-all duration-300 ease-in-out rounded"
              />
              <div
                class="absolute top-2 -right-12 group-hover:right-0 rounded text-gray-600 bg-white duration-300 ease-in-out"
              >
                <a
                  href="view.html"
                  title="Quick view"
                  class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
                >
                  <i class="pi pi-eye"></i>
                </a>
                <a
                  href="#"
                  title="Add to cart"
                  class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
                >
                  <i class="pi pi-cart-arrow-down"></i>
                </a>
              </div>
            </div>
            <div class="pt-4">
              <div class="flex items-center">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                  <span><i class="pi pi-star"></i></span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(99)</div>
              </div>
              <a :title="product.title" href="view.html">
                <h4
                  class="capitalize font-semibold mb-2 px-1 text-gray-800 group-hover:text-primary transition duration-300 ease-in truncate"
                >
                  {{ product.title }}
                </h4>
              </a>
              <div class="flex justify-left items-baseline space-x-3">
                <p class="text-lg font-bold text-red-600 font-roboto">
                  ${{ product.flash_price || "29.00" }}
                </p>
                <p class="font-bold text-gray-400 font-roboto line-through">
                  ${{ product.price || "39.00" }}
                </p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- ---- End Top Products  ----- -->
    <!-- ---- Start Top New Arrival  ----- -->

    <div class="container pb-16">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
        Top New Arrival
        <hr
          class="lg:w-1/4 min-h-0.5 my-4 bg-gray-300 border-0 rounded lg:my-1 dark:bg-gray-700"
        />
      </h2>
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6">
        <!-- ---- Start Single Product  ----- -->
        <div
          class="p-2 group rounded bg-white shadow overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
          v-for="product in $page.props.products"
          :key="product.id"
        >
          <div class="relative overflow-hidden">
            <img
              :src="product.thumbnail || '/no-image.png'"
              :alt="product.title"
              class="w-full group-hover:brightness-75 group-hover:scale-110 transition-all duration-300 ease-in-out rounded"
            />

            <div
              class="absolute top-2 -right-12 group-hover:right-0 rounded text-gray-600 bg-white duration-300 ease-in-out"
            >
              <a
                href="view.html"
                title="Quick view"
                class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
              >
                <i class="pi pi-eye"></i>
              </a>
              <a
                href="#"
                title="Add to cart"
                class="text-md w-8 h-8 hover:text-gray-800 hover:animate-pulse flex items-center justify-center"
              >
                <i class="pi pi-cart-arrow-down"></i>
              </a>
            </div>
          </div>

          <div class="pt-4">
            <div class="flex items-center">
              <div class="flex gap-1 text-sm text-yellow-400">
                <span><i class="pi pi-star"></i> </span>
                <span><i class="pi pi-star"></i> </span>
                <span><i class="pi pi-star"></i> </span>
                <span><i class="pi pi-star"></i> </span>
                <span><i class="pi pi-star"></i> </span>
              </div>
              <div class="text-xs text-gray-500 ml-3">(120)</div>
            </div>

            <a :title="product.title" href="view.html">
              <h4
                class="capitalize font-semibold mb-2 px-1 text-gray-800 group-hover:text-primary transition duration-300 ease-in truncate"
              >
                {{ product.title }}
              </h4>
            </a>

            <div class="flex justify-left items-baseline space-x-3">
              <p class="text-lg font-bold text-red-600 font-roboto">
                ${{
                  product.discount_price
                    ? product.discount_price
                    : product.price
                }}
              </p>
              <p
                v-show="product.discount_price"
                class="font-bold text-gray-400 font-roboto line-through"
              >
                ${{ product.price }}
              </p>
            </div>
          </div>
        </div>
        <!-- ---- End Single Product  ----- -->
      </div>
    </div>

    <!-- ---- End Top New Arrival  ----- -->

    <!-- ---- Start Brand  ----- -->
    <div class="container pb-16 card">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg md:text-xl font-bold text-gray-800 uppercase mb-6">
          Top Brands
        </h2>
        <a href="#" class="text-primary font-bold text-lg"
          >View All <span class="pi pi-chevron-right"></span
        ></a>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-6">
        <!-- ---- Start Single Brand  ----- -->
        <div
          v-for="(category, index) in $page.props.categories.slice(0, 6)"
          :key="category.id"
          class="p-4 group rounded-lg transition duration-300 ease-in-out text-center white-box"
        >
          <!-- color bgColors -->
          <!-- <div class="rounded-full shadow-md p-4 mb-2 flex items-center justify-center  mx-auto overflow-hidden  group-hover:ring-4 group-hover:ring-primary group-hover:scale-95" :class="bgColors[index % bgColors.length]"> -->
          <div
            class="p-4 mb-2 flex items-center justify-center mx-auto group-hover:scale-95"
          >
            <img
              :src="category.thumbnail || '/no-image.png'"
              :alt="category.title"
              class="w-full h-full object-cover rounded-full group-hover:brightness-75 transition-all duration-300 ease-in-out"
            />
          </div>
          <a
            :title="category.title"
            href="#"
            class="w-full text-center font-roboto font-semibold capitalize"
          >
            {{ category.title }}
          </a>
        </div>
        <!-- ---- End Single Brand  ----- -->
      </div>
    </div>
    <!-- ---- End Brand  ----- -->
    <!-- ---- Start Footer  ----- -->
    <footer class="bg-primary-950 pt-16 pb-12 border-t border-gray-100">
      <div class="container">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <img
              :src="$page.props.settings.logo || 'no-image.png'"
              :alt="$page.props.settings.app_name"
              class="h-12"
            />
            <p class="text-white text-base font-roboto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              consectetur adipiscing.
            </p>
            <div class="flex space-x-5">
              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-facebook-f"></i>
              </a>

              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-twitter"></i>
              </a>

              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-instagram"></i>
              </a>

              <a
                title="title"
                href="#"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="pi pi-linkedin-in"></i>
              </a>
            </div>
          </div>

          <!-- ---- Footer link   ----- -->

          <div class="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
            <div class="grid grid-cols-2 gap-8">
              <div>
                <h3
                  class="text-sm lg:text-base font-semibold text-white tracking-wide uppercase"
                >
                  Quick links
                </h3>
                <div class="mt-4 space-y-2">
                  <a
                    title="Flash Deals"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Flash Deals
                  </a>
                  <a
                    title="Featured Products"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Featured Products
                  </a>
                  <a
                    title="Best Selling Products"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Best Selling Products
                  </a>
                  <a
                    title=" Truck Order"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Truck Order
                  </a>
                </div>
              </div>

              <div class="">
                <h3
                  class="text-sm lg:text-base font-semibold text-white tracking-wide uppercase"
                >
                  Other
                </h3>
                <div class="mt-4 space-y-2">
                  <a
                    title="About Us"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    About Us
                  </a>
                  <a
                    title="Terms And Conditions"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Terms And Conditions
                  </a>
                  <a
                    title="title"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Privacy Policy
                  </a>
                  <a
                    title="title"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Return Policy
                  </a>
                  <a
                    title="title"
                    href="#"
                    class="text-base text-white hover:text-gray-400 block"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            <!-- <div class="md:grid md:grid-cols-2 md:gap-8 ">
          <div>
               <h3 class="text-sm font-semibold text-gray-400 tracking-wide uppercase " > Company </h3>
               <div class="mt-4 space-y-4 ">
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         About
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Blog
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Jobs
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Service
                    </a>
               </div>
          </div>



          <div class="mt-12 md:mt-0">
               <h3 class="text-sm font-semibold text-gray-400 tracking-wide uppercase " > Legal </h3>
               <div class="mt-4 space-y-4 ">
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Claim
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Privacy
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                         Policy
                    </a>
                    <a title="title" href="#" class="text-base text-gray-500 hover:text-gray-900 block font-semibold " >
                        Terms
                    </a>
               </div>
          </div>


     </div> -->
          </div>
          <!-- ----End Footer link   ----- -->
        </div>
      </div>
    </footer>
    <!-- ---- End Footer   ----- -->

    <!-- ---- Copyright  ----- -->
    <div class="bg-gray-800 py-4">
      <div class="container flex items-center justify-between">
        <p class="text-white font-semibold">© Nextgenbite 2024</p>

        <div>
          <img alt="image" src="/images/methods.png" class="h-5" />
        </div>
      </div>
    </div>

    <!-- ---- End Copyright   ----- -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import BaseIcon from "@/Components/BaseIcon.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
// import required modules
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const flashSaleProducts = (props.products || []).slice(0, 10);

const hours = ref(1);
const minutes = ref(30);
const seconds = ref(0);
let timer;

function updateTimer() {
  if (hours.value === 0 && minutes.value === 0 && seconds.value === 0) {
    clearInterval(timer);
    return;
  }
  if (seconds.value > 0) {
    seconds.value--;
  } else if (minutes.value > 0) {
    minutes.value--;
    seconds.value = 59;
  } else if (hours.value > 0) {
    hours.value--;
    minutes.value = 59;
    seconds.value = 59;
  }
}

onMounted(() => {
  timer = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
    numScroll: 1,
  },
]);

const getSeverity = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warn";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
const bgColors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-orange-200",
];
const toggleMenu = ref(false);
// const toggleMenu = () => {
//   const menu = document.querySelector("#mobileMenu");
//   menu.classList.toggle("hidden");
// };
// const closeMenu = () => {
//   const menu = document.querySelector(".menu");
//   menu.classList.add("hidden");
// };
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap");
.white-box {
  background: var(--gradient-box-w);
  box-shadow: var(--shadow-white-3);
}
.white-box:hover {
  box-shadow: 0.125rem 0.0625rem 0.375rem 0.125rem rgba(0, 0, 0, 0.1),
    0 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.06) !important;
}
.thumb {
  max-height: 100%;
  width: 100%;
  object-fit: cover;
}

.badge-custom {
  display: inline-block;
  padding: 0.1875rem; /* 3px converted to rem */
  font-size: 0.6875rem; /* 11px converted to rem */
  border-radius: 0 3.125rem 3.125rem 0; /* 50px converted to rem */
  color: #ff0000;
  font-weight: 600;
  line-height: 1.625rem; /* 26px converted to rem */
  position: absolute;
  background: #fff;
  z-index: 1;
  top: 1rem;
  box-shadow: 0.125rem 0.0625rem 0.375rem 0.125rem rgba(0, 0, 0, 0.1),
    0 0.25rem 0.25rem 0rem rgba(0, 0, 0, 0.06) !important;
}

.badge-custom .box {
  height: 1.625rem; /* 26px converted to rem */
  width: 1.625rem; /* 26px converted to rem */
  background: #ff0000;
  color: #fff;
  display: inline-block;
  border-radius: 50%;
  text-align: center;
}

/* Hero slider responsiveness */

.swiper-button-next,
.swiper-button-prev {
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  color: var(--primary-color);
  background: linear-gradient(145deg, #e2e8ec, #ffffff);
  /* box-shadow:  .5rem .5rem 1.5rem #D1D9E6, -0.5rem -.5rem 1.5rem #ffffff; */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: opacity 0.3s;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 1.5rem;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  opacity: 0.8;
}

.swiper-pagination-bullet {
  background: #ffffff;
  opacity: 0.5;
  transition: opacity 0.3s;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.swiper-pagination-bullet:hover {
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: var(--primary-color);
  border-radius: 0.3rem;
  width: 1.5rem;
}

@media (min-width: 320px) {
  .swiper-button-next,
  .swiper-button-prev {
    width: 3rem;
    height: 3rem;
  }
}
</style>
