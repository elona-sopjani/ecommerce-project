<script setup lang="ts">
import Cart from './Cart.vue'
import { ref } from 'vue'
const searchQuery = ref('')
</script>
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">Logo</div>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search..." />
      </div>
      <Cart />
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;

  .navbar-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 16px;
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .search-bar {
      display: flex;
      align-items: center;
      width: 100%;

      input {
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 20px;
        border: none;
        outline: none;
        width: 100%;
      }
    }
    .cart-icon {
      max-height: 24px;
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .navbar-container {
      flex-direction: row;
      justify-content: space-between;
      gap: 20px;
      max-width: 1200px;
      padding-left: 16px;
      padding-right: 16px;

      .search-bar {
        max-width: 600px;
      }
    }
  }
}
</style>
