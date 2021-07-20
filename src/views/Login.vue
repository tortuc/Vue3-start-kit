<template>
  <main>

    <h1>Log in</h1>

    <form
      class="form"
      @submit.prevent="login"
    >
      <label>
        Email
        <input
          type="email"
          v-model="user.email"
        >
      </label>

      <label>
        Password
        <input
          type="password"
          v-model="user.password"
        >
      </label>

      <label>
        Rememebr me
        <input
          type="checkbox"
          v-model="user.rememberMe"
        >
      </label>

      <button>Log in</button>
    </form>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useLogin from '@/components/login/login'

export default defineComponent({
  name: 'Login',
  setup() {
    const { user, login } = useLogin()

    return {
      user,
      login,
    }
  }
})
</script>
