<template>
  <Header />
  <router-view />
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import api from '@/lib/axios';

const userStore = useUserStore();

onMounted(async () => {
  try {
    const res = await api.get(`api/user`);
    if (res.data && res.data.user) {
      userStore.setUser({
        id: res.data.user.id,
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
