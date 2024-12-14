import { ITransactionViewDto } from '@/types/transaction'
import { CategoryType } from '@/utils/constant'
import dayjs from 'dayjs'
import * as IconCate from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  walletId: string
  data: ITransactionViewDto[]
}

const TransactionList: React.FC<Props> = ({ walletId, data }) => {
  const router = useRouter()

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {data.map((transaction: ITransactionViewDto) => {
          const Icon = IconCate[transaction.category.icon] as React.ElementType

          return (
            <div
              onClick={() => router.push(`/wallets/${walletId}/transactions/${transaction.id}`)}
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium">{transaction?.category?.name}</div>
                  <div className="text-sm text-gray-500">
                    {dayjs(transaction?.date).format('DD MMM YYYY')}
                  </div>
                </div>
              </div>
              <div
                className={`font-semibold ${
                  transaction.type == CategoryType.EXPENSE ? 'text-expense' : 'text-income'
                }`}
              >
                {transaction.type == CategoryType.EXPENSE && '-'}$
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionList
