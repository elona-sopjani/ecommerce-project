<script setup lang="ts">
import { inject } from 'vue'
defineProps<{
  product: {
    id: number
    title: string
    description: string
    price: number
    image: string
    quantity: number
  }
}>()

const removeFromCart = inject<(id: number) => void>('removeFromCart')
</script>

<template>
  <div class="cart-card">
    <img :src="product.image" alt="Product Image" class="product-image" />
    <div class="cart-card-details">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-price">${{ product.price }}</p>
      <div class="quantity">
        <span class="quantity-count">Quantity: {{ product.quantity }}</span>
      </div>
    </div>
    <div class="remove-button" @click="removeFromCart(product.id)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="14px"
        height="14px"
        fill="#f44336"
      >
        <path
          d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.cart-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px;
  transition: all 0.3s ease-in-out;

  .product-image {
    width: 40px;
    height: 40px;
    min-width: 40px;
    object-fit: contain;
    border-radius: 8px;
    flex: 0 0 auto;
  }

  .cart-card-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    flex-grow: 1;
    overflow: hidden;
  }

  .product-title {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .product-price {
    font-size: 12px;
    font-weight: 600;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .quantity-count {
      font-size: 12px;
    }
  }

  .remove-button {
    height: 100%;
    border: none;
    cursor: pointer;
    padding: 8px;
    background: unset;
    flex: 0 0 auto;

    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover {
    .remove-button {
      opacity: 1;
    }
  }
}

@media (max-width: 768px) {
  .cart-card {
    padding: 1rem;
    max-width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .product-title {
    font-size: 1rem;
  }

  .product-price {
    font-size: 0.9rem;
  }

  .quantity {
    .decrease,
    .increase {
      font-size: 1.2rem;
    }

    .quantity-count {
      font-size: 1rem;
    }
  }

  .remove-button {
  }
}

/* Desktop */
@media (min-width: 768px) {
  .cart-card {
    padding: 1rem;
    max-width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .product-title {
    font-size: 1.2rem;
  }

  .product-price {
    font-size: 1rem;
  }

  .quantity {
    .decrease,
    .increase {
      font-size: 1.4rem;
    }

    .quantity-count {
      font-size: 1.3rem;
    }
  }

  .remove-button {
  }
}
</style>
