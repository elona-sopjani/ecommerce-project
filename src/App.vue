<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue'
import ProductList from './components/ProductList.vue'

const products = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchProducts = async () => {
  loading.value = true
  try {
    // Using mock data request to simulate a real API response
    const response = await fetch('https://fakestoreapi.com/products?limit=10')
    if (!response.ok) throw new Error('Failed to fetch data')
    products.value = await response.json()
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)
</script>

<template>
  <Header />
  <main class="main-container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <ProductList :products="products" />
  </main>
</template>

<style scoped lang="scss">
.main-container {
  padding: 1rem;
  max-width: 1200px;
  margin: auto;

  .loading {
    font-weight: bold;
    width: 100%;
    height: 100%;
  }

  .error-message {
    color: red;
    text-align: center;
    font-weight: bold;
    width: 100%;
    height: 100%;
  }
}
</style>
