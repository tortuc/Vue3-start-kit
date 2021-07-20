import axios from 'axios'
import { computed } from 'vue'
import { QueryParams } from '@/models/api.model'
import useAuthStore from '@/store/auth'


const api = axios.create({
  baseURL: 'https://master.freelanceinfluence.xyz:8087',
  withCredentials: true
})

const auth = useAuthStore()

api.interceptors.response.use(
  (response) => { return response },
  (error) => {
    if (error?.response?.status === 403) auth.isAuthenticated.value = false
    return Promise.reject(error)
  }
)

const getBaseURL = computed(() => api.defaults.baseURL)

const paramsToQueryString = (params?: QueryParams) => {
  if (!params) return ''

  const queryArray: Array<string> = []
  for (const [k, v] of Object.entries(params)) {
    if (v) {
      if (Array.isArray(v)) {
        if (v.length) {
          Object.values(v).forEach((el) => {
            if (el.length) {
              queryArray.push(`${k}=${el}`)
            }
          })
        }
      } else {
        queryArray.push(`${k}=${v}`) 
      }
    }
  }

  if (!queryArray.length) return ''
  return `?${queryArray.join('&')}`
}


export default api
export {
  getBaseURL,
  paramsToQueryString
}
