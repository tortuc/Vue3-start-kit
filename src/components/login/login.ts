import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import useLoginValidation from './login-validation'
import useUserAuthentificationController from '@/middleware/controllers/useUserAuthentificationController'
import { UserToLogin } from '@/models/user.model'


export default function useLogin() {
  const validation = useLoginValidation()
  const auth = useUserAuthentificationController()
  const router = useRouter()

  const user = reactive<UserToLogin>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const clear = () => {
    user.email = ''
    user.password = ''
    user.rememberMe = false
  }

  const login = () => {
    if(validation.validate(user)) {
      auth.login(user)
      .then(() => { router.push('/tasks-search') })
      .catch(() => { clear() })

      return
    }
  }

  return {
    user,
    login,
    clear
  }
}
