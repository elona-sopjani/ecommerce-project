<script setup lang="ts">
import Header from './components/Header.vue'
import ProductList from './components/ProductList.vue'
</script>

<template>
  <Header />
  <main class="main-container">
    <ProductList />
  </main>
</template>

<style scoped lang="scss">
.main-container {
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
}
</style>
