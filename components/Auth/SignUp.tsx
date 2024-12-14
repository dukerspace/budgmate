'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateUser } from '@/hooks/useUser'
import { CreateUserError, CreateUserSchema } from '@/schema/user'
import { IUserCreateDto } from '@/types/user'
import { IErrorDto } from '@/utils/response'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function SignUp() {
  const t = useTranslations()
  const router = useRouter()
  const createUser = useCreateUser()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IUserCreateDto>({
    resolver: zodResolver(CreateUserSchema)
  })

  const onSubmit = async (data: IUserCreateDto) => {
    createUser.mutate(data, {
      onError: (error) => {
        const axiosError = error as AxiosError
        const res = axiosError?.response?.data as IErrorDto
        const err = res.error as unknown as CreateUserError

        if (err?.username) {
          setError('username', {
            type: 'manual',
            message: err?.username
          })
        }

        if (err?.email) {
          setError('email', {
            type: 'manual',
            message: err?.email
          })
        }
      },
      onSuccess: () => {
        return router.push('/auth/signin')
      }
    })
  }

  return (
    <div className="container mx-auto max-w-96">
      <div>
        <p className="text-lg text-center">{t('common.signUp')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Input
              type="text"
              placeholder={t('common.username')}
              className={`input input-bordered w-full ${errors.username ? 'input-error' : null}`}
              {...register('username')}
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder={t('common.email')}
              className={`input input-bordered w-full ${errors.email ? 'input-error' : null}`}
              {...register('email')}
            />
          </div>

          <div>
            <Input
              className={`input input-bordered w-full ${errors.password ? 'input-error' : null}`}
              type="password"
              placeholder={t('common.password')}
              {...register('password')}
            />
          </div>

          <div>
            <Input
              className={`input input-bordered w-full ${
                errors.confirmPassword ? 'input-error' : null
              }`}
              type="password"
              placeholder={t('common.confirmPassword')}
              {...register('confirmPassword')}
            />
          </div>

          <div>
            <Button type="submit" className="w-full btn btn-primary">
              {t('common.signUp')}
            </Button>
          </div>
        </div>
      </form>

      <div className="text-center pt-4">
        <Link href={'/auth/signin'}>{t('common.signIn')}</Link>
      </div>
    </div>
  )
}
