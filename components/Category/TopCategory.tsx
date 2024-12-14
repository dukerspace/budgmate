import { useWalletTopCategory } from '@/hooks/useWallet'
import * as IconCate from 'lucide-react'

type Props = {
  walletId: string
}

export const TopCategory: React.FC<Props> = ({ walletId }) => {
  const { data: categories } = useWalletTopCategory(walletId)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Category</h2>
      <div className="grid grid-cols-4 gap-4">
        {categories?.data?.map((category) => {
          const Icon = IconCate[category.icon] as React.ElementType
          return (
            <button
              key={category.id}
              className="flex flex-col items-center p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-sm">{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
