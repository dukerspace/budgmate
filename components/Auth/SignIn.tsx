'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password'
import { AuthSchema } from '@/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ErrorAlert from '../Alert/ErrorAlert'

export default function SignIn() {
  const t = useTranslations()
  const router = useRouter()
  const [error, setError] = useState<string>()

  interface FormData {
    username: string
    password: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(AuthSchema)
  })

  const onSubmit = async (data: FormData) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password
    })

    if (result?.error) {
      setError('Username or password not match.')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4 m-4 rounded-md">
      <div>
        <p className="text-lg text-center">{t('common.signIn')}</p>
      </div>

      <div>
        <ErrorAlert message={error || ''} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Input
              type="text"
              placeholder={t('common.username')}
              className={`dark:border-slate-600  w-full ${
                errors.username ? 'border-rose-500' : null
              }`}
              {...register('username')}
            />
          </div>

          <div>
            <PasswordInput
              placeholder={t('common.password')}
              className={`dark:border-slate-600  w-full ${
                errors.password ? 'border-rose-500' : null
              }`}
              {...register('password')}
            />
          </div>

          <div>
            <Button className="w-full btn btn-primary">{t('common.signIn')}</Button>
          </div>
        </div>
      </form>

      <div className="text-center pt-4">
        <Link href={'/auth/signup'}>{t('common.signUp')}</Link>
      </div>
    </div>
  )
}
