import { getTopCategory, getWalletById, getWallets } from '@/services/wallet'
import { ICategoryViewDto } from '@/types/category'
import { IWalletViewDto } from '@/types/wallet'
import { IResponseData, IResponsePaginate } from '@/utils/response'
import { useQuery } from '@tanstack/react-query'

export const useWallets = (page: number, limit: number) => {
  return useQuery<IResponsePaginate<IWalletViewDto[]>>({
    queryKey: ['getWallets', page, limit],
    queryFn: () => getWallets(page, limit)
  })
}

export const useWalletById = (walletId: string) => {
  return useQuery({
    queryKey: ['getWalletById', walletId],
    queryFn: () => getWalletById(walletId)
  })
}

export const useWalletTopCategory = (walletId: string) => {
  return useQuery<IResponseData<ICategoryViewDto[]>>({
    queryKey: ['getTopCategory', walletId],
    queryFn: () => getTopCategory(walletId)
  })
}
