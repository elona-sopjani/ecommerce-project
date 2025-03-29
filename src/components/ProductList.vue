<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'

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
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="error" class="error-message">{{ error }}</div>
  <section v-else class="product-grid">
    <h2 class="section-title">Featured Products</h2>
    <div class="grid-container">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<style scoped lang="scss">
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
.product-grid {
  .section-title {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
}
</style>
