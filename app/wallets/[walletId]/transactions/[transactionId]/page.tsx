import FooterWallet from '@/components/Footer/Wallet'
import TransactionUpdate from '@/components/Transaction/Update'
import { use } from 'react'

export default function TransactionCreatePage({
  params
}: {
  params: { walletId: string; transactionId: string }
}) {
  const { walletId, transactionId } = use(params)

  return (
    <>
      <TransactionUpdate walletId={walletId} transactionId={transactionId} />
      <FooterWallet walletId={walletId} />
    </>
  )
}
