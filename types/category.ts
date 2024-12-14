export interface ICategoryViewDto {
  id: string
  name: string
  type: string
  icon: React.ComponentType
  seq: number
}

export interface ICreateCategoryDto {
  name: string
  type: string
  icon: string
  seq: number
}
