'use client'

import WalletDetail from '@/components/Wallet/Detail'
import { useGetTransactionByWalletId } from '@/hooks/useTransaction'
import dayjs from 'dayjs'
import { use } from 'react'

export default function WalletIdPage({ params }: { params: { walletId: string } }) {
  const formattedDate = dayjs().format('YYYY-MM')

  const { walletId } = use(params)
  const { data: transactions } = useGetTransactionByWalletId(walletId, formattedDate)

  return (
    <div className="min-h-screen bg-gray-50">
      {transactions && transactions && (
        <WalletDetail walletId={walletId} transactions={transactions.data} />
      )}
    </div>
  )
}
