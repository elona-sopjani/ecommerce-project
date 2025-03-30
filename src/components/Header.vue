<script setup lang="ts">
import Cart from './Cart.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()

const searchQuery = ref((route.query.searchQuery as string) || '')

watch(
  () => route.query.searchQuery,
  (newQuery) => {
    searchQuery.value = (newQuery as string) || ''
  },
)

const handleSearch = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const query = searchQuery.value.trim()

    if (query) {
      router.push({ query: { searchQuery: query } })
    } else {
      router.push({ query: {} })
    }
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo">Logo</router-link>
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          @keydown.enter="handleSearch"
        />
      </div>
      <Cart />
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  z-index: 2;

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
      text-decoration: none;
      color: #ffffff;
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
