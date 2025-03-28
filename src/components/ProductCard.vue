<!-- ProductCard.vue -->
<script setup lang="ts">
defineProps<{
  product: {
    id: number
    title: string
    description: string
    price: number
    image: string
  }
}>()
</script>

<template>
  <article class="product-card">
    <figure class="product-image">
      <img :src="product.image" :alt="product.title" />
    </figure>
    <div class="product-details">
      <h3 class="product-name" :title="product.title">{{ product.title }}</h3>
      <span class="product-price">${{ product.price }}</span>
    </div>
    <button class="btn add-to-cart">Add to Cart</button>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;

  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    width: 100%;
    height: 200px;
    min-height: 200px;

    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .product-details {
    padding: 1rem;
    text-align: center;

    .product-name {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 3.6rem;
    }

    .product-description {
      font-size: 1rem;
      color: #666;
      margin-bottom: 1rem;
    }

    .product-price {
      font-size: 1.1rem;
      font-weight: bold;
      color: #2e8b57;
    }
  }

  .btn.add-to-cart {
    width: 100%;
    padding: 0.8rem;
    background-color: #2e8b57;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;

    &:hover {
      background-color: #267d4b;
    }
  }
}
</style>
