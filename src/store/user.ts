import { Ref, ref } from 'vue'
import { UserPublicInfo } from '@/models/user.model'


const myProfile: Ref<UserPublicInfo | null> = ref(null) 


export default function useUserStore() {
  const setMyProfile = (data: UserPublicInfo | null) => { myProfile.value = data }

  const reset = () => { setMyProfile(null) }

  return {
    setMyProfile,
    reset
  }
}
