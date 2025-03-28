<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

const products = ref([
  {
    id: 1,
    name: 'Camera',
    description: 'This is a great product.',
    price: 19.99,
    image:
      'https://media.istockphoto.com/id/185278433/photo/black-digital-slr-camera-in-a-white-background.jpg?s=612x612&w=0&k=20&c=OOCbhvOF0W-eVhhrm-TxbgLfbKhFfs4Lprjd7hiQBNU=',
  },
])
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
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
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
