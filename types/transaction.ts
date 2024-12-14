import { ICategoryViewDto } from '@/types/category'
import { IWalletViewDto } from '@/types/wallet'

export interface ITransactionCreateDto {
  type: string | null
  categoryId: string | null
  date: Date
  amount: number
  note?: string | null
}

export interface ITransactionViewDto {
  id: string
  wallet: IWalletViewDto
  type: string
  category: ICategoryViewDto
  date: Date
  amount: number
  note?: string
}

export interface ITransactionUpdateDto {
  type: string
  categoryId: string
  date: Date
  amount: number
  note?: string | null
}
