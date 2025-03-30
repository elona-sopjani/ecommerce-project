import { ref } from 'vue'

export function useFilterSort(
  emit: (event: 'update-categories' | 'update-sort', payload: any) => void,
) {
  const isSortDropdownOpen = ref(false)
  const isCategoryDropdownOpen = ref(false)

  const handleSortSelection = (sortOption: string) => {
    emit('update-sort', sortOption)
    isSortDropdownOpen.value = false
  }

  const handleCategorySelection = (category: string) => {
    emit('update-categories', category)
    isCategoryDropdownOpen.value = false
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
