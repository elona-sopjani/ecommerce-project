<script setup lang="ts">
import { ref, watch, provide } from 'vue'
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
      <div class="sidebar-content" @click.stop>
        <h2>Your Cart</h2>
        <CartCard v-for="(item, i) in cart" :key="i" :product="item" v-if="cart.length > 0" />
        <h2 v-else class="empty-state">Your cart is empty</h2>

        <div class="close-sidebar-wrapper">
          <button class="close-sidebar-button" @click="toggleSidebar">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

.sidebar-content {
  background-color: white;
  padding: 1rem;
  width: 100%;
  max-width: 350px;
  height: 100%;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;

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
}
.close-sidebar-wrapper {
  position: fixed;
  bottom: 16px;
  right: 16px;
  .close-sidebar-button {
    padding: 0.5rem 1rem;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
  }

  .close-sidebar-button:hover {
    background-color: #d32f2f;
  }
}
@media (max-width: 768px) {
  .sidebar-overlay {
    justify-content: center;
  }

  .sidebar-content {
    max-width: 100%;
    width: 100%;
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .sidebar-overlay {
    justify-content: flex-end;
  }

  .sidebar-content {
    max-width: 350px;
    width: 350px;
  }

  .sidebar-overlay {
    transition: all 0.3s ease-in-out;
  }
}
</style>
