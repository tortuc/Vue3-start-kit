import api from '@/services/api'
import useUserStore from '@/store/user'
import useAuthStore from '@/store/auth'
import { UserResponseWithJWT, UserToLogin } from '@/models/user.model'


const { setMyProfile } = useUserStore()
const auth = useAuthStore()

const login = async (user: UserToLogin) => {
  return await api.post<UserResponseWithJWT>('users/auth', user)
  .then((response) => {
    auth.isAuthenticated.value = true
    setMyProfile(response.data.user)
    return response
  })
}

const logout = async () => {
  return await api.post<{}>('users/auth/logout')
  .finally(() => { auth.reset() })
}

export default function useUserAuthentificationController() {
  return {
    login,
    logout
  }
}
