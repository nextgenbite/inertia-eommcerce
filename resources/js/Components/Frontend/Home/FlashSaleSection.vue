<template>
<div class=" my-4 container p-4 lg:p-6 bg-white/70">
      <div class="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div class="lg:col-span-2 bg-[url('https://images.unsplash.com/photo-1605362001336-f91645086f32?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center h-64 lg:h-auto rounded-lg p-6">
          <div class="flex flex-col items-center justify-center h-full text-center">
              <h2 class="text-lg md:text-2xl font-bold text-white uppercase">
            Flash Sale
          </h2>
          <h3 class="text-white mb-4">
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
        </div>
        <div class="lg:col-span-4">
          <SwiperSlider :items="flashSale" :swiperOptions="productOptions">
      <template #default="{ item }">
        <ProductCard :product="item" />
      </template>
    </SwiperSlider>
        </div>
      </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SwiperSlider from '@/Components/Shared/SwiperSlider.vue';
import ProductCard from '@/Components/ProductCard.vue';

defineProps({ flashSale: Array });

const productOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }
};

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
</script>
