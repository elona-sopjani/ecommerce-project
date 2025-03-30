import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ICheckout } from '../interfaces/ICheckout'
import type { ICart } from '../interfaces/ICart'
import { setLocalStorage, removeLocalStorage } from '../utils/helper'

export function useCheckout(cart: ICart[], emit: (event: 'empty-cart') => void) {
  const initialCheckoutData = {
    fullName: '',
    address: '',
    email: '',
    paymentType: 'Card',
    orderItems: [],
  }

  const checkoutData = ref<ICheckout>({ ...initialCheckoutData })
  const showCheckoutForm = ref(false)
  const loadingCheckout = ref(false)

  const errorMessage = ref('')

  const router = useRouter()

  const totalPrice = computed(() => {
    return parseFloat(cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))
  })

  const validateCheckout = () => {
    if (
      !checkoutData.value.fullName.trim() ||
      !checkoutData.value.address.trim() ||
      !checkoutData.value.email.trim() ||
      !checkoutData.value.paymentType
    ) {
      return 'Please fill in all fields before confirming your order.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutData.value.email)) {
      return 'Please enter a valid email address.'
    }
    return null
  }

  const handleCheckoutConfirmation = () => {
    if (!cart.length) return
    if (!showCheckoutForm.value) {
      showCheckoutForm.value = true
      return
    }

    const validationError = validateCheckout()
    if (validationError) {
      errorMessage.value = validationError
      return
    } else {
      errorMessage.value = ''
    }
    loadingCheckout.value = true
    const checkoutWithDate = {
      ...checkoutData.value,
      orderDate: new Date(),
      orderItems: cart,
      total: totalPrice.value,
    }

    const existingOrderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]')
    existingOrderHistory.unshift(checkoutWithDate)
    setLocalStorage('orderHistory', existingOrderHistory)
    removeLocalStorage('cart')
    //Added a setTimeout to give the simulation of a request happening in the background
    setTimeout(() => {
      showCheckoutForm.value = false
      emit('empty-cart')
      loadingCheckout.value = false
      router.push({ name: 'history' })
    }, 2000)
  }

  onMounted(() => {
    checkoutData.value = { ...initialCheckoutData }
    showCheckoutForm.value = false
  })

  return {
    checkoutData,
    showCheckoutForm,
    totalPrice,
    handleCheckoutConfirmation,
    errorMessage,
    loadingCheckout,
  }
}
