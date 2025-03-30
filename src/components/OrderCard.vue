<script setup lang="ts">
import { computed } from 'vue'
import { type IOrder } from '../interfaces/IOrder'
import CartCard from './CartCard.vue'

const props = defineProps<{
  order: IOrder
}>()

const formattedDate = computed(() => {
  const date = new Date(props.order.orderDate)

  if (isNaN(date.getTime())) {
    return 'Date unavailable'
  }

  const options: Intl.DateTimeFormatOptions = {
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
  width: 100%;
  display: flex;
  flex-direction: column;
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
    width: auto;
    max-height: 350px;
    overflow-y: auto;
    .remove-button {
      display: none;
    }
  }
}
@media (min-width: 768px) {
  .order-card {
    flex-direction: row;
    width: 700px;
    .order-items {
      width: 400px;
      max-height: 250px;
    }
  }
}
</style>
