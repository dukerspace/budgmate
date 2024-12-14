import api from '@/services/api'
import {
  ITransactionCreateDto,
  ITransactionUpdateDto,
  ITransactionViewDto
} from '@/types/transaction'
import { IResponseData, IResponsePaginate } from '@/utils/response'
import queryString from 'query-string'

export const createTransaction = async (walletId: string, data: ITransactionCreateDto) => {
  return await api.post(`/wallets/${walletId}/transactions`, data)
}

export const getTransactionByWalletId = async (
  walletId: string,
  date: string
): Promise<IResponsePaginate<ITransactionViewDto[]>> => {
  const params = {
    date: date
  }

  const query = queryString.stringify(params, {
    skipNull: true
  })
  const res = await api.get(`/wallets/${walletId}/transactions?${query}`)
  return res.data
}

export const getTransactionById = async (
  walletId: string,
  transactionId: string
): Promise<IResponseData<ITransactionViewDto>> => {
  const res = await api.get(`/wallets/${walletId}/transactions/${transactionId}`)
  return res.data
}

export const updateTransactionById = async (
  walletId: string,
  transactionId: string,
  data: ITransactionUpdateDto
) => {
  return await api.put(`/wallets/${walletId}/transactions/${transactionId}`, data)
}

export const deleteTransactionById = async (walletId: string, transactionId: string) => {
  return await api.delete(`/wallets/${walletId}/transactions/${transactionId}`)
}
