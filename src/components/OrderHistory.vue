<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getLocalStorage } from '../utils/helper'
import OrderCard from './OrderCard.vue'

const orderHistory = ref([])

onMounted(() => {
  orderHistory.value = getLocalStorage('orderHistory', [])
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="order-layout">
    <h1>Your purchase history</h1>
    <section class="orders-wrapper" v-if="orderHistory.length > 0">
      <OrderCard v-for="(order, i) in orderHistory" :order="order" :key="i" />
    </section>
    <div class="no-orders" v-else>
      <p class="no-orders-message">You have not placed any orders.</p>
    </div>
  </div>
</template>

<style lang="scss">
.order-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  h1 {
    font-size: 24px;
  }
  .no-orders {
    display: flex;
    justify-content: center;
    align-items: center;

    .no-orders-message {
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
  .orders-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
}
</style>
