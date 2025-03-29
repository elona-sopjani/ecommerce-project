<script setup lang="ts">
import { onMounted, ref } from 'vue'
import OrderCard from './OrderCard.vue'

const orderHistory = ref([])

onMounted(() => {
  const storedOrders = localStorage.getItem('orderHistory')
  orderHistory.value = storedOrders ? JSON.parse(storedOrders) : []
})
</script>

<template>
  <section class="orders-wrapper">
    <h1>Your purchase history</h1>
    <OrderCard v-for="(order, i) in orderHistory" :order="order" :key="i" />
  </section>
</template>

<style scoped lang="scss">
.orders-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
</style>
