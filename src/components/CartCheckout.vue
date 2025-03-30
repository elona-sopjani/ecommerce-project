<script setup lang="ts">
import { defineEmits } from 'vue'
import { type ICart } from '../interfaces/ICart'
import { useCheckout } from '../composables/useCheckout'
import SpinnerIcon from './icons/IconSpinner.vue'

const props = defineProps<{ cart: ICart[] }>()
const emit = defineEmits<{
  (event: 'empty-cart'): (event: string) => void
}>()

const {
  checkoutData,
  showCheckoutForm,
  totalPrice,
  handleCheckoutConfirmation,
  errorMessage,
  loadingCheckout,
} = useCheckout(props.cart, emit)
</script>
<template>
  <p class="form-error-message" v-if="errorMessage">{{ errorMessage }}</p>
  <div v-if="showCheckoutForm" class="checkout-form">
    <h2>Your information</h2>
    <label for="fullName">Full Name</label>
    <input
      type="text"
      id="fullName"
      v-model="checkoutData.fullName"
      placeholder="Enter your full name"
    />
    <label for="address">Address</label>
    <input
      type="text"
      id="address"
      v-model="checkoutData.address"
      placeholder="Enter your address"
    />
    <label for="email">Email</label>
    <input type="email" id="email" v-model="checkoutData.email" placeholder="Enter your email" />
    <label>Payment Type</label>
    <div class="payment-radio-buttons">
      <input type="radio" id="paymentCard" v-model="checkoutData.paymentType" value="By Card" />
      <label for="paymentCard">By Card</label>
      <input type="radio" id="paymentCash" v-model="checkoutData.paymentType" value="By Cash" />
      <label for="paymentCash">By Cash</label>
    </div>
  </div>
  <div v-if="totalPrice > 0" class="cart-total">
    <h2>TOTAL</h2>
    <p>${{ totalPrice }}</p>
  </div>
  <div class="checkout-wrapper">
    <div class="checkout-button-wrapper">
      <button
        v-if="showCheckoutForm"
        class="checkout-button cancel"
        @click="showCheckoutForm = !showCheckoutForm"
      >
        Cancel
      </button>
      <button class="checkout-button confirm" @click="handleCheckoutConfirmation">
        {{ showCheckoutForm ? 'Confirm' : 'Checkout' }}
        <SpinnerIcon v-if="loadingCheckout" class="spin" />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.form-error-message {
  color: #d32f2f !important;
}
.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h2 {
    font-size: 14px;
    font-weight: 500;
  }
}
.checkout-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    outline: none;
    width: 100%;
  }
  label {
    font-size: 14px;
    color: rgb(153, 153, 153);
  }
  .payment-radio-buttons {
    display: flex;
    gap: 4px;
    input {
      width: auto;
    }
    label {
      margin-right: 16px;
      color: unset;
    }
  }
}

.checkout-button-wrapper {
  display: flex;
  gap: 8px;
  .checkout-button {
    width: 100%;
    padding: 0.8rem;
    background-color: #2e8b57;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    &:hover {
      background-color: #267d4b;
    }
  }
  .checkout-button.cancel {
    width: 100%;
    padding: 0.8rem;
    background-color: #ffff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: unset;
    transition: background-color 0.3s ease;
    text-transform: uppercase;

    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
