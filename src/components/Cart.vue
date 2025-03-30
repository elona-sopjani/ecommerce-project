<script setup lang="ts">
import { useCart } from '../composables/useCart'
import CartCard from './CartCard.vue'
import CartIcon from '../components/icons/IconCart.vue'
import CloseIcon from './icons/IconClose.vue'
import CartCheckout from './CartCheckout.vue'

const { cart, showSidebar, toggleSidebar, handleEmptyCart, notifications } = useCart()
</script>

<template>
  <div>
    <div class="cart-icon" @click="toggleSidebar">
      <CartIcon />
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
            <CloseIcon />
          </div>
        </header>
        <div class="sidebar-content">
          <div v-if="cart.length > 0">
            <CartCard v-for="(item, i) in cart" :key="i" :product="item" />
          </div>
          <h2 v-else class="empty-state">Your cart is empty</h2>
        </div>
        <footer class="sidebar-footer" v-if="cart.length > 0">
          <CartCheckout :cart="cart" @empty-cart="handleEmptyCart" />
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
    background-color: #d32f2f;
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
