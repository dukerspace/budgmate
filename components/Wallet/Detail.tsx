'use client'

import { TopCategory } from '@/components/Category/TopCategory'
import FooterWallet from '@/components/Footer/Wallet'
import TransactionList from '@/components/Transaction/TransactionList'
import { ITransactionViewDto } from '@/types/transaction'

type Props = {
  walletId: string
  transactions: ITransactionViewDto[]
}

const WalletDetail: React.FC<Props> = ({ walletId, transactions }) => {
  return (
    <>
      <div>
        <TopCategory walletId={walletId} />
        <TransactionList walletId={walletId} data={transactions} />
      </div>
      <FooterWallet walletId={walletId} />
    </>
  )
}

export default WalletDetail
