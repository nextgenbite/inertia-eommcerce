<script setup>
import { useForm, Head } from "@inertiajs/vue3";
import DefaultLayout from "@/Layouts/Central/GuestLayout.vue";
const props = defineProps({ central_domain: String, plan_id: String });
const form = useForm({
  plan_id: props.plan_id || 1,
  company_name: "",
  name: "",
  domain: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const submit = () => {
  form.post(route("tenant.store"), {
    onFinish: () => form.reset(),
  });
};
</script>

<template>
  <default-layout>
    <Head>
      <title>Tenant Register</title>
    </Head>
    <div
      class="bg-surface-50 dark:bg-surface-950 min-h-screen min-w-full overflow-hidden mx-auto p-4 sm:p-8"
    >
      <div class="lg:w-[50rem] mx-auto lg:mt-24">
        <div
          style="
            border-radius: 56px;
            padding: 0.3rem;
            background: linear-gradient(
              180deg,
              var(--primary-color) 10%,
              rgba(33, 150, 243, 0) 30%
            );
          "
        >
          <div
            class="w-full bg-surface-0 dark:bg-surface-900 py-10 px-4 sm:py-20 sm:px-8 md:px-20"
            style="border-radius: 53px"
          >
            <div class="text-center mb-8">
              <img
                class="h-16 sm:h-20 mx-auto"
                :src="`/${
                  $page.props.settings?.favicon
                    ? $page.props.settings?.favicon
                    : 'placeholder-image.png'
                }`"
                alt="logo"
              />

              <div
                v-if="$page.props.settings?.app_name"
                class="text-surface-900 dark:text-surface-0 text-2xl sm:text-3xl font-medium mb-4 capitalize"
              >
                Welcome to {{ $page.props.settings?.app_name }}!
              </div>
              <span class="text-muted-color font-medium"
                >Sign in to continue</span
              >
            </div>

            <form @submit.prevent="submit">
              <div>
                <label
                  for="company_name"
                  class="block text-surface-900 dark:text-surface-0 text-lg sm:text-xl font-medium mb-2"
                  >Company Name</label
                >
                <InputText
                  id="company_name"
                  type="text"
                  placeholder="Enter Company Name"
                  class="w-full mb-4"
                  v-model="form.company_name"
                />
                <Message
                  v-if="form.errors.company_name"
                  class="mb-4"
                  severity="error"
                  >{{ form.errors.company_name }}</Message
                >
                <label
                  for="company_name"
                  class="block text-surface-900 dark:text-surface-0 text-lg sm:text-xl font-medium mb-2"
                  >Domain</label
                >
                <InputGroup>
                  <InputText
                    id="domain"
                    v-model="form.domain"
                    autocomplete="off"
                    placeholder="example.com"
                  />
                  <InputGroupAddon>{{ central_domain }}</InputGroupAddon>
                </InputGroup>
                <Message
                  v-if="form.errors.company_name"
                  class="mb-4"
                  severity="error"
                  >{{ form.errors.company_name }}</Message
                >
                <label
                  for="name"
                  class="block text-surface-900 dark:text-surface-0 text-lg sm:text-xl font-medium mb-2"
                  >Name</label
                >
                <InputText
                  id="name"
                  type="text"
                  placeholder="Name"
                  class="w-full mb-4"
                  v-model="form.name"
                />
                <Message
                  v-if="form.errors.name"
                  class="mb-4"
                  severity="error"
                  >{{ form.errors.name }}</Message
                >
                <label
                  for="email1"
                  class="block text-surface-900 dark:text-surface-0 text-lg sm:text-xl font-medium mb-2"
                  >Email</label
                >
                <InputText
                  id="email1"
                  type="text"
                  placeholder="Email"
                  class="w-full mb-4"
                  v-model="form.email"
                />
                <Message
                  v-if="form.errors.email"
                  class="mb-4"
                  severity="error"
                  >{{ form.errors.email }}</Message
                >

                <label
                  for="password1"
                  class="block text-surface-900 dark:text-surface-0 font-medium text-lg sm:text-xl mb-2"
                  >Password</label
                >
                <Password
                  id="password1"
                  v-model="form.password"
                  placeholder="Password"
                  :toggleMask="true"
                  class="mb-4"
                  fluid
                  :feedback="false"
                ></Password>
                <Message
                  v-if="form.errors.password"
                  class="mb-4"
                  severity="error"
                  >{{ form.errors.password }}</Message
                >
                <label
                  for="password_confirmation"
                  class="block text-surface-900 dark:text-surface-0 font-medium text-base mb-1"
                  >Confirm Password</label
                >
                <Password
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  required
                  autocomplete="new-password"
                  placeholder="Confirm password"
                  :toggleMask="true"
                  class="w-full"
                  fluid
                  :feedback="false"
                ></Password>
                <Message
                  v-if="form.errors.password_confirmation"
                  class="mt-1"
                  severity="error"
                  >{{ form.errors.password_confirmation }}</Message
                >

                <Button
                  type="submit"
                  label="Register"
                  class="w-full mt-8"
                  :disabled="form.processing"
                  :loading="form.processing"
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
