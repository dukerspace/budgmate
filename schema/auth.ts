import * as z from 'zod'

export const AuthSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

export type AuthError = z.infer<typeof AuthSchema>
