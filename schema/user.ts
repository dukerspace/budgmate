import * as z from 'zod'

export const CreateUserSchema = z
  .object({
    username: z.string().nonempty({ message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password must be at least 6 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type CreateUserError = z.infer<typeof CreateUserSchema>
