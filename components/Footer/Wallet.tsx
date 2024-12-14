'use client'

import { Calculator, ChartColumnDecreasing, CirclePlus, House, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  walletId: string
}

const FooterWallet: React.FC<Props> = ({ walletId }) => {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-center p-4">
        <div className="p-2">
          <button onClick={() => router.push('/')}>
            <div className="flex justify-center items-center">
              <House />
            </div>
            <p>Dashboard</p>
          </button>
        </div>

        <div className="p-2">
          <button
            // variant="outline"
            // size="icon"
            className="rounded-full"
            onClick={() => router.push(`/wallets/${walletId}`)}
          >
            <div className="flex justify-center items-center">
              <Calculator />
            </div>
            <div className="text-center">Transaction</div>
            {/* <CalcIcon className="h-5 w-5" /> */}
          </button>
        </div>

        <div className="p-2">
          <button
            // variant="outline"
            // size="icon"
            className="rounded-full"
            onClick={() => router.push(`/wallets/${walletId}/transactions/add`)}
          >
            <div className="flex justify-center items-center">
              <CirclePlus />
            </div>
          </button>
        </div>

        <div className="p-2">
          <div className="flex justify-center items-center">
            <ChartColumnDecreasing />
          </div>
          <div className="text-center">Overview</div>
        </div>

        <div className="p-2">
          <div className="flex justify-center items-center">
            <Settings />
          </div>
          <div className="text-center">setting</div>
        </div>
      </div>
    </div>
  )
}

export default FooterWallet
