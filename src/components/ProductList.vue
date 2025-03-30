<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { type IProduct } from '../interfaces/IProduct'
import ProductCard from './ProductCard.vue'
import ProductFilters from './ProductFilters.vue'

const products = ref<IProduct[]>([])
const categories = ref<string[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const selectedCategories = ref<string[]>([])
const selectedSortOption = ref<string | null>(null)

const route = useRoute()

const matchesQuery = (product: IProduct, query: string) =>
  product.title.toLowerCase().includes(query) ||
  product.category?.toLowerCase().includes(query) ||
  product.description.toLowerCase().includes(query)

const searchQuery = computed(() => (route.query.searchQuery as string)?.trim().toLowerCase() || '')
const filteredProducts = computed(() => {
  let result: IProduct[] = [...products.value]

  if (searchQuery.value) {
    result = result.filter((product) => matchesQuery(product, searchQuery.value))
  }

  if (selectedCategories.value.length > 0) {
    result = result.filter((product) => selectedCategories.value.includes(product.category))
  }

  if (selectedSortOption.value === 'Low to High') {
    result.sort((a: { price: number }, b: { price: number }) => a.price - b.price)
  } else if (selectedSortOption.value === 'High to Low') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

const updateCategory = (categories: string[]) => {
  selectedCategories.value = categories
}

const updateSort = (sortOption: string) => {
  selectedSortOption.value = sortOption
}

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    // Using mock data request to simulate a real API response
    const response = await fetch('https://fakestoreapi.com/products?limit=10')
    if (!response.ok) throw new Error('Failed to fetch data')
    products.value = await response.json()
    categories.value = [...new Set(products.value.map((product) => product.category))]
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
    <ProductFilters
      :categories="categories"
      :selectedCategories="selectedCategories"
      :selectedSortOption="selectedSortOption"
      @update-categories="updateCategory"
      @update-sort="updateSort"
    />
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
