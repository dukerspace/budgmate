'use client'

import { LoadingSpinner } from '@/components/Loading/Loading'
import TransactionCalculator from '@/components/Transaction/Calculator'
import TransactionCalendar from '@/components/Transaction/Calendar'
import TransactionCategory from '@/components/Transaction/Category'
import { DeleteBtn } from '@/components/Transaction/Delete'
import { Button } from '@/components/ui/button'
import { useGetAllCategory } from '@/hooks/useCategory'
import {
  useDeleteTransaction,
  useGetTransactionById,
  useUpdateTransaction
} from '@/hooks/useTransaction'
import { ICategoryViewDto } from '@/types/category'
import { ITransactionUpdateDto } from '@/types/transaction'
import dayjs from 'dayjs'
import { ArrowLeftToLine } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  walletId: string
  transactionId: string
}

const TransactionUpdate: React.FC<Props> = ({ walletId, transactionId }) => {
  const t = useTranslations()
  const router = useRouter()
  const updateTransaction = useUpdateTransaction()
  const { data: dataTransaction, isLoading: loadTransaction } = useGetTransactionById(
    walletId,
    transactionId
  )
  const { data: dataCategory, isLoading: loadCategory } = useGetAllCategory()
  const deleteTransaction = useDeleteTransaction()

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [data, setData] = useState<ITransactionUpdateDto>()

  const [categories, setCategories] = useState<ICategoryViewDto[]>([])
  const [category, setCategory] = useState<ICategoryViewDto>()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [amount, setAmount] = useState<number>(0)
  const [disabled, setDisable] = useState(true)
  const [isOpenDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    if (selectedDate && category && amount) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [selectedDate, category, amount])

  useEffect(() => {
    if (dataTransaction?.data) {
      setData({
        categoryId: dataTransaction.data.category.id,
        type: dataTransaction.data.category.type,
        date: new Date(dataTransaction.data.date),
        amount: dataTransaction.data.amount
      })

      setCategory(dataTransaction.data.category)
      setSelectedDate(dayjs(dataTransaction.data.date).toDate())
      setAmount(dataTransaction.data.amount)
    }
    setCategories(dataCategory?.data || [])
  }, [loadTransaction, dataTransaction, dataCategory, loadCategory])

  const onSelectCategory = (category: ICategoryViewDto) => {
    setCategory(category)
    setIsCategoryOpen(false)
    setData({
      ...data!,
      type: category.type,
      categoryId: category.id
    })
  }

  const onSelectDate = (date: Date) => {
    setSelectedDate(date)
    setData({
      ...data!,
      date: date
    })
    setIsDatePickerOpen(false)
  }

  const onSetAmount = (amount: number) => {
    setAmount(amount)
    setData({
      ...data!,
      amount: amount
    })
  }

  const handleUpdateData = async () => {
    updateTransaction.mutate(
      {
        walletId: walletId,
        transactionId: transactionId,
        data: data!
      },
      {
        onSuccess: () => {
          return router.push(`/wallets/${walletId}`)
        }
      }
    )
  }

  const handleDeleteTransaction = async (walletId: string, transactionId: string) => {
    deleteTransaction.mutate(
      {
        walletId: walletId,
        transactionId: transactionId
      },
      {
        onSuccess: () => {
          setOpenDelete(false)
          return router.push(`/wallets/${walletId}`)
        }
      }
    )
  }

  return loadCategory || loadTransaction ? (
    <>
      <LoadingSpinner />
    </>
  ) : (
    <div className="p-4">
      <div onClick={() => router.back()}>{<ArrowLeftToLine />}</div>
      <h2>{t('transaction.add')}</h2>
      <div>
        <TransactionCategory
          category={category!}
          categories={categories}
          isOpen={isCategoryOpen}
          onOpen={setIsCategoryOpen}
          onSelectCategory={onSelectCategory}
        />

        <TransactionCalendar
          open={isDatePickerOpen}
          onOpen={setIsDatePickerOpen}
          selectedDate={selectedDate!}
          onSelect={(date) => {
            if (date) {
              onSelectDate(date)
            }
          }}
        />

        <TransactionCalculator
          data={data!}
          isOpen={isCalculatorOpen}
          onOpen={setIsCalculatorOpen}
          onSetAmount={onSetAmount}
        />

        <div className="flex flex-col">
          <div>
            <Button
              onClick={handleUpdateData}
              className="w-full"
              variant={'green'}
              disabled={disabled}
            >
              {t('common.update')}
            </Button>
          </div>
          <div>
            <DeleteBtn
              isOpen={isOpenDelete}
              onOpen={setOpenDelete}
              onDelete={handleDeleteTransaction}
              walletId={walletId}
              transactionId={transactionId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionUpdate
