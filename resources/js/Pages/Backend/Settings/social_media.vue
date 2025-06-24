<template>
  <div>
    <div class="container mt-8">
      <div class="mx-auto w-3/4">
        <form @submit.prevent="submitForm">

          <div class="card mt-4">

            <h4 class="block my-2 text-lg  font-medium text-gray-900 dark:text-white">Social Media Settings</h4>
            <label for="website-admin"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
            <div class="flex my-2">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i class="fa-brands fa-facebook"></i>
              </span>
              <input v-model="form.facebook" type="text" id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your facebook link">
            </div>
            <label for="website-admin"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
            <div class="flex my-2">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i class="fa-brands fa-twitter"></i>
              </span>
              <input v-model="form.twitter" type="text" id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your facebook link">
            </div>
            <label for="website-admin"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
            <div class="flex my-2">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i class="fa-brands fa-instagram"></i>
              </span>
              <input v-model="form.instagram" type="text" id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your instagram link">
            </div>
            <label for="website-admin"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Linkedin</label>
            <div class="flex my-2">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <i class="fa-brands fa-linkedin"></i>
              </span>
              <input v-model="form.linkedin" type="text" id="website-admin"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your linkedin link">
            </div>
            <div class="flex justify-end">

              <button type="submit" class="btn bg-blue-500 shadow-lg shadow-blue-500/50 "> Update</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
  
<script>


export default {
  setup() {
    definePageMeta({
      layout: "admin-2",
      middleware: ['auth']
    })


  },
  data() {
    return {
      items: [], // Your data array
      createModalOpen: false,
      isUpdate: false,
      itemImage: '',
      form: {
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null,
      },

    };
  },
  methods: {


    async submitForm() {


      try {
        const method = 'POST';
        const response = await this.$apiFetch('/api/site-settings', {
          method,
          body: this.form, // Use the formData object as the body, it will automatically use multipart/form-data
        });

        // Assuming the response contains the updated or newly created brand object
        this.form = response.data; // Adjust this based on the actual response format


        Notification.showSuccess(response.message);
        // If it's an update, find the item in the items array and update it

      } catch (error) {
        console.error(error);
      }
    },

    async fetchData() {
      this.form = await $fetch(this.$config.public.BASE_API_URL + 'site-settings')
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
  