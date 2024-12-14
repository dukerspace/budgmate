import { IUserViewDto } from '@/types/user'

export interface IWalletViewDto {
  id: string
  user: IUserViewDto
  name: string
  total: number
}
