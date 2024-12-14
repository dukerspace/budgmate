import {
  createTransaction,
  deleteTransactionById,
  getTransactionById,
  getTransactionByWalletId,
  updateTransactionById
} from '@/services/transaction'
import {
  ITransactionCreateDto,
  ITransactionUpdateDto,
  ITransactionViewDto
} from '@/types/transaction'
import { IResponseData, IResponsePaginate } from '@/utils/response'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: ({ walletId, data }: { walletId: string; data: ITransactionCreateDto }) =>
      createTransaction(walletId, data)
  })
}

export const useGetTransactionByWalletId = (walletId: string, date: string) => {
  return useQuery<IResponsePaginate<ITransactionViewDto[]>>({
    queryKey: ['getTransactionByWalletId', walletId, date],
    queryFn: () => getTransactionByWalletId(walletId, date)
  })
}

export const useGetTransactionById = (walletId: string, transactionId: string) => {
  return useQuery<IResponseData<ITransactionViewDto>>({
    queryKey: ['getTransactionById', walletId, transactionId],
    queryFn: () => getTransactionById(walletId, transactionId)
  })
}

export const useUpdateTransaction = () => {
  return useMutation({
    mutationFn: ({
      walletId,
      transactionId,
      data
    }: {
      walletId: string
      transactionId: string
      data: ITransactionUpdateDto
    }) => updateTransactionById(walletId, transactionId, data)
  })
}

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: ({ walletId, transactionId }: { walletId: string; transactionId: string }) =>
      deleteTransactionById(walletId, transactionId)
  })
}
