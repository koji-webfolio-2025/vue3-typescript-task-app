import { defineStore } from 'pinia';
import api from '@/lib/axios';

interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    user: null as User | null,
    isLoggedIn: false,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const res = await api.post('/login', { email, password })
        this.token = res.data.token
        this.user = res.data.user
        this.isLoggedIn = true

        // axiosにBearerトークンを設定
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (e) {
        this.clearUser()
        throw e
      }
    },

    logout() {
      this.token = ''
      this.user = null
      this.isLoggedIn = false
      delete api.defaults.headers.common['Authorization']
    },

    setUser(user: User) {
      this.user = user
      this.isLoggedIn = true
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const res = await api.get('api/user')
        this.user = res.data
        this.isLoggedIn = true
      } catch (e) {
        this.clearUser()
      }
    },

    clearUser() {
      this.token = ''
      this.user = null
      this.isLoggedIn = false
      delete api.defaults.headers.common['Authorization']
    },
  },
  persist: true,
});
