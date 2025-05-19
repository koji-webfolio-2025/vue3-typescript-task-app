import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import axios from '@/lib/axios'
import Login from '@/components/Login.vue'
import Dashboard from '@/components/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// グローバルナビゲーションガード
router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // persist後、Axiosにトークンが未設定ならセット
  if (store.token && !axios.defaults.headers.common['Authorization']) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.token}`
  }

  // 認証が必要なページにアクセスしようとしている
  if (to.meta.requiresAuth && !store.token) {
    return next('/login')
  }

  if (to.path === '/login' && store.token) {
    return next('/')
  }

  return next()
})

export default router
