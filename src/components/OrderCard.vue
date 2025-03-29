<script setup lang="ts">
import CartCard from './CartCard.vue'
import { computed } from 'vue'
const props = defineProps<{
  order: {
    orderDate: string
    total: number
    paymentType: string
    orderItems: {
      id: number
      title: string
      price: number
      image: string
      quantity: number
    }[]
  }
}>()
const formattedDate = computed(() => {
  const date = new Date(props.order.orderDate)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return date.toLocaleString('en-US', options)
})
</script>

<template>
  <div class="order-card">
    <div class="order-details">
      <p>Date: {{ formattedDate }}</p>
      <p>TOTAL: ${{ order.total }}</p>
      <p>Payment type: {{ order.paymentType }}</p>
    </div>
    <div class="order-items">
      <CartCard v-for="item in order.orderItems" :product="item" :key="item.id" />
    </div>
  </div>
</template>

<style lang="scss">
.order-card {
  width: 700px;
  display: flex;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 16px;
  gap: 16px;
  border-radius: 6px;
  background-color: white;
  .order-details {
    padding-bottom: 12px;
    margin-bottom: 12px;
    flex-grow: 1;
    h2 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 4px;
    }

    p {
      margin: 4px 0;
      font-size: 0.95rem;
      color: #555;
    }

    .order-total {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
    }
  }

  .order-items {
    width: 400px;
    max-height: 250px;
    overflow-y: auto;
    .remove-button {
      display: none;
    }
  }
}
</style>
