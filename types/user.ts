export interface IUserCreateDto {
  username: string
  password: string
  confirmPassword: string
  email: string
}

export type Auth = {
  username: string
  password: string
}

export interface IUserViewDto {
  id: string
  username: string
  email: string
}
