<script setup>
import DefaultLayout from "@/Layouts/Default.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

const form = useForm({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const submit = () => {
  form.post(route("register"), {
    onFinish: () => form.reset("password", "password_confirmation"),
  });
};
</script>

<template>
<default-layout>
    <Head title="Register" />
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen w-full overflow-hidden p-4 sm:p-8"
    >
        <div class="flex flex-col items-center w-full max-w-lg mx-auto">
            <div
                class="rounded-3xl p-1 bg-gradient-to-b from-primary to-transparent w-full"
            >
                <div
                    class="w-full bg-surface-0 dark:bg-surface-900 py-8 px-4 sm:py-12 sm:px-8"
                    style="border-radius: 1.5rem"
                >
                    <div class="text-center mb-8">
                        <img
                            v-if="$page.props.settings?.favicon"
                            class="h-14 sm:h-16 mx-auto mb-4"
                            :src="`/${$page.props.settings?.favicon}`"
                            alt="logo"
                        />
                        <svg
                            v-else
                            viewBox="0 0 54 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="mb-4 w-12 sm:w-16 mx-auto"
                        >
                            <!-- SVG content unchanged -->
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                                fill="var(--primary-color)"
                            />
                        </svg>
                        <div
                            class="text-surface-900 dark:text-surface-0 text-2xl sm:text-3xl font-semibold mb-2 capitalize"
                        >
                            Welcome to {{ $page.props.settings?.app_name }}!
                        </div>
                        <span class="text-muted-color font-medium text-base"
                            >Sign up to continue</span
                        >
                    </div>

                    <form @submit.prevent="submit" class="space-y-4">
                        <div>
                            <label
                                for="name"
                                class="block text-surface-900 dark:text-surface-0 text-base font-medium mb-1"
                                >Name</label
                            >
                            <InputText
                                id="name"
                                type="text"
                                placeholder="Your name"
                                required
                                autofocus
                                autocomplete="name"
                                class="w-full"
                                v-model="form.name"
                            />
                            <Message
                                v-if="form.errors.name"
                                class="mt-1"
                                severity="error"
                                >{{ form.errors.name }}</Message
                            >
                        </div>

                        <div>
                            <label
                                for="email1"
                                class="block text-surface-900 dark:text-surface-0 text-base font-medium mb-1"
                                >Email</label
                            >
                            <InputText
                                id="email1"
                                type="email"
                                placeholder="you@email.com"
                                class="w-full"
                                v-model="form.email"
                                required
                                autocomplete="username"
                            />
                            <Message
                                v-if="form.errors.email"
                                class="mt-1"
                                severity="error"
                                >{{ form.errors.email }}</Message
                            >
                        </div>

                        <div>
                            <label
                                for="password1"
                                class="block text-surface-900 dark:text-surface-0 font-medium text-base mb-1"
                                >Password</label
                            >
                            <Password
                                id="password1"
                                v-model="form.password"
                                required
                                autocomplete="new-password"
                                placeholder="Password"
                                :toggleMask="true"
                                class="w-full"
                                fluid
                                :feedback="false"
                            ></Password>
                            <Message
                                v-if="form.errors.password"
                                class="mt-1"
                                severity="error"
                                >{{ form.errors.password }}</Message
                            >
                        </div>

                        <div>
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
                        </div>

                        <div class=" mt-4">
                            <Link
                                :href="route('login')"
                                class="font-medium text-primary  hover:underline"
                            >
                                Already registered?
                            </Link>
                            <Button
                                type="submit"
                                label="Sign Up"
                                class="w-full mt-2"
                                :loading="form.processing"
                                :disabled="form.processing"
                            ></Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</default-layout>
</template>
