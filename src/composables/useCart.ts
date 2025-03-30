import { ref, watch, provide, inject, type Ref } from 'vue'
import { getLocalStorage, setLocalStorage } from '../utils/helper'
import type { ICart } from '../interfaces/ICart'
import type { IProduct } from '@/interfaces/IProduct'

export function useCart() {
  const showSidebar = ref(false)
  const cart = ref<ICart[]>(getLocalStorage('cart', []))

  const notifications = inject('notifications') as Ref<number>
  const updateNotifications = inject('updateNotifications') as (newCount: number) => void

  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
  }

  const handleEmptyCart = () => {
    showSidebar.value = false
    cart.value = []
    setLocalStorage('cart', [])
  }
  const addSuccessMessage = ref('')
  const addToCart = (product: IProduct) => {
    cart.value = getLocalStorage('cart', [])
    const existingItem = cart.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    }
    addSuccessMessage.value = `Your product  has been successfully added ${existingItem ? `(${existingItem.quantity})` : ''}`
    setTimeout(() => {
      addSuccessMessage.value = ''
    }, 2000)

    if (notifications && updateNotifications) {
      updateNotifications(notifications.value + 1)
    }

    setLocalStorage('cart', cart.value)
  }

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((p) => p.id !== productId)
    setLocalStorage('cart', cart.value)
  }

  watch(showSidebar, (newValue) => {
    if (newValue) {
      updateNotifications(0)
      cart.value = getLocalStorage('cart', [])
    }
  })

  provide('removeFromCart', removeFromCart)

  return {
    cart,
    showSidebar,
    toggleSidebar,
    handleEmptyCart,
    removeFromCart,
    notifications,
    addToCart,
    addSuccessMessage,
  }
}
