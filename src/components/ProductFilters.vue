<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { useFilterSort } from '../composables/useFilterSort'

defineProps<{
  categories: string[]
  selectedCategories: string[]
  selectedSortOption: string | null
}>()

const emit = defineEmits(['update-categories', 'update-sort'])

const {
  isSortDropdownOpen,
  isCategoryDropdownOpen,
  toggleSortDropdown,
  toggleCategoryDropdown,
  handleSortSelection,
  handleCategorySelection,
} = useFilterSort(emit)
</script>

<template>
  <div class="filter-sort-buttons">
    <div class="dropdown">
      <button class="btn sort-button" @click="toggleSortDropdown">Sort by Price</button>
      <div v-if="isSortDropdownOpen" class="dropdown-content">
        <button
          @click="handleSortSelection('Low to High')"
          :class="{ 'selected-option': selectedSortOption === 'Low to High' }"
        >
          Low to High
        </button>
        <button
          @click="handleSortSelection('High to Low')"
          :class="{ 'selected-option': selectedSortOption === 'High to Low' }"
        >
          High to Low
        </button>
      </div>
    </div>

    <div class="dropdown">
      <button class="btn filter-button" @click="toggleCategoryDropdown">Filter by Category</button>
      <div v-if="isCategoryDropdownOpen" class="dropdown-content">
        <button
          v-for="category in categories"
          :key="category"
          @click="handleCategorySelection(category)"
          :class="{ 'selected-option': selectedCategories.includes(category) }"
        >
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-sort-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 16px;

  .btn {
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: #ffffff;

    padding: 0.6rem 1rem;
    font-size: 12px;

    font-weight: 500;
    border-radius: 3px;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
    width: 100%;
    text-align: center;
  }

  .sort-button {
    &:hover {
      transform: translateY(-2px);
    }
  }

  .filter-button {
    &:hover {
      transform: translateY(-2px);
    }
  }

  .dropdown {
    position: relative;
    width: 100%;

    .dropdown-content {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      z-index: 1;

      button {
        padding: 0.6rem 1rem;
        border: none;
        background: none;
        color: #333;
        text-align: left;
        cursor: pointer;
        font-size: 0.875rem;

        &:hover {
          background-color: #f1f1f1;
        }
      }
      .selected-option {
        font-weight: 600;
      }
    }
  }
}

@media (min-width: 768px) {
  .filter-sort-buttons {
    justify-content: flex-end;
    gap: 16px;
    .btn {
      font-size: 0.875rem;
    }

    .dropdown {
      width: auto;
    }
  }
}
</style>
