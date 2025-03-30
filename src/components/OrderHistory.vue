<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getLocalStorage } from '../utils/helper'
import OrderCard from './OrderCard.vue'

const orderHistory = ref([])

onMounted(() => {
  orderHistory.value = getLocalStorage('orderHistory', [])
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
