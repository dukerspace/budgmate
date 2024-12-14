import api from '@/services/api'

export const getAllCategory = async () => {
  const res = await api.get(`/categories`)
  return res.data
}
