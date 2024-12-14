import * as z from 'zod'

export const CreateTransactionSchema = z.object({
  categoryId: z.string(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' })
    .transform((val) => new Date(val)),
  type: z.string({ message: 'Confirm Password must be at least 6 characters' }),
  amount: z.number({ message: 'Invalid email address' })
})

export type CreateTransactionError = z.infer<typeof CreateTransactionSchema>
