<template>
  <Header />
  <router-view />
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

const userStore = useUserStore();

onMounted(async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
      withCredentials: true,
    });
    if (res.data && res.data.user) {
      userStore.setUser({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    } else {
      userStore.clearUser();
    }
  } catch (e) {
    userStore.clearUser();
  }
});
</script>
