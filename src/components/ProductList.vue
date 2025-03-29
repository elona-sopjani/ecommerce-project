<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from './ProductCard.vue'

const products = ref([])
const loading = ref(false)
const error = ref<string | null>(null)

const route = useRoute()
const searchQuery = computed(() =>
  (route.query.searchQuery as string | undefined)?.trim().toLowerCase(),
)

const matchesQuery = (product: any, query: string) =>
  product.title.toLowerCase().includes(query) ||
  product.category.toLowerCase().includes(query) ||
  product.description.toLowerCase().includes(query)

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  const query = searchQuery.value
  const filtered = products.value.filter((product) => matchesQuery(product, query))
  return filtered.length > 0 ? filtered : products.value
})

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    // Using mock data request to simulate a real API response
    const response = await fetch('https://fakestoreapi.com/products?limit=10')
    if (!response.ok) throw new Error('Failed to fetch data')
    products.value = await response.json()
  } catch (err) {
    error.value = (err as Error).message || 'An error occurred'
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
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
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
