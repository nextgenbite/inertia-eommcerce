
<template>
  <default-layout>
    <Head title="Checkout" />
    <div class="container mx-auto my-10 px-4">
      <div
        class="lg:max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <div
          v-if="!cartStore.cart?.items?.length"
          class="text-center text-gray-400 py-8 text-3xl"
        >
          <i class="pi pi-shopping-bag" style="font-size: 3rem"></i><br />
          Your cart is empty.
        </div>
        <Stepper v-else v-model:value="activeStep" class="w-full">
          <StepList>
            <Step
              v-slot="{ activateCallback, value, a11yAttrs }"
              asChild
              :value="1"
            >
              <div
                class="flex flex-row flex-auto gap-2 items-center"
                v-bind="a11yAttrs.root"
              >
                <button
                  class="bg-transparent border-0 inline-flex flex-row gap-2 items-center"
                  @click="activateCallback"
                  v-bind="a11yAttrs.header"
                >
                  <span
                    :class="[
                      'rounded-full border-2  p-2 lg:p-4 inline-flex items-center justify-center',
                      {
                        'bg-primary text-primary-contrast border-primary':
                          value <= activeStep,
                        'border-surface-200 dark:border-surface-700':
                          value > activeStep,
                      },
                    ]"
                  >
                    <i class="pi pi-shopping-cart"></i>
                  </span>
                  <span class="text-xs font-medium">Cart</span>
                </button>
                <Divider />
              </div>
            </Step>
            <Step
              v-slot="{ activateCallback, value, a11yAttrs }"
              asChild
              value="2"
            >
              <div
                class="flex flex-row flex-auto gap-2 items-center pl-2"
                v-bind="a11yAttrs.root"
              >
                <button
                  class="bg-transparent border-0 inline-flex flex-row gap-2 items-center"
                  @click="activateCallback"
                  v-bind="a11yAttrs.header"
                >
                  <span
                    :class="[
                      'rounded-full border-2  p-2 lg:p-4 inline-flex items-center justify-center',
                      {
                        'bg-primary text-primary-contrast border-primary':
                          value <= activeStep,
                        'border-surface-200 dark:border-surface-700':
                          value > activeStep,
                      },
                    ]"
                  >
                    <i class="pi pi-truck"></i>
                  </span>
                  <span class="text-xs font-medium text-nowrap"
                    >Shipping info</span
                  >
                </button>
                <Divider />
              </div>
            </Step>
            <Step
              v-slot="{ activateCallback, value, a11yAttrs }"
              asChild
              value="3"
            >
              <div
                class="flex flex-row items-center pl-2"
                v-bind="a11yAttrs.root"
              >
                <button
                  class="bg-transparent border-0 inline-flex flex-row gap-2 items-center"
                  @click="activateCallback"
                  v-bind="a11yAttrs.header"
                >
                  <span
                    :class="[
                      'rounded-full border-2  p-2 lg:p-4 inline-flex items-center justify-center',
                      {
                        'bg-primary text-primary-contrast border-primary':
                          value <= activeStep,
                        'border-surface-200 dark:border-surface-700':
                          value > activeStep,
                      },
                    ]"
                  >
                    <i class="pi pi-credit-card"></i>
                  </span>
                  <span class="text-xs font-medium">Payment</span>
                </button>
              </div>
            </Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" :value="1">
              <div class="">
                <div class="max-h-96 overflow-y-auto">
                  <div
                    v-for="item in cartStore.cart.items"
                    :key="item.id"
                    class="flex items-center gap-4 py-3 border-b last:border-b-0"
                  >
                    <img
                      :src="
                        item.product.thumbnail
                          ? '/' + item.product.thumbnail
                          : '/no-image.png'
                      "
                      :alt="item.product.title"
                      class="w-14 lg:w-20 h-14 lg:h-20 rounded-lg object-cover"
                    />
                    <div class="flex-1">
                      <div class="flex items-center justify-between w-full">
                        <h5
                          class="font-manrope font-semibold text-sm lg:text-base text-gray-900"
                        >
                          {{ item.product.title }} -
                          {{ item.variant?.sku || "Base Product" }}
                        </h5>
                        <Button
                          @click="remove(item)"
                          raised
                          rounded
                          outlined
                          icon="pi pi-trash"
                          size="small"
                          severity="danger"
                          style="
                            font-size: 1rem;
                            height: 2.25rem;
                            width: 2.25rem;
                          "
                        />
                      </div>
                      <!-- Color and Size display -->
                      <div
                        class="flex gap-4 text-sm text-gray-500 mb-2"
                        v-if="
                          item.variant.attributes &&
                          item.variant.attributes.length
                        "
                      >
                        <span
                          v-for="attribute in item.variant.attributes"
                          :key="attribute"
                          >{{ attribute.name }}:
                          <span class="font-semibold text-gray-700">{{
                            attribute.value
                          }}</span></span
                        >
                      </div>
                      <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                          <Button
                            @click="updateQty(item, item.quantity - 1)"
                            severity="secondary"
                            raised
                            rounded
                            outlined
                            icon="pi pi-minus"
                            size="small"
                            style="font-size: 1rem; height: 2rem; width: 2rem"
                          />
                          <input
                            type="text"
                            id="number"
                            class="border border-gray-200 shadow shadow-primary-200 rounded-full w-8  aspect-square outline-none text-gray-900 font-semibold text-base py-1 px-2 bg-gray-100 text-center"
                            placeholder="1"
                            v-model.number="item.quantity"
                            readonly
                          />
                          <Button
                            @click="updateQty(item, item.quantity + 1)"
                            severity="secondary"
                            raised
                            rounded
                            outlined
                            icon="pi pi-plus"
                            size="small"
                            style="font-size: 1rem; height: 2rem; width: 2rem"
                          />
                        </div>
                        <h6
                          class="text-primary font-manrope font-bold lg:text-lg text-right"
                        >
                          {{
                            formatCurrency(item.product.price * item.quantity)
                          }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="cartStore.cart?.items?.length"
                  class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto shadow border border-slate-200 dark:border-slate-700"
                >
                  <div class="flex items-center justify-between mb-4">
                    <span
                      class="text-base lg:text-lg text-gray-500 dark:text-gray-400"
                      >Subtotal</span
                    >
                    <span
                      class="font-semibold text-base lg:text-lg text-gray-900 dark:text-white"
                    >
                      {{ formatCurrency(cartStore.cart.subtotal) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between mb-4">
                    <span
                      class="text-base lg:text-lg text-gray-500 dark:text-gray-400"
                      >Delivery</span
                    >
                    <span
                      class="font-semibold text-base lg:text-lg text-gray-900 dark:text-white"
                    >
                      {{ formatCurrency(cartStore.cart.shipping_cost) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between mb-4">
                    <span
                      class="text-base lg:text-lg text-gray-500 dark:text-gray-400"
                      >Tax</span
                    >
                    <span
                      class="font-semibold text-base lg:text-lg text-gray-900 dark:text-white"
                    >
                      {{ formatCurrency(cartStore.cart.tax) }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between mb-4">
                    <span
                      class="text-base lg:text-lg text-gray-500 dark:text-gray-400"
                      >Discount</span
                    >
                    <span
                      class="font-semibold text-base lg:text-lg text-green-600 dark:text-green-400"
                    >
                      -{{ formatCurrency(cartStore.cart.discount) }}
                    </span>
                  </div>
                  <div
                    class="border-t border-slate-200 dark:border-slate-700 my-4"
                  ></div>
                  <div class="flex items-center justify-between">
                    <span
                      class="font-manrope font-semibold text-lg lg:text-2xl text-gray-900 dark:text-white"
                    >
                      Total
                    </span>
                    <span
                      class="font-manrope font-bold text-lg lg:text-2xl text-primary"
                    >
                      {{ formatCurrency(cartStore.cart.total) }}
                    </span>
                  </div>
                </div>


                <!--
    <div v-if="cart.length" class="border-t px-4 py-3">

        <Link href="/checkout" class="w-full block text-center py-3 bg-primary text-white rounded-full hover:bg-primary-700 transition text-base">
            Checkout
        </Link>
    </div> -->
              </div>
              <div class="flex pt-6 justify-end">
                <Button
                  label="Continue to Shipping"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="activateCallback('2')"
                />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="font-semibold block mb-1" for="name"
                    >Name</label
                  >
                  <InputGroup>
                    <InputGroupAddon>
                      <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText
                      id="name"
                      v-model="form.billing_address.name"
                      placeholder="Full Name"
                    />
                  </InputGroup>
                </div>

                <div>
                  <label class="font-semibold block mb-1" for="email"
                    >Email</label
                  >
                  <InputGroup>
                    <InputGroupAddon>
                      <i class="pi pi-envelope"></i>
                    </InputGroupAddon>
                    <InputText
                      id="email"
                      v-model="form.billing_address.email"
                      placeholder="Email"
                    />
                  </InputGroup>
                </div>

                <div>
                  <label class="font-semibold block mb-1" for="phone"
                    >Phone</label
                  >
                  <InputGroup>
                    <InputGroupAddon>
                      <i class="pi pi-phone"></i>
                    </InputGroupAddon>
                    <InputText
                      id="phone"
                      v-model="form.billing_address.phone"
                      placeholder="Phone"
                    />
                  </InputGroup>
                </div>

                <div>
                  <label class="font-semibold block mb-1" for="address"
                    >Address</label
                  >
                  <InputGroup>
                    <InputGroupAddon>
                      <i class="pi pi-map-marker"></i>
                    </InputGroupAddon>
                    <InputText
                      id="address"
                      v-model="form.billing_address.address"
                      placeholder="Street Address"
                    />
                  </InputGroup>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="font-semibold block mb-1" for="city"
                      >City</label
                    >
                    <InputText
                      id="city"
                      v-model="form.billing_address.city"
                      placeholder="City"
                      class="w-full"
                    />
                  </div>
                  <div>
                    <label class="font-semibold block mb-1" for="state"
                      >State</label
                    >
                    <InputText
                      id="state"
                      v-model="form.billing_address.state"
                      placeholder="State"
                      class="w-full"
                    />
                  </div>
                  <div>
                    <label class="font-semibold block mb-1" for="zip"
                      >Zip Code</label
                    >
                    <InputText
                      id="zip"
                      v-model="form.billing_address.zip"
                      placeholder="Zip Code"
                      class="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label class="font-semibold block mb-1" for="country"
                    >Country</label
                  >
                  <InputText
                    id="country"
                    v-model="form.billing_address.country"
                    placeholder="Country"
                    class="w-full"
                  />
                </div>
              </div>
              <Divider/>
                     <div>
                  <label class="font-semibold block mb-1" for="shipping"
                    >Available Shipping Area</label
                  >
                  <Select v-model="form.shipping_cost" :options="shipping" id="shipping" optionLabel="title" optionValue="id" :loading="!shipping" placeholder="Select a Area" class="w-full" />

                </div>
              <div class="flex pt-6 justify-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback(1)"
                />
                <Button
                  label="Continue to Payment"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="activateCallback('3')"
                />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              <div class="grid grid-cols-1 gap-6">
                <div>
                  <label
                    class="font-semibold block mb-2 text-gray-800 dark:text-gray-200"
                    >Select Payment Method</label
                  >
                  <div class="flex flex-wrap gap-3">
                    <button
                      v-for="option in paymentMethod"
                      :key="option.code"
                      type="button"
                      @click="form.paymentMethod = option.code"
                      :class="[
                        'flex-1 min-w-[120px] px-4 py-2 rounded-lg border transition font-medium shadow-sm focus:outline-none',
                        form.paymentMethod === option.code
                          ? 'bg-primary text-white border-primary ring-2 ring-primary/30'
                          : 'bg-surface-100 dark:bg-surface-800 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-primary/10',
                      ]"
                    >
                      {{ option.name }}
                    </button>
                  </div>
                </div>

                <Transition name="fade" mode="out-in">
                  <div :key="form.paymentMethod">
                    <!-- Cash on Delivery -->
                    <div
                      v-if="form.paymentMethod === 'cod'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl flex flex-col items-center text-center border border-surface-200 dark:border-surface-700"
                    >
                      <i class="pi pi-wallet text-3xl mb-2 text-primary"></i>
                      <p class="text-gray-700 dark:text-gray-200">
                        You will pay with cash upon delivery.
                      </p>
                    </div>

                    <!-- bKash -->
                    <div
                      v-else-if="form.paymentMethod === 'bkash'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
                    >
                      <div class="mb-3 flex items-center gap-2">
                        <img
                          src="/assets/images/bkash.png"
                          alt="bKash"
                          class="h-6"
                        />
                        <span class="font-semibold text-primary">bKash</span>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label
                            class="block mb-1 font-semibold"
                            for="bkashNumber"
                            >bKash Number</label
                          >
                          <InputText
                            id="bkashNumber"
                            v-model="form.bkashNumber"
                            placeholder="Enter your bKash number"
                            class="w-full"
                          />
                        </div>
                        <div>
                          <label class="block mb-1 font-semibold" for="bkashTrx"
                            >Transaction ID</label
                          >
                          <InputText
                            id="bkashTrx"
                            v-model="form.bkashTrx"
                            placeholder="Enter bKash transaction ID"
                            class="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Nagad -->
                    <div
                      v-else-if="form.paymentMethod === 'nagad'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
                    >
                      <div class="mb-3 flex items-center gap-2">
                        <img
                          src="/assets/images/nagad.png"
                          alt="Nagad"
                          class="h-6"
                        />
                        <span class="font-semibold text-primary">Nagad</span>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label
                            class="block mb-1 font-semibold"
                            for="nagadNumber"
                            >Nagad Number</label
                          >
                          <InputText
                            id="nagadNumber"
                            v-model="form.nagadNumber"
                            placeholder="Enter your Nagad number"
                            class="w-full"
                          />
                        </div>
                        <div>
                          <label class="block mb-1 font-semibold" for="nagadTrx"
                            >Transaction ID</label
                          >
                          <InputText
                            id="nagadTrx"
                            v-model="form.nagadTrx"
                            placeholder="Enter Nagad transaction ID"
                            class="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Rocket -->
                    <div
                      v-else-if="form.paymentMethod === 'rocket'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
                    >
                      <div class="mb-3 flex items-center gap-2">
                        <img src="/assets/images/rocket.svg" alt="Rocket" class="h-6" />
                        <span class="font-semibold text-primary">Rocket</span>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label
                            class="block mb-1 font-semibold"
                            for="rocketNumber"
                            >Rocket Number</label
                          >
                          <InputText
                            id="rocketNumber"
                            v-model="form.rocketNumber"
                            placeholder="Enter your Rocket number"
                            class="w-full"
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-1 font-semibold"
                            for="rocketTrx"
                            >Transaction ID</label
                          >
                          <InputText
                            id="rocketTrx"
                            v-model="form.rocketTrx"
                            placeholder="Enter Rocket transaction ID"
                            class="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Stripe -->
                    <div
                      v-else-if="form.paymentMethod === 'stripe'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
                    >
                      <div class="mb-3 flex items-center gap-2">
                        <img
                          src="/assets/images/stripe.png"
                          alt="Stripe"
                          class="h-6"
                        />
                        <span class="font-semibold text-primary">Stripe</span>
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label class="font-semibold block mb-1" for="cardName"
                            >Cardholder Name</label
                          >
                          <InputGroup>
                            <InputGroupAddon>
                              <i class="pi pi-user"></i>
                            </InputGroupAddon>
                            <InputText
                              id="cardName"
                              v-model="form.cardName"
                              placeholder="Name on Card"
                              class="w-full"
                            />
                          </InputGroup>
                        </div>
                        <div>
                          <label
                            class="font-semibold block mb-1"
                            for="cardNumber"
                            >Card Number</label
                          >
                          <InputGroup>
                            <InputGroupAddon>
                              <i class="pi pi-credit-card"></i>
                            </InputGroupAddon>
                            <InputText
                              id="cardNumber"
                              v-model="form.cardNumber"
                              placeholder="1234 5678 9012 3456"
                              maxlength="19"
                              class="w-full"
                            />
                          </InputGroup>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label class="font-semibold block mb-1" for="expiry"
                              >Expiry Date</label
                            >
                            <InputGroup>
                              <InputGroupAddon>
                                <i class="pi pi-calendar"></i>
                              </InputGroupAddon>
                              <InputText
                                id="expiry"
                                v-model="form.expiry"
                                placeholder="MM/YY"
                                maxlength="5"
                                class="w-full"
                              />
                            </InputGroup>
                          </div>
                          <div>
                            <label class="font-semibold block mb-1" for="cvc"
                              >CVC</label
                            >
                            <InputGroup>
                              <InputGroupAddon>
                                <i class="pi pi-lock"></i>
                              </InputGroupAddon>
                              <InputText
                                id="cvc"
                                v-model="form.cvc"
                                placeholder="CVC"
                                maxlength="4"
                                class="w-full"
                              />
                            </InputGroup>
                          </div>
                        </div>
                        <div class="flex items-center mt-2">
                          <input
                            type="checkbox"
                            id="saveCard"
                            v-model="form.saveCard"
                            class="mr-2 accent-primary"
                          />
                          <label
                            for="saveCard"
                            class="text-sm text-gray-700 dark:text-gray-200"
                            >Save card for future purchases</label
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Authorize.Net -->
                    <div
                      v-else-if="form.paymentMethod === 'authorize'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
                    >
                      <div class="mb-3 flex items-center gap-2">
                        <img
                          src="/assets/images/authorize.png"
                          alt="Authorize.Net"
                          class="h-6"
                        />
                        <span class="font-semibold text-primary"
                          >Authorize.Net</span
                        >
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label
                            class="font-semibold block mb-1"
                            for="authCardName"
                            >Cardholder Name</label
                          >
                          <InputGroup>
                            <InputGroupAddon>
                              <i class="pi pi-user"></i>
                            </InputGroupAddon>
                            <InputText
                              id="authCardName"
                              v-model="form.authCardName"
                              placeholder="Name on Card"
                              class="w-full"
                            />
                          </InputGroup>
                        </div>
                        <div>
                          <label
                            class="font-semibold block mb-1"
                            for="authCardNumber"
                            >Card Number</label
                          >
                          <InputGroup>
                            <InputGroupAddon>
                              <i class="pi pi-credit-card"></i>
                            </InputGroupAddon>
                            <InputText
                              id="authCardNumber"
                              v-model="form.authCardNumber"
                              placeholder="1234 5678 9012 3456"
                              maxlength="19"
                              class="w-full"
                            />
                          </InputGroup>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              class="font-semibold block mb-1"
                              for="authExpiry"
                              >Expiry Date</label
                            >
                            <InputGroup>
                              <InputGroupAddon>
                                <i class="pi pi-calendar"></i>
                              </InputGroupAddon>
                              <InputText
                                id="authExpiry"
                                v-model="form.authExpiry"
                                placeholder="MM/YY"
                                maxlength="5"
                                class="w-full"
                              />
                            </InputGroup>
                          </div>
                          <div>
                            <label
                              class="font-semibold block mb-1"
                              for="authCvc"
                              >CVC</label
                            >
                            <InputGroup>
                              <InputGroupAddon>
                                <i class="pi pi-lock"></i>
                              </InputGroupAddon>
                              <InputText
                                id="authCvc"
                                v-model="form.authCvc"
                                placeholder="CVC"
                                maxlength="4"
                                class="w-full"
                              />
                            </InputGroup>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Bank Transfer -->
                    <div
                      v-else-if="form.paymentMethod === 'bank'"
                      class="p-6 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700"
                    >
                      <div class="mb-3 flex items-center gap-2">
                        <img
                          src="/assets/images/visa.svg"
                          alt="Bank"
                          class="h-6"
                        />
                        <span class="font-semibold text-primary"
                          >Bank Transfer</span
                        >
                      </div>
                      <div class="grid grid-cols-1 gap-4">
                        <div>
                          <label class="block mb-1 font-semibold" for="bankName"
                            >Bank Name</label
                          >
                          <InputText
                            id="bankName"
                            v-model="form.bankName"
                            placeholder="Enter bank name"
                            class="w-full"
                          />
                        </div>
                        <div>
                          <label
                            class="block mb-1 font-semibold"
                            for="accountNumber"
                            >Account Number</label
                          >
                          <InputText
                            id="accountNumber"
                            v-model="form.accountNumber"
                            placeholder="Enter account number"
                            class="w-full"
                          />
                        </div>
                        <div>
                          <label class="block mb-1 font-semibold" for="bankTrx"
                            >Transaction ID</label
                          >
                          <InputText
                            id="bankTrx"
                            v-model="form.bankTrx"
                            placeholder="Enter bank transaction ID"
                            class="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
              <div class="flex pt-6 justify-between">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  @click="activateCallback('2')"
                />
                <Button
                  label="Confirm Order"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  @click="requireConfirmation()"
                />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </div>

    <!-- Order Confirmation Dialog -->
    <ConfirmDialog group="headless" :style="{ width: '25rem' }">
      <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
      <div class="rounded-full bg-primary text-primary-contrast flex justify-center items-center h-16 w-16 -mt-14 shadow-lg">
        <i class="pi pi-question text-3xl"></i>
      </div>
      <span class="font-bold text-xl mt-6 mb-2 text-gray-900 dark:text-white">
        {{ message.header }}
      </span>
      <p class="mb-4 text-gray-600 dark:text-gray-300 text-center">{{ message.message }}</p>
      <!-- Order Summary in Popup -->
      <div class="w-full my-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
        <h3 class="font-semibold mb-3 text-base text-gray-800 dark:text-gray-200">Order Summary</h3>
        <div
          v-for="item in cartStore.cart.items"
          :key="item.id"
          class="flex justify-between items-center text-sm py-1 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
        >
          <span class="truncate max-w-[60%] text-gray-700 dark:text-gray-200">
        {{ item.product.title }}
        <span class="text-gray-400">x{{ item.quantity }}</span>
          </span>
          <span class="font-medium text-gray-900 dark:text-white">
        {{ formatCurrency((item.variant?.price ? item.variant?.price : (item?.product?.discount_price || item?.product?.price)) * item.quantity) }}
          </span>
        </div>
        <div class="flex justify-between mt-3 text-sm">
          <span class="text-gray-500">Subtotal</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(cartStore.cart.subtotal) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Delivery</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(cartStore.cart.shipping_cost) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Tax</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(cartStore.cart.tax) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-500">Discount</span>
          <span class="font-medium text-green-600 dark:text-green-400">-{{ formatCurrency(cartStore.cart.discount) }}</span>
        </div>
        <div class="flex justify-between mt-3 font-bold text-base">
          <span class="text-gray-900 dark:text-white">Total</span>
          <span class="text-primary">{{ formatCurrency(cartStore.cart.total) }}</span>
        </div>
      </div>
      <div class="flex items-center gap-3 mt-6 w-full">
        <Button label="Place Order" class="flex-1" @click="acceptCallback" />
        <Button label="Cancel" class="flex-1" outlined severity="secondary" @click="rejectCallback" />
      </div>
    </div>
      </template>
    </ConfirmDialog>
  </default-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import { Link, router, Head, useForm } from "@inertiajs/vue3";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

const props = defineProps({
  shipping: Object,
//   product: Object,
//   relatedProducts: Array,
});
const activeStep = ref(1);
const confirm = useConfirm();
const toast = useToast();

const form = useForm({
  billing_address: {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },

  paymentMethod: "cod",
});

const updateQty = async (item, qty) => {
  await cartStore.updateQuantity({
    variant_id: item.variant?.id,
    product_id: item.product?.id,
    quantity: qty,
  });
};

const remove = async (item) => {
  await cartStore.removeFromCart({
    variant_id: item.variant?.id,
    product_id: item.product?.id,
  });
};

// Payment Method Options
const paymentMethod = ref([
  { name: "Cash on Delivery", code: "cod" },
  { name: "bKash", code: "bkash" },
  { name: "Nagad", code: "nagad" },
  { name: "Rocket", code: "rocket" },
  { name: "Stripe", code: "stripe" },
  { name: "Authorize.Net", code: "authorize" },
  { name: "Bank Transfer", code: "bank" },
]);

const requireConfirmation = () => {
  confirm.require({
    group: "headless",
    header: "Confirm Order Placement",
    message:
      "Do you want to place your order? Please review your details before proceeding.",
    accept: () => {
      form.post("/checkout", {
        preserveScroll: true,
        onSuccess: () => {
            cartStore.clearCart();
          toast.add({
            severity: "success",
            summary: "Order Placed",
            detail: "Your order has been placed successfully!",
            life: 4000,
          });
          form.reset();
        },
        onError: () => {
          toast.add({
            severity: "error",
            summary: "Order Failed",
            detail:
              "There was an error placing your order. Please check your details and try again.",
            life: 4000,
          });
        },
      });
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "Order Cancelled",
        detail: "You have cancelled the order placement.",
        life: 3000,
      });
    },
  });
};
</script>
<style>
.p-listbox-list-container {
  max-height: none !important;
}
</style>

