import useAuthStore from '@/store/auth'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth: false,
      requiresUnauth: true
    }
  },
  {
    path: '/tasks-search',
    name: 'TasksSearch',
    component: () => import('@/views/TasksSearch.vue'),
    meta: {
      requiresAuth: true,
      requiresUnauth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const { isAuthenticated } = useAuthStore()

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !to.meta.requiresUnauth) {
    if (!isAuthenticated.value) {
      next({ name: 'Login' })
      return
    }
  }

  if (to.meta.requiresUnauth && !to.meta.requiresAuth) {
    if (!isAuthenticated.value) next()
    else next({ name: 'TasksSearch'})
    return
  }

  next()
})

export default router
