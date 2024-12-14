// components/FullPageModal.tsx

import Calculator from '@/components/Calculator/Calculator'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { CreateTransaction } from '@/types/transaction'
import React from 'react'

type Props = {
  data: CreateTransaction
  isOpen: boolean
  onOpen: (status: boolean) => void
  onSetAmount: (amount: number) => void
}

const TransactionCalculator: React.FC<Props> = ({ data, onSetAmount, isOpen, onOpen }) => {
  const handleSubmit = () => {
    onOpen(!isOpen)
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpen}>
        <DrawerTrigger className="w-full">
          <div
            className="p-4 bg-gray-100 rounded-xl shadow-sm mt-4 mb-4"
            onClick={() => onOpen(true)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                {data?.amount}
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="inset-0  bg-gray-100">
          <div className="mx-auto w-full">
            <div className="p-4 pb-0">
              <Calculator handleSubmit={handleSubmit} data={data} onSetAmount={onSetAmount} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default TransactionCalculator
