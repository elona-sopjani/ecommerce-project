<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import ProductFilters from './ProductFilters.vue'
import { useProductList } from '../composables/useProductList'

const {
  categories,
  loading,
  error,
  selectedCategories,
  selectedSortOption,
  filteredProducts,
  updateCategory,
  updateSort,
} = useProductList()
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
    <div class="grid-container" v-if="filteredProducts.length > 0">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
    <div class="no-products" v-else>
      <p class="no-products-message">No products available at the moment.</p>
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
  .no-products {
    display: flex;
    justify-content: center;
    align-items: center;

    .no-products-message {
      font-size: 15px;
      color: #555;
      font-weight: bold;
      text-align: center;
      padding: 20px;
      border: 2px solid #ddd;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
