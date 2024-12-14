'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserPen, WalletCards } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Head from 'next/head'
import Link from 'next/link'

const Header = () => {
  const session = useSession()
  const t = useTranslations()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="navbar bg-base-100 border-b border-gray-200 p-4">
        <div className="container mx-auto">
          <div className="flex">
            <div className="flex-1">
              <Link href={'/'} className="btn btn-ghost text-xl">
                Budgmate
              </Link>
            </div>

            <div className="flex-none">
              <DropdownMenu>
                {!session?.data?.user ? (
                  <Link href={'/auth/signin'}>{t('common.signIn')}</Link>
                ) : (
                  <>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage
                          alt="profile"
                          width={50}
                          height={50}
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <WalletCards />

                        <Link href={'/'}>Wallet</Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserPen />
                        <Link href={'/accounts/profile'}>{t('common.profile')}</Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Link href={'/accounts/settings'}>{t('common.settings')}</Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <button onClick={async () => await signOut()}>{t('common.signOut')}</button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </>
                )}
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
