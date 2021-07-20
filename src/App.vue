<template>
  <nav>
    <button
      v-if="isAuthenticated"
      @click="logout"
    >Logout</button>
  </nav>

  <router-view/>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from './store/auth'
import useUserAuthentificationController from './middleware/controllers/useUserAuthentificationController'

export default defineComponent({
  name: 'App',
  setup() {
    const { logout } = useUserAuthentificationController()

    const { isAuthenticated } = useAuthStore()
    const router = useRouter()

    if (!isAuthenticated.value && router.currentRoute.value.meta?.requiresAuth) {
      router.push('/')
    }

    watch(isAuthenticated, (c) => {
      if (!c) router.push('/')
    })

    return {
      logout,
      isAuthenticated
    }
  },
})
</script>


<style lang="scss">
@import '@/assets/styles/reset';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
