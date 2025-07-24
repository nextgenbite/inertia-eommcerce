<script setup>
import { ref, onMounted } from "vue";
import { Link } from "@inertiajs/vue3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GuestLayout from "@/Layouts/Central/GuestLayout.vue";

const hero = ref(null);
const sectionRef = ref(null);

onMounted(() => {
  gsap.from(hero.value, {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
  });

  //sectior
  gsap.from(sectionRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 80%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
  });
});
const smoothScroll = (id) => {
  document.body.click();
  document.querySelector(id).scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<template>
  <GuestLayout>
    <section
      ref="hero"
      class="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover"
    >
      <div class="mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <h1
          class="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]"
        >
          Control your Finances with our
          <span class="text-primary-600">Smart eCommerce </span>
        </h1>
        <p
          class="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9"
        >
          A complete SaaS solution to manage and grow your eCommerce business
        </p>
        <a
          href="javascript:;"
          class="border border-primary-600 p-1 mx-auto rounded-full inline-flex items-center justify-between mb-14"
        >
          <span class="font-inter text-xs font-medium text-gray-900 mx-3"
            >Create an account
          </span>
          <div
            class="w-8 h-8 rounded-full flex justify-center items-center bg-primary-600"
          >
            <i class="pi pi-arrow-right text-white"></i>
          </div>
        </a>
        <!-- <a
          href="javascript:;"
          class="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full bg-primary-600 shadow-xs hover:bg-primary-700 transition-all duration-500"
        >
          Create an account
          <svg
            class="ml-2"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a> -->
        <div class="flex justify-center">
          <img
            src="https://pagedone.io/asset/uploads/1691054543.png"
            alt="Dashboard image"
            class="rounded-t-3xl h-auto object-cover"
          />
        </div>
      </div>
    </section>
    <!-- feature section -->

    <section class="py-24" ref="sectionRef">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-14 text-center">
          <h2 class="text-4xl text-center font-bold text-gray-900 py-5">
            Enjoy the finest features with our NextShop
          </h2>
          <p
            class="text-lg font-normal text-gray-500 max-w-md md:max-w-2xl mx-auto"
          >
            We provide all the advantages that can simplify all your financial
            transactions without any further requirements
          </p>
        </div>
        <div
          class="flex justify-center items-center gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-row lg:justify-between lg:gap-x-8"
        >
          <!-- single feature -->
          <div
            class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-primary-600"
          >
            <div
              class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                  stroke="#4F46E5"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white"
            >
              Product Management
            </h4>
            <p
              class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
            >
              Easily add, edit, and organize your products and categories.
            </p>
          </div>
          <!-- end Single feature -->
          <!-- single feature -->
          <div
            class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-primary-600"
          >
            <div
              class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                  stroke="#4F46E5"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white"
            >
              Integrated Payments
            </h4>
            <p
              class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
            >
              Accept payments via Stripe, PayPal, bKash, and more.
            </p>
          </div>
          <!-- end Single feature -->
          <!-- single feature -->
          <div
            class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-primary-600"
          >
            <div
              class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.7222 11.6667V7.22225C24.7222 5.99495 23.7273 5 22.5 5H4.72222C3.49492 5 2.5 5.99492 2.5 7.22222V22.7778C2.5 24.0051 3.49492 25 4.72222 25H22.5C23.7273 25 24.7222 24.005 24.7222 22.7777V17.7778M20.8333 17.7778H25.2778C26.5051 17.7778 27.5 16.7829 27.5 15.5556V13.8889C27.5 12.6616 26.5051 11.6667 25.2778 11.6667H20.8333C19.606 11.6667 18.6111 12.6616 18.6111 13.8889V15.5556C18.6111 16.7829 19.606 17.7778 20.8333 17.7778Z"
                  stroke="#4F46E5"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white"
            >
              Analytics Dashboard
            </h4>
            <p
              class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
            >
              Track sales, revenue, and customer engagement in real-time.
            </p>
          </div>
          <!-- end Single feature -->
          <!-- single feature -->
          <div
            class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-primary-600"
          >
            <div
              class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.375 15.8571C16.1009 15.8571 17.5 14.458 17.5 12.7321C17.5 11.0062 16.1009 9.6071 14.375 9.6071C12.6491 9.6071 11.25 11.0062 11.25 12.7321C11.25 14.458 12.6491 15.8571 14.375 15.8571ZM14.375 15.8571V20.8571M3.75 13.2264V15.2343C3.75 17.6868 3.75 18.9131 4.27747 19.9685C4.80493 21.0239 5.78567 21.76 7.74715 23.2322L8.57248 23.8516C11.4626 26.0208 12.9077 27.1054 14.5753 27.1054C16.243 27.1054 17.688 26.0208 20.5782 23.8516L21.4035 23.2322C23.365 21.76 24.3457 21.0239 24.8732 19.9685C25.4006 18.9131 25.4006 17.6868 25.4006 15.2343V13.2264C25.4006 9.95932 25.4006 8.32576 24.546 7.05852C23.6913 5.79128 22.1768 5.17918 19.1477 3.95499L18.3223 3.62144C16.4724 2.87381 15.5475 2.5 14.5753 2.5C13.6032 2.5 12.6782 2.87381 10.8283 3.62144L10.003 3.95499C6.97389 5.17919 5.45934 5.79128 4.60467 7.05852C3.75 8.32576 3.75 9.95932 3.75 13.2264Z"
                  stroke="#4F46E5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white"
            >
              Safe Transaction
            </h4>
            <p
              class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
            >
              We have the most up-to-date security to support the security of
              all our customers in carrying out all transactions.
            </p>
          </div>
          <div
            class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-primary-600"
          >
            <div
              class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                  stroke="#4F46E5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white"
            >
              Fast Customer Service
            </h4>
            <p
              class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
            >
              Provide Customer Service For Those Of You Who Have Problems 24
              Hours A Week
            </p>
          </div>
          <div
            class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-primary-600"
          >
            <div
              class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                  stroke="#4F46E5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <h4
              class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white"
            >
              Quick Transaction
            </h4>
            <p
              class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white"
            >
              We provide faster transaction speeds than competitors, so money
              arrives and is received faster.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- pricing section-->

    <section class="py-24 relative">
      <div
        class="absolute h-[36.5rem] w-full top-0 bg-gradient-to-r from-primary-400 to-primary-800 -z-10"
      ></div>
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <h2
            class="font-manrope text-5xl text-center font-bold text-white mb-4"
          >
            Suitable pricing plans
          </h2>
          <p class="text-gray-300 text-xl text-center leading-6">
            7 Days free trial. No credit card required.
          </p>
        </div>
        <!--Grid-->
        <div
          class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center"
        >


          <!--Pricing Card-->
          <div v-for="plan in $page.props.plans" :key="plan.id"
            class="group relative flex flex-col mx-auto w-full max-w-sm bg-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12"
          >
            <div class="border-b border-solid border-gray-200 pb-9 mb-9">
              <div
                class="w-16 h-16 rounded-full bg-primary-50 mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-primary-600"
              >
                <svg
                  class="w-6 h-6 text-primary-600 transition-all duration-300 group-hover:text-white"
                  viewBox="0 0 31 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1641 14.75C18.7163 14.75 19.1641 14.3023 19.1641 13.75C19.1641 13.1977 18.7163 12.75 18.1641 12.75V14.75ZM13.1641 12.75C12.6118 12.75 12.1641 13.1977 12.1641 13.75C12.1641 14.3023 12.6118 14.75 13.1641 14.75V12.75ZM18.1641 19.75C18.7163 19.75 19.1641 19.3023 19.1641 18.75C19.1641 18.1977 18.7163 17.75 18.1641 17.75V19.75ZM13.1641 17.75C12.6118 17.75 12.1641 18.1977 12.1641 18.75C12.1641 19.3023 12.6118 19.75 13.1641 19.75V17.75ZM16.6641 23.75C16.6641 23.1977 16.2163 22.75 15.6641 22.75C15.1118 22.75 14.6641 23.1977 14.6641 23.75H16.6641ZM14.6641 27.5C14.6641 28.0523 15.1118 28.5 15.6641 28.5C16.2163 28.5 16.6641 28.0523 16.6641 27.5H14.6641ZM18.7499 3.08579L18.0427 2.37868L18.7499 3.08579ZM27.5783 3.08579L26.8712 3.79289L27.5783 3.08579ZM12.5783 3.08579L11.8712 3.79289L12.5783 3.08579ZM9.99985 8.08579L10.707 8.79289L9.99985 8.08579ZM21.3283 8.08579L22.0354 7.37868L21.3283 8.08579ZM21.3283 26.9142L20.6212 26.2071L21.3283 26.9142ZM27.5783 21.9142L28.2854 22.6213L27.5783 21.9142ZM9.99985 26.9142L10.707 26.2071L9.99985 26.9142ZM13.4141 8.5H17.9141V6.5H13.4141V8.5ZM20.9141 11.5V23.5H22.9141V11.5H20.9141ZM17.9141 26.5H13.4141V28.5H17.9141V26.5ZM10.4141 23.5V11.5H8.41406V23.5H10.4141ZM7.16407 3.5H9.16407V1.5H7.16407V3.5ZM4.16406 18.5L4.16407 6.5L2.16407 6.5L2.16406 18.5H4.16406ZM12.1641 6.5V7.5H14.1641V6.5H12.1641ZM9.41406 21.5H7.16406L7.16406 23.5H9.41406L9.41406 21.5ZM24.1641 1.5H22.1641V3.5H24.1641V1.5ZM29.1641 18.5V6.5H27.1641V18.5H29.1641ZM17.1641 6.5V7.5H19.1641V6.5H17.1641ZM21.9141 23.5H24.1641V21.5H21.9141V23.5ZM18.1641 12.75H13.1641V14.75H18.1641V12.75ZM18.1641 17.75H13.1641V19.75H18.1641V17.75ZM14.6641 23.75V27.5H16.6641V23.75H14.6641ZM22.1641 1.5C21.2495 1.5 20.463 1.49788 19.8363 1.58214C19.1808 1.67027 18.5524 1.86902 18.0427 2.37868L19.457 3.79289C19.5331 3.71677 19.669 3.62262 20.1028 3.56431C20.5653 3.50212 21.193 3.5 22.1641 3.5V1.5ZM19.1641 6.5C19.1641 5.52892 19.1662 4.90121 19.2284 4.4387C19.2867 4.00496 19.3808 3.86902 19.457 3.79289L18.0427 2.37868C17.5331 2.88834 17.3343 3.51669 17.2462 4.17221C17.1619 4.79896 17.1641 5.58546 17.1641 6.5H19.1641ZM24.1641 3.5C25.1351 3.5 25.7628 3.50212 26.2254 3.56431C26.6591 3.62262 26.795 3.71677 26.8712 3.79289L28.2854 2.37868C27.7757 1.86902 27.1474 1.67027 26.4918 1.58214C25.8651 1.49788 25.0786 1.5 24.1641 1.5V3.5ZM29.1641 6.5C29.1641 5.58546 29.1662 4.79896 29.0819 4.17221C28.9938 3.51669 28.795 2.88834 28.2854 2.37868L26.8712 3.79289C26.9473 3.86902 27.0414 4.00496 27.0998 4.4387C27.1619 4.90121 27.1641 5.52892 27.1641 6.5H29.1641ZM2.16406 18.5C2.16406 19.4145 2.16194 20.201 2.2462 20.8278C2.33434 21.4833 2.53308 22.1117 3.04274 22.6213L4.45696 21.2071C4.38083 21.131 4.28668 20.995 4.22837 20.5613C4.16619 20.0988 4.16406 19.4711 4.16406 18.5H2.16406ZM7.16406 21.5C6.19298 21.5 5.56527 21.4979 5.10277 21.4357C4.66903 21.3774 4.53308 21.2832 4.45696 21.2071L3.04274 22.6213C3.5524 23.131 4.18075 23.3297 4.83627 23.4179C5.46302 23.5021 6.24952 23.5 7.16406 23.5L7.16406 21.5ZM9.16407 3.5C10.1351 3.5 10.7629 3.50212 11.2254 3.56431C11.6591 3.62262 11.795 3.71677 11.8712 3.79289L13.2854 2.37868C12.7757 1.86902 12.1474 1.67027 11.4919 1.58214C10.8651 1.49788 10.0786 1.5 9.16407 1.5V3.5ZM14.1641 6.5C14.1641 5.58546 14.1662 4.79896 14.0819 4.17221C13.9938 3.51669 13.795 2.88834 13.2854 2.37868L11.8712 3.79289C11.9473 3.86902 12.0414 4.00496 12.0998 4.4387C12.1619 4.90121 12.1641 5.52892 12.1641 6.5H14.1641ZM7.16407 1.5C6.24953 1.5 5.46303 1.49788 4.83628 1.58214C4.18076 1.67027 3.55241 1.86902 3.04275 2.37868L4.45696 3.79289C4.53309 3.71677 4.66903 3.62262 5.10277 3.56431C5.56528 3.50212 6.19299 3.5 7.16407 3.5V1.5ZM4.16407 6.5C4.16407 5.52892 4.16619 4.90121 4.22838 4.4387C4.28669 4.00496 4.38084 3.86902 4.45696 3.79289L3.04275 2.37868C2.53309 2.88834 2.33434 3.51669 2.24621 4.17221C2.16195 4.79896 2.16407 5.58546 2.16407 6.5L4.16407 6.5ZM13.4141 6.5C12.4995 6.5 11.713 6.49788 11.0863 6.58214C10.4308 6.67027 9.8024 6.86902 9.29274 7.37868L10.707 8.79289C10.7831 8.71677 10.919 8.62262 11.3528 8.56431C11.8153 8.50212 12.443 8.5 13.4141 8.5V6.5ZM10.4141 11.5C10.4141 10.5289 10.4162 9.90121 10.4784 9.4387C10.5367 9.00496 10.6308 8.86902 10.707 8.79289L9.29274 7.37868C8.78308 7.88834 8.58433 8.51669 8.4962 9.17221C8.41194 9.79896 8.41406 10.5855 8.41406 11.5H10.4141ZM17.9141 8.5C18.8851 8.5 19.5129 8.50212 19.9754 8.56431C20.4091 8.62262 20.545 8.71677 20.6212 8.79289L22.0354 7.37868C21.5257 6.86902 20.8974 6.67027 20.2419 6.58214C19.6151 6.49788 18.8286 6.5 17.9141 6.5V8.5ZM22.9141 11.5C22.9141 10.5855 22.9162 9.79896 22.8319 9.17221C22.7438 8.51669 22.545 7.88834 22.0354 7.37868L20.6212 8.79289C20.6973 8.86902 20.7914 9.00496 20.8498 9.4387C20.9119 9.90121 20.9141 10.5289 20.9141 11.5H22.9141ZM20.9141 23.5C20.9141 24.4711 20.9119 25.0988 20.8498 25.5613C20.7914 25.995 20.6973 26.131 20.6212 26.2071L22.0354 27.6213C22.545 27.1117 22.7438 26.4833 22.8319 25.8278C22.9162 25.201 22.9141 24.4145 22.9141 23.5H20.9141ZM17.9141 28.5C18.8286 28.5 19.6151 28.5021 20.2419 28.4179C20.8974 28.3297 21.5257 28.131 22.0354 27.6213L20.6212 26.2071C20.545 26.2832 20.4091 26.3774 19.9754 26.4357C19.5129 26.4979 18.8851 26.5 17.9141 26.5V28.5ZM27.1641 18.5C27.1641 19.4711 27.1619 20.0988 27.0998 20.5613C27.0414 20.995 26.9473 21.131 26.8712 21.2071L28.2854 22.6213C28.795 22.1117 28.9938 21.4833 29.0819 20.8278C29.1662 20.201 29.1641 19.4145 29.1641 18.5H27.1641ZM24.1641 23.5C25.0786 23.5 25.8651 23.5021 26.4918 23.4179C27.1474 23.3297 27.7757 23.131 28.2854 22.6213L26.8712 21.2071C26.795 21.2832 26.6591 21.3774 26.2254 21.4357C25.7628 21.4979 25.1351 21.5 24.1641 21.5V23.5ZM13.4141 26.5C12.443 26.5 11.8153 26.4979 11.3528 26.4357C10.919 26.3774 10.7831 26.2832 10.707 26.2071L9.29274 27.6213C9.8024 28.131 10.4308 28.3297 11.0863 28.4179C11.713 28.5021 12.4995 28.5 13.4141 28.5V26.5ZM8.41406 23.5C8.41406 24.4145 8.41194 25.201 8.4962 25.8278C8.58433 26.4833 8.78308 27.1117 9.29274 27.6213L10.707 26.2071C10.6308 26.131 10.5367 25.995 10.4784 25.5613C10.4162 25.0988 10.4141 24.4711 10.4141 23.5H8.41406Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3
                class="font-manrope text-2xl font-bold my-7 text-center text-primary-600"
              >
               {{plan.name}}
              </h3>
              <div class="flex items-center justify-center">
                <span class="font-manrope text-4xl font-medium text-gray-900"
                  >${{plan.price}}</span
                >
                <span class="text-xl text-gray-500 ml-3">|&nbsp; {{p}}</span>
              </div>
            </div>
            <!--List-->
            <ul
              class="mb-12 space-y-6 text-left text-lg text-gray-600 group-hover:text-gray-900"
            >
              <li class="flex items-center space-x-3.5" v-for="(feature, index) in JSON.parse(plan.features)" :key="index">
                <!-- Icon -->
                <span class="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
                <span>{{feature}}</span>
              </li>


            </ul>
            <a
              :href="'/tenant-register?plan_id='+plan.id"
              class="py-2.5 px-5 bg-primary-50 shadow-sm rounded-full transition-all duration-500 text-base text-primary-600 font-semibold text-center w-fit mx-auto group-hover:bg-primary-600 group-hover:text-white"
              >Purchase Plan</a
            >
            <!--List End-->
          </div>
        </div>
        <!--Grid End-->
      </div>
    </section>
    <!-- Testimonials -->

    <section class="py-24">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <!-- <div class="mb-16">
          <span class="text-sm text-gray-500 font-medium text-center block mb-2"
            >TESTIMONIAL</span
          >
          <h2 class="text-4xl text-center font-bold text-gray-900">
            What our happy user says!
          </h2>
        </div> -->
        <!--Slider wrapper-->

        <!-- <div class="swiper mySwiper">
          <div class="swiper-wrapper  flex">
            <div class="swiper-slide">
              <div
                class="group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-primary-600 hover:shadow-sm slide_active:border-primary-600"
              >
                <div class="">
                  <div
                    class="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="text-base font-semibold text-primary-600"
                      >4.9</span
                    >
                  </div>
                  <p
                    class="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800"
                  >
                    Pagedone has made it possible for me to stay on top of my
                    portfolio and make informed decisions quickly and easily.
                  </p>
                </div>
                <div
                  class="flex items-center gap-5 border-t border-solid border-gray-200 pt-5"
                >
                  <img
                    class="rounded-full h-10 w-10 object-cover"
                    src="https://pagedone.io/asset/uploads/1696229969.png"
                    alt="avatar"
                  />
                  <div class="block">
                    <h5
                      class="text-gray-900 font-medium transition-all duration-500 mb-1"
                    >
                      Jane D
                    </h5>
                    <span class="text-sm leading-4 text-gray-500">CEO </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                class="group bg-white border border-solid border-gray-300 flex justify-between flex-col rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-primary-600 slide_active:border-primary-600 hover:shadow-sm"
              >
                <div class="">
                  <div
                    class="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="text-base font-semibold text-primary-600"
                      >4.9</span
                    >
                  </div>
                  <p
                    class="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800"
                  >
                    Thanks to pagedone, I feel more informed and confident about
                    my investment decisions than ever before.
                  </p>
                </div>
                <div
                  class="flex items-center gap-5 pt-5 border-t border-solid border-gray-200"
                >
                  <img
                    class="rounded-full h-10 w-10 object-cover"
                    src="https://pagedone.io/asset/uploads/1696229994.png"
                    alt="avatar"
                  />
                  <div class="block">
                    <h5
                      class="text-gray-900 font-medium transition-all duration-500 mb-1"
                    >
                      Harsh P.
                    </h5>
                    <span class="text-sm leading-4 text-gray-500"
                      >Product Designer</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                class="flex justify-between flex-col lg:w-full group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 w-full mx-auto slide_active:border-primary-600 hover:border-primary-600 hover:shadow-sm"
              >
                <div class="">
                  <div
                    class="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="text-base font-semibold text-primary-600"
                      >4.9</span
                    >
                  </div>
                  <p
                    class="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800"
                  >
                    The customer service team at pagedone went above and beyond
                    to help me resolve a billing issue.
                  </p>
                </div>
                <div
                  class="flex items-center gap-5 border-t border-solid border-gray-200 pt-5"
                >
                  <img
                    class="rounded-full h-10 w-10 object-cover"
                    src="	https://pagedone.io/asset/uploads/1696230027.png"
                    alt="avatar"
                  />
                  <div class="block">
                    <h5
                      class="text-gray-900 font-medium transition-all duration-500 mb-1"
                    >
                      Alex K.
                    </h5>
                    <span class="text-sm leading-4 text-gray-500"
                      >Design Lead</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                class="group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 w-full mx-auto slide_active:border-primary-600 hover:border-primary-600 hover:shadow-sm"
              >
                <div class="">
                  <div
                    class="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="text-base font-semibold text-primary-600"
                      >4.9</span
                    >
                  </div>
                  <p
                    class="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800"
                  >
                    Pagedone has made it possible for me to stay on top of my
                    portfolio and make informed decisions quickly and easily.
                  </p>
                </div>
                <div
                  class="flex items-center gap-5 border-t border-solid border-gray-200 pt-5"
                >
                  <img
                    class="rounded-full h-10 w-10 object-cover"
                    src="https://pagedone.io/asset/uploads/1696229969.png"
                    alt="avatar"
                  />
                  <div class="block">
                    <h5
                      class="text-gray-900 font-medium transition-all duration-500 mb-1"
                    >
                      Jane D
                    </h5>
                    <span class="text-sm leading-4 text-gray-500">CEO </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div
                class="group bg-white border border-solid border-gray-300 flex justify-between flex-col rounded-xl p-6 transition-all duration-500 w-full mx-auto slide_active:border-primary-600 hover:border-primary-600 hover:shadow-sm"
              >
                <div class="">
                  <div
                    class="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500"
                  >
                    <svg
                      class="w-5 h-5"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span class="text-base font-semibold text-primary-600"
                      >4.9</span
                    >
                  </div>
                  <p
                    class="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800 slide_active:text-gray-800"
                  >
                    Thanks to pagedone, I feel more informed and confident about
                    my investment decisions than ever before.
                  </p>
                </div>
                <div
                  class="flex items-center gap-5 pt-5 border-t border-solid border-gray-200"
                >
                  <img
                    class="rounded-full h-10 w-10 object-cover"
                    src="https://pagedone.io/asset/uploads/1696229994.png"
                    alt="avatar"
                  />
                  <div class="block">
                    <h5
                      class="text-gray-900 font-medium transition-all duration-500 mb-1"
                    >
                      Harsh P.
                    </h5>
                    <span class="text-sm leading-4 text-gray-500"
                      >Product Designer</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div> -->
      </div>
    </section>

    <!-- //contact -->
    <section id="contact" class="py-20 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-3xl font-semibold mb-10">Get in Touch</h3>
        <form class="max-w-xl mx-auto grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            class="border p-3 rounded w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            class="border p-3 rounded w-full"
          />
          <textarea
            placeholder="Message"
            class="border p-3 rounded w-full"
          ></textarea>
          <button class="bg-primary-600 text-white px-6 py-3 rounded">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </GuestLayout>
</template>

<style>
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets
  .swiper-pagination-bullet {
  width: 16px !important;
  height: 4px !important;
  border-radius: 5px !important;
  margin: 0 6px !important;
}

.swiper-pagination {
  bottom: 2px !important;
}

.swiper-wrapper {
  height: max-content !important;
  width: max-content !important;
  padding-bottom: 64px;
}

.swiper-pagination-bullet-active {
  background: #4f46e5 !important;
}

.swiper-slide.swiper-slide-active > .slide_active\:border-primary-600 {
  --tw-border-opacity: 1;
  border-color: rgb(79 70 229 / var(--tw-border-opacity));
}

.swiper-slide.swiper-slide-active > .group .slide_active\:text-gray-800 {
  ---tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
</style>
