<script setup lang="ts">
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
      <div class="cart-icon">
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
