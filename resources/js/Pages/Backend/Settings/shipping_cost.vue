<template>
  <div>
    <div class="container mt-8">
      <DataTable :items="items" :itemsPerPage="10" @open-update-modal="openUpdateModal"
        @open-create-modal="openCreateModal" @delete-item="deleteItem" :columns="columns"></DataTable>

      <Modal :isOpen="createModalOpen" @close="createModalOpen = false" @submit="submitForm">
        <h3 class="text-lg font-medium leading-6 text-gray-900">{{ isUpdate ? 'Update Item' : 'Create Item' }}</h3>
        <!-- Add your form fields here -->
        <form>
          <div class="space-y-4">
            <input type="hidden" v-model="form.id">
            <div>
              <label class="text-gray-600 mb-2 block">
                Title <span class="text-primary">*</span>
              </label>
              <input type="text" v-model="form.title" class="input-box rounded w-full" placeholder="Title" />
            </div>
            <div>
              <label class="text-gray-600 mb-2 block">
                Cost <span class="text-primary">*</span>
              </label>
              <input type="text" v-model="form.cost" class="input-box rounded w-full" placeholder="cost" />
            </div>

          </div>




        </form>
      </Modal>
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
      form: {
        id: null,
        title: null,
        cost: null,
      },
      columns: [
        { key: 'title', label: 'Title', path: 'title' },
        { key: 'cost', label: 'cost', path: 'cost' },
      ],
    };
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        title: null,
        cost: null,
      };
    },
    openCreateModal() {
      this.createModalOpen = true;
      this.isUpdate = false;
      this.resetForm();
    },
    openUpdateModal(item) {
      
      this.resetForm();
      this.createModalOpen = true;
      this.isUpdate = true;
      this.form = item;
      // Logic to open update modal and populate the form fields with the item data
    },
    async submitForm() {
      const apiUrl = this.isUpdate ? '/api/shipping-cost/' + this.form.id : '/api/shipping-cost';


      try {
        const method = this.isUpdate ? 'PUT' : 'POST';
        const response = await this.$apiFetch(apiUrl, {
          method,
          body: this.form, // Use the formData object as the body, it will automatically use multipart/form-data
        });

        // Assuming the response contains the updated or newly created brand object
        const data = response.data; // Adjust this based on the actual response format

        Notification.showSuccess(response.message);
        // If it's an update, find the item in the items array and update it
        if (this.isUpdate) {
          const index = this.items.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            this.items.splice(index, 1, data);
          }
        } else {
          // If it's a create action, add the new item to the items array
          this.items.push(data);
        }

        this.createModalOpen = false; // Close the modal after successful form submission
      } catch (error) {
        // Handle error, e.g., show an error message
        Notification.showError(response.message);
        console.error(error);
      }
    },

    async deleteItem(itemId) {

      try{
        const response = await this.$apiFetch('/api/shipping-cost/' + itemId,
          { method: 'DELETE' }
        );
        Notification.showSuccess(response.message);
        // Logic to delete an item
        this.items = this.items.filter(item => item.id !== itemId);
      } catch (error) {
        // Handle error, e.g., show an error message
        Notification.showError(response.message);
        console.error(error);
      }
    },
    async fetchData() {
      this.items = await this.$apiFetch('/api/shipping-cost')
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
