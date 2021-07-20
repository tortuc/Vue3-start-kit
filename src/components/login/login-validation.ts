import { UserToLogin } from '@/models/user.model'


export default function useLoginValidation() {
  const validate = (user: UserToLogin) => user.password && user.email

  return { validate }
}
