import { getAllCategory } from '@/services/category'
import { ICategoryViewDto } from '@/types/category'
import { IResponsePaginate } from '@/utils/response'
import { useQuery } from '@tanstack/react-query'

export const useGetAllCategory = () => {
  return useQuery<IResponsePaginate<ICategoryViewDto[]>>({
    queryKey: ['categories'],
    queryFn: () => getAllCategory()
  })
}
