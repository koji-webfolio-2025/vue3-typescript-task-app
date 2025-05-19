<template>
  <header class="header">
    <h1>勤怠管理アプリ</h1>
    <div v-if="userStore.isLoggedIn">
      <span>{{ userStore.user?.name }}</span>
      <button @click="logout">ログアウト</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.header {
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

button {
  margin-left: 1rem;
}
</style>
