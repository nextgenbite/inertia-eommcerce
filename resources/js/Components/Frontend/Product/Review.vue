<script setup>
import { ref } from "vue";
defineProps({
     product: Object,
    //  feature: Array
})
const reviews = ref([
  {
    id: 1,
    avatar: "https://pagedone.io/asset/uploads/1704349572.png",
    author: "John Doe",
    date: "2024-06-01",
    rating: 5,
    comment: "Excellent product! Highly recommended.",
  },
  {
    id: 2,
    avatar: "https://pagedone.io/asset/uploads/1704351103.png",
    author: "Jane Smith",
    date: "2024-06-02",
    rating: 4,
    comment: "Very good quality, but shipping was slow.",
  },
  {
    id: 2,
    avatar: "https://pagedone.io/asset/uploads/1704351103.png",
    author: "Arifur Rahman",
    date: "2024-06-02",
    rating: 4,
    comment: "This product is amazing! I love the design and quality.",
  },
]);
const averageRating = ref(
  reviews.value.reduce((sum, review) => sum + review.rating, 0) /
    reviews.value.length
);
const totalRatings = ref(reviews.value.length);
const ratingCount = (rating) => {
  return reviews.value.filter((review) => review.rating === rating).length;
};
const ratingPercent = (rating) => {
  return (ratingCount(rating) / totalRatings.value) * 100;
};
</script>
<template>
     <div class=" mt-4">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Overview</Tab>
            <Tab value="1">Reviews & Ratings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div v-html="product.description"></div>
            </TabPanel>
            <TabPanel value="1">
              <section class="relative">
                <div class="w-full">
                  <h2
                    class="font-bold text-2xl md:text-3xl text-black mb-8 text-center"
                  >
                    Our customer reviews
                  </h2>
                  <!-- Ratings Summary -->
                  <div
                    class="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8 border-b border-gray-100"
                  >
                    <div class="flex flex-col gap-y-4 w-full">
                      <div
                        v-for="n in 5"
                        :key="n"
                        class="flex items-center w-full"
                      >
                        <p class="font-medium text-lg text-black mr-1">
                          {{ 6 - n }}
                        </p>
                        <span class="text-yellow-400 mr-2">
                          <i class="pi pi-star-fill"></i>
                        </span>
                        <div
                          class="h-2 w-full sm:min-w-[120px] rounded-3xl bg-amber-50 ml-2 mr-3"
                        >
                          <span
                            class="h-full rounded-3xl bg-amber-400 flex"
                            :style="{ width: ratingPercent(6 - n) + '%' }"
                          ></span>
                        </div>
                        <p class="font-medium text-lg text-black mr-1">
                          {{ ratingCount(6 - n) }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="p-8 bg-amber-50 rounded-3xl flex items-center justify-center flex-col"
                    >
                      <h2 class="font-bold text-4xl text-amber-400 mb-4">
                        {{ averageRating.toFixed(1) }}
                      </h2>
                      <div class="flex items-center justify-center gap-2 mb-2">
                        <i
                          v-for="n in 5"
                          :key="n"
                          class="pi"
                          :class="
                            n <= Math.round(averageRating)
                              ? 'pi-star-fill text-yellow-400 text-2xl'
                              : 'pi-star text-gray-300 text-2xl'
                          "
                        ></i>
                      </div>
                      <p class="font-medium text-lg text-gray-900 text-center">
                        {{ totalRatings }} Ratings
                      </p>
                    </div>
                  </div>
                  <!-- Reviews List -->
                  <div v-if="reviews && reviews.length" class="pt-8 space-y-8">
                    <div
                      v-for="review in reviews"
                      :key="review.id"
                      class="border-b pb-6"
                    >
                      <div class="flex items-center gap-3 mb-2">
                        <span class="text-yellow-400 flex">
                          <i
                            v-for="n in 5"
                            :key="n"
                            class="pi"
                            :class="
                              n <= review.rating
                                ? 'pi-star-fill'
                                : 'pi-star text-gray-300'
                            "
                          ></i>
                        </span>
                      </div>
                      <h3 class="font-semibold text-lg text-black mb-2">
                        {{ review.title || "Customer Review" }}
                      </h3>
                      <div
                        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2"
                      >
                        <div class="flex items-center gap-2">
                          <img
                            v-if="review.avatar"
                            :src="review.avatar"
                            :alt="review.author"
                            class="w-8 h-8 rounded-full object-cover"
                          />
                          <span class="font-semibold text-primary-600">{{
                            review.author
                          }}</span>
                        </div>
                        <span class="text-gray-400 text-sm">{{
                          review.date
                        }}</span>
                      </div>
                      <p class="text-gray-700">{{ review.comment }}</p>
                    </div>
                  </div>
                  <p v-else class="text-gray-600 py-8 text-center">
                    No reviews yet.
                  </p>
                </div>
              </section>

              <!-- <div>
            <h3 class="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div v-if="reviews && reviews.length">
              <div v-for="review in reviews" :key="review.id" class="mb-6 border-b pb-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-semibold">{{ review.author }}</span>
                  <span class="text-xs text-gray-400">{{ review.date }}</span>
                </div>
                <div class="flex items-center gap-1 text-yellow-400 mb-1">
                  <i v-for="n in 5" :key="n" class="pi pi-star" :class="{ 'text-gray-300': n > review.rating }"></i>
                </div>
                <p class="text-gray-700">{{ review.comment }}</p>
              </div>
            </div>
            <p v-else class="text-gray-600 mb-2">No reviews yet.</p>
            <Button label="Write a Review" icon="pi pi-pencil" outlined />
            <h3 class="text-lg font-semibold mt-8 mb-4">Ratings</h3>
            <div class="flex items-center gap-2">
              <span class="text-yellow-400">
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
                <i class="pi pi-star"></i>
              </span>
              <span class="text-gray-600">(5.0)</span>
            </div>
            <p class="text-gray-600 mt-2">Based on 99 ratings</p>
            <div class="mt-4">
              <h4 class="text-md font-semibold mb-2">Rate this product:</h4>
              <div class="flex items-center gap-2">
                <span class="text-yellow-400 cursor-pointer">
                  <i class="pi pi-star" @click="selectedRating = 1"></i>
                  <i class="pi pi-star" @click="selectedRating = 2"></i>
                  <i class="pi pi-star" @click="selectedRating = 3"></i>
                  <i class="pi pi-star" @click="selectedRating = 4"></i>
                  <i class="pi pi-star" @click="selectedRating = 5"></i>
                </span>
              </div>
            </div>
          </div> -->
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
</template>
