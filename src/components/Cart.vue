<script setup lang="ts">
import { ref, watch, provide, computed, inject, type Ref } from 'vue'
import CartCard from './CartCard.vue'
import { useRouter } from 'vue-router'
import { type ICart } from '../interfaces/ICart'
import { type ICheckout } from '../interfaces/ICheckout'

const initialCheckoutData = {
  fullName: '',
  address: '',
  email: '',
  paymentType: 'Card',
  orderItems: [],
}
const showSidebar = ref(false)
const showCheckoutForm = ref(false)
const checkoutData = ref<ICheckout>(initialCheckoutData)
const cart = ref<ICart[]>([])

const router = useRouter()
const notifications = inject('notifications') as Ref<number>
const updateNotifications = inject('updateNotifications') as (newCount: number) => void

const totalPrice = computed(() => {
  return parseFloat(
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
  )
})

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
const removeFromCart = (productId: number) => {
  cart.value = cart.value.filter((p) => p.id !== productId)

  localStorage.setItem('cart', JSON.stringify(cart.value))
}

const handleCheckoutConfirmation = () => {
  if (!cart.value.length) return
  if (!showCheckoutForm.value) {
    showCheckoutForm.value = true
    return
  }
  if (
    !checkoutData.value.fullName ||
    !checkoutData.value.address ||
    !checkoutData.value.email ||
    !checkoutData.value.paymentType
  ) {
    alert('Please fill in all fields before confirming your order.')
    return
  }
  const currentDate = new Date()

  const checkoutWithDate = {
    ...checkoutData.value,
    orderDate: currentDate,
    orderItems: cart.value,
    total: totalPrice.value,
  }
  const existingOrderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]')

  existingOrderHistory.unshift(checkoutWithDate)
  localStorage.setItem('orderHistory', JSON.stringify(existingOrderHistory))

  cart.value = []
  localStorage.removeItem('cart')
  showCheckoutForm.value = false
  showSidebar.value = false
  router.push({ name: 'history' })
}

watch(showSidebar, (newValue) => {
  if (newValue) {
    updateNotifications(0)
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      cart.value = JSON.parse(storedCart)
    }
    if (checkoutData.value) {
      checkoutData.value = initialCheckoutData
    }
  } else {
    showCheckoutForm.value = false
  }
})

provide('removeFromCart', removeFromCart)
</script>

<template>
  <div>
    <div class="cart-icon" @click="toggleSidebar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="#ffffff"
        viewBox="0 0 576 512"
      >
        <path
          d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
        />
      </svg>
      <span class="notification-indicator" v-if="notifications > 0"> {{ notifications }}</span>
    </div>

    <div v-if="showSidebar" class="sidebar-overlay" @click="toggleSidebar">
      <div class="sidebar-content-wrapper" @click.stop>
        <header class="sidebar-header">
          <h2>
            Your Cart
            <span v-if="cart.length > 0">
              {{ cart.length }} {{ cart.length === 1 ? 'product' : 'products' }}
            </span>
          </h2>
          <div class="close-sidebar-wrapper" @click="toggleSidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              height="18px"
              width="18px"
            >
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </div>
        </header>
        <div class="sidebar-content">
          <div v-if="cart.length > 0">
            <CartCard v-for="(item, i) in cart" :key="i" :product="item" />
          </div>
          <h2 v-else class="empty-state">Your cart is empty</h2>
        </div>
        <footer class="sidebar-footer">
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
            <input
              type="email"
              id="email"
              v-model="checkoutData.email"
              placeholder="Enter your email"
            />
            <label>Payment Type</label>
            <div class="payment-radio-buttons">
              <input
                type="radio"
                id="paymentCard"
                v-model="checkoutData.paymentType"
                value="Card"
              />
              <label for="paymentCard">Card</label>

              <input
                type="radio"
                id="paymentCash"
                v-model="checkoutData.paymentType"
                value="Cash"
              />
              <label for="paymentCash">Cash</label>
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
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-icon {
  cursor: pointer;
  position: relative;
  .notification-indicator {
    position: absolute;
    top: -7px;
    right: -8px;
    background-color: red;
    color: #ffffff;
    font-size: 12px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 999;
  transition: all 0.3s ease-in-out;
  color: black;
}

.sidebar-content-wrapper {
  background-color: white;
  width: 100%;
  max-width: 350px;
  height: 100dvh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: between;
  min-height: 100dvh;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }
  h2.empty-state {
    font-size: 1rem;
    color: #555;
    text-align: center;
    margin-top: 20px;
  }

  .sidebar-content {
    overflow-y: auto;
    flex-grow: 1;
    padding: 1rem;
  }
}

.sidebar-header {
  background-color: #ffffff;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 3px 6px rgba(21, 48, 92, 0.08);
  z-index: 1;
  h2 {
    font-size: 14px;
    font-weight: 600;
    span {
      font-weight: 400;
      font-size: 12px;
      margin-left: 4px;
    }
  }
  .close-sidebar-wrapper {
    cursor: pointer;

    &:hover {
      fill: #d32f2f;
    }
  }
}

.sidebar-footer {
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0px -3px 6px rgba(21, 48, 92, 0.08);
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
}
@media (max-width: 768px) {
  .sidebar-overlay {
    justify-content: center;
  }

  .sidebar-content-wrapper {
    max-width: 100%;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .sidebar-overlay {
    justify-content: flex-end;
  }

  .sidebar-content-wrapper {
    max-width: 350px;
    width: 350px;
  }

  .sidebar-overlay {
    transition: all 0.3s ease-in-out;
  }
}
</style>
