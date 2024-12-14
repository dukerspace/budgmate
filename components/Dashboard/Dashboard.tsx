'use client'

import WalletCard from '@/components/Wallet/WalletCard'
import { useWallets } from '@/hooks/useWallet'
import { IWalletViewDto } from '@/types/wallet'
import { AuthStatus } from '@/utils/constant'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { status } = useSession()
  const page = 1
  const limit = 10

  const { data: wallets } = useWallets(page, limit)

  return (
    <>
      {status === AuthStatus.authen ? (
        wallets?.data?.map((wallet: IWalletViewDto, i: number) => {
          return (
            <p key={i}>
              <WalletCard data={wallet} />
            </p>
          )
        })
      ) : (
        <>welcome</>
      )}
    </>
  )
}
