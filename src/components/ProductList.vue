<script setup lang="ts">
import ProductCard from './ProductCard.vue'

defineProps<{
  products: any[]
}>()
</script>

<template>
  <section class="product-grid">
    <h2 class="section-title">Featured Products</h2>
    <div class="grid-container">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </section>
</template>

<style scoped lang="scss">
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
