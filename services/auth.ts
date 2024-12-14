import api from '@/services/api'
import { Auth } from '@/types/user'

export const signIn = async (data: Auth) => {
  return await api.post(`/auth/signin`, data)
}
