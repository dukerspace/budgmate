import api from '@/services/api'
import { IWalletViewDto } from '@/types/wallet'
import { IResponseData, IResponsePaginate } from '@/utils/response'
import queryString from 'query-string'

export const getWallets = async (
  page: number,
  limit: number
): Promise<IResponsePaginate<IWalletViewDto[]>> => {
  const params = {
    page: page,
    limit: limit
  }

  const query = queryString.stringify(params, {
    skipNull: true
  })
  const res = await api.get(`/wallets?${query}`)
  return res.data
}

export const getWalletById = async (walletId: string): Promise<IResponseData<IWalletViewDto>> => {
  const res = await api.get(`/wallets/${walletId}`)
  return res.data
}

export const getTopCategory = async (walletId: string) => {
  const res = await api.get(`/wallets/${walletId}/categories/top`)
  return res.data
}
