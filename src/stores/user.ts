import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    isLoggedIn: false,
  }),
  actions: {
    setUser(user: { name: string; email: string }) {
    this.name = user.name;
    this.email = user.email;
    this.isLoggedIn = true;
    },
    clearUser() {
    this.name = '';
    this.email = '';
    this.isLoggedIn = false;
    },
  },
  persist: true,
});
