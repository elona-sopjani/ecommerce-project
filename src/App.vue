<script setup lang="ts">
import Header from './components/Header.vue'
import ProductList from './components/ProductList.vue'
import { ref, provide } from 'vue'

const notifications = ref(0)
const updateNotifications = (newCount: number) => {
  notifications.value = newCount
}

provide('notifications', notifications)
provide('updateNotifications', updateNotifications)
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
