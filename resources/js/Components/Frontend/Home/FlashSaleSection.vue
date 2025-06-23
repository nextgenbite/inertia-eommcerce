<template>
<div class=" my-4 container p-4 lg:p-6 bg-white/70">
      <div class="grid grid-cols-1 gap-4" :class="flashSale.end_time ? 'lg:grid-cols-6' : ''">
        <div
        v-if="flashSale.end_time"
          class="lg:col-span-2 bg-cover bg-no-repeat bg-center h-64 lg:h-auto rounded-lg p-6"
          :style="{
            backgroundImage: `url('${flashSale.thumbnail ? flashSale.thumbnail : 'https://images.unsplash.com/photo-1605362001336-f91645086f32?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}')`
          }"
        >
          <div class="flex flex-col items-center justify-center h-full text-center">
              <h2 class="text-lg md:text-2xl font-bold text-white uppercase">
            {{flashSale.title}}
          </h2>
          <h3 class="text-white mb-4" v-html="flashSale.description || 'Hurry Up ! The offer is limited. Grab while it lasts'">


          </h3>
          <div class="card bg-white/80 shadow-lg rounded-lg p-4">
            <div
              class="flex items-center justify-center gap-4 text-gray-800 font-bold text-2xl"
            >
              <span
                class="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow"
                aria-label="Hours"
              >
                {{ String(hours).padStart(2, "0") }}
              </span>
              <span class="text-lg text-gray-500">:</span>
              <span
                class="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow"
                aria-label="Minutes"
              >
                {{ String(minutes).padStart(2, "0") }}
              </span>
              <span class="text-lg text-gray-500">:</span>
              <span
                class="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow"
                aria-label="Seconds"
              >
                {{ String(seconds).padStart(2, "0") }}
              </span>
            </div>
          </div>

          </div>
        </div>
        <div class="lg:col-span-4">
          <SwiperSlider :items="flashSale.products" :swiperOptions="productOptions">
      <template #default="{ item }">
        <ProductCard :product="item" />
      </template>
    </SwiperSlider>
        </div>
      </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SwiperSlider from '@/Components/Shared/SwiperSlider.vue'
import ProductCard from '@/Components/ProductCard.vue'

// Props from Laravel
const props =defineProps({
  flashSale: {
    type: Object,
    required: true,
  }
})

const productOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }
}

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
let timer = null

function updateCountdown() {
  const now = new Date()
  const endTime = new Date(props.flashSale.end_time)

  const diff = endTime - now

  if (diff <= 0) {
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    clearInterval(timer)
    return
  }

  const totalSeconds = Math.floor(diff / 1000)
  hours.value = Math.floor(totalSeconds / 3600)
  minutes.value = Math.floor((totalSeconds % 3600) / 60)
  seconds.value = totalSeconds % 60
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

