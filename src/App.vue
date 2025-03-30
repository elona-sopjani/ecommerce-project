<script setup lang="ts">
import Header from './components/Header.vue'
import { ref, provide } from 'vue'

const notifications = ref(0)

const updateNotifications = (newCount: number): void => {
  notifications.value = newCount
}

provide('notifications', notifications)
provide('updateNotifications', updateNotifications)
</script>

<template>
  <Header />
  <main class="main-container">
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
.main-container {
  padding: 1rem;
  max-width: 1200px;
  margin: auto;
  margin-top: 68px;
}
</style>
