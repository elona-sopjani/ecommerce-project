import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import OrderHistory from './components/OrderHistory.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductList,
  },
  {
    path: '/history',
    name: 'history',
    component: OrderHistory,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
