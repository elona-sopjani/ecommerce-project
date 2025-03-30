import { ref, computed, type Ref } from 'vue'

export function useFilterSort(
  selectedCategories: Ref<string[]>,
  selectedSortOption: Ref<string | null>,
  emit: (event: 'update-categories' | 'update-sort', payload: any) => void,
) {
  const isSortDropdownOpen = ref(false)
  const isCategoryDropdownOpen = ref(false)

  const handleSortSelection = (sortOption: string) => {
    emit('update-sort', sortOption)
    isSortDropdownOpen.value = false
  }

  const handleCategorySelection = (category: string) => {
    let updatedCategories = [...selectedCategories.value]
    if (!updatedCategories.includes(category)) {
      updatedCategories.push(category)
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== category)
    }
    emit('update-categories', updatedCategories)
  }

  const toggleSortDropdown = () => {
    isSortDropdownOpen.value = !isSortDropdownOpen.value
    if (isCategoryDropdownOpen.value) {
      isCategoryDropdownOpen.value = false
    }
  }

  const toggleCategoryDropdown = () => {
    isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value
    if (isSortDropdownOpen.value) {
      isSortDropdownOpen.value = false
    }
  }
  return {
    isSortDropdownOpen,
    isCategoryDropdownOpen,
    toggleSortDropdown,
    toggleCategoryDropdown,
    handleSortSelection,
    handleCategorySelection,
  }
}
