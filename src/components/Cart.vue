<script setup lang="ts">
import { ref, watch, provide, computed } from 'vue'
import CartCard from './CartCard.vue'
const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const cart = ref<
  {
    id: number
    title: string
    description: string
    price: number
    image: string
    quantity: number
  }[]
>([])

const totalPrice = computed(() => {
  return parseFloat(
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
  )
})

watch(showSidebar, (newValue) => {
  if (newValue) {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      cart.value = JSON.parse(storedCart)
    }
  }
})

const removeFromCart = (productId: number) => {
  cart.value = cart.value.filter((p) => p.id !== productId)

  localStorage.setItem('cart', JSON.stringify(cart.value))
}

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
          <CartCard v-if="cart.length > 0" v-for="(item, i) in cart" :key="i" :product="item" />
          <h2 v-else class="empty-state">Your cart is empty</h2>
        </div>
        <footer class="sidebar-footer">
          <div v-if="totalPrice > 0" class="cart-total">
            <h2>TOTAL</h2>
            <p>${{ totalPrice }}</p>
          </div>
          <div class="checkout-wrapper">
            <button class="checkout-button" :disabled="totalPrice == 0">Checkout</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-icon {
  cursor: pointer;
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
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: between;
  min-height: 100vh;

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
