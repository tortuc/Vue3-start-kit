import { ref, watch } from 'vue'


const AUTH_ITEM = 'isUserAuthenticated'
const isAuthenticated = ref(false)


const _updateAuthStateInLS = () => {
  localStorage.setItem(AUTH_ITEM, JSON.stringify(isAuthenticated.value))
}

const _loadAuthStateFromLS = () => {
  const ls = localStorage.getItem(AUTH_ITEM)

  if (ls && typeof JSON.parse(ls) === 'boolean') isAuthenticated.value = JSON.parse(ls)
  else _updateAuthStateInLS()
}

_loadAuthStateFromLS()
watch(isAuthenticated, _updateAuthStateInLS)


const reset = () => { isAuthenticated.value = false }


export default function useAuthStore() {
  return {
    isAuthenticated,
    reset
  }
}
