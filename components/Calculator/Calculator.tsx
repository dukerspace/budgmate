import { Button } from '@/components/ui/button'
import { useCalculator } from '@/hooks/useCalculator'
import { CreateTransaction } from '@/types/transaction'
import { Delete } from 'lucide-react'
import React from 'react'

type Props = {
  data: CreateTransaction
  onSetAmount: (value: number) => void
  handleSubmit: () => void
  // data: CreateTransaction
}

const Calculator: React.FC<Props> = ({ handleSubmit, data, onSetAmount }) => {
  const { display, summary, handleNumber, handleOperation, handleOk, handleClear } = useCalculator({
    initialDisplay: data?.amount || 0
  })

  const handleDone = () => {
    handleOk()
    handleSubmit()
    onSetAmount(Number(display))
  }

  const handleDelete = () => {
    handleClear()
  }

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-t-3xl shadow-lg">
      <div className="mb-6">
        <div className="flex flex-col items-end gap-2">
          <div className="text-xl font-light text-gray-500 font-mono tracking-tight">
            $
            {Number(display).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>

          <div>{summary}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button onClick={() => handleNumber('7')} variant={'number'} size={'cal'}>
          7
        </Button>
        <Button onClick={() => handleNumber('8')} variant={'number'} size={'cal'}>
          8
        </Button>
        <Button onClick={() => handleNumber('9')} variant={'number'} size={'cal'}>
          9
        </Button>
        <Button onClick={() => handleOperation('+')} variant={'operation'} size={'cal'}>
          +
        </Button>

        <Button onClick={() => handleNumber('4')} variant={'number'} size={'cal'}>
          4
        </Button>
        <Button onClick={() => handleNumber('5')} variant={'number'} size={'cal'}>
          5
        </Button>
        <Button onClick={() => handleNumber('6')} variant={'number'} size={'cal'}>
          6
        </Button>
        <Button onClick={() => handleOperation('-')} variant={'operation'} size={'cal'}>
          -
        </Button>

        <Button onClick={() => handleNumber('1')} variant={'number'} size={'cal'}>
          1
        </Button>
        <Button onClick={() => handleNumber('2')} variant={'number'} size={'cal'}>
          2
        </Button>
        <Button onClick={() => handleNumber('3')} variant={'number'} size={'cal'}>
          3
        </Button>
        <Button onClick={() => handleOperation('*')} variant={'operation'} size={'cal'}>
          ×
        </Button>

        <Button onClick={() => handleNumber('.')} variant={'number'} size={'cal'}>
          .
        </Button>
        <Button onClick={() => handleNumber('0')} variant={'number'} size={'cal'}>
          0
        </Button>
        <Button onClick={handleDelete} variant={'operation'} size={'cal'}>
          <Delete className="w-6 h-6 mx-auto" />
        </Button>
        <Button onClick={() => handleOperation('/')} variant={'operation'} size={'cal'}>
          ÷
        </Button>

        <Button
          onClick={handleDone}
          variant={'green'}
          className="h-16 text-xl font-semibold rounded-lg col-span-4"
        >
          OK
        </Button>
      </div>
    </div>
  )
}

export default Calculator
