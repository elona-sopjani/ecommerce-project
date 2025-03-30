import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { type IProduct } from '../interfaces/IProduct'

export function useProductList() {
  const products = ref<IProduct[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedCategories = ref<string[]>([])
  const selectedSortOption = ref<string | null>(null)

  const route = useRoute()

  const matchesQuery = (product: IProduct, query: string) =>
    product.title.toLowerCase().includes(query) ||
    product.category?.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)

  const searchQuery = computed(
    () => (route.query.searchQuery as string)?.trim().toLowerCase() || '',
  )
  const filteredProducts = computed(() => {
    let result: IProduct[] = [...products.value]

    if (searchQuery.value) {
      result = result.filter((product) => matchesQuery(product, searchQuery.value))
      categories.value = [...new Set(result.map((product) => product.category))]
    }

    if (selectedCategories.value.length > 0) {
      result = result.filter((product) => selectedCategories.value.includes(product.category))
    }

    if (selectedSortOption.value === 'Low to High') {
      result.sort((a: { price: number }, b: { price: number }) => a.price - b.price)
    } else if (selectedSortOption.value === 'High to Low') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  })

  const updateCategory = (categories: string[]) => {
    selectedCategories.value = categories
  }

  const updateSort = (sortOption: string) => {
    selectedSortOption.value = sortOption
  }

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      // Using mock data request to simulate a real API response
      const response = await fetch('https://fakestoreapi.com/products?limit=10')
      if (!response.ok) throw new Error('Failed to fetch data')
      products.value = await response.json()
    } catch (err) {
      error.value = (err as Error).message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProducts)

  return {
    products,
    categories,
    loading,
    error,
    selectedCategories,
    selectedSortOption,
    filteredProducts,
    updateCategory,
    updateSort,
  }
}
