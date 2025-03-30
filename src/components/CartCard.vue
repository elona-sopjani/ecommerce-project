<script lang="ts" setup>
import { inject } from 'vue'
import { type ICart } from '../interfaces/ICart'
import TrashIcon from '../components/icons/IconTrash.vue'
defineProps<{
  product: ICart
}>()

const removeFromCart =
  inject<(id: number) => void>('removeFromCart') ||
  (() => {
    console.error('removeFromCart is not available!')
    return
  })
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
      <TrashIcon />
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
    gap: 1rem;
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
    opacity: 1 !important;
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
}
</style>
