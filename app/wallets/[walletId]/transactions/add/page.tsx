import FooterWallet from '@/components/Footer/Wallet'
import TransactionCreate from '@/components/Transaction/Add'
import { use } from 'react'

export default function TransactionCreatePage({ params }: { params: { walletId: string } }) {
  const { walletId } = use(params)

  return (
    <>
      <TransactionCreate walletId={walletId} />
      <FooterWallet walletId={walletId} />
    </>
  )
}
