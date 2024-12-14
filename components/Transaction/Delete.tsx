import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'

type Props = {
  isOpen: boolean
  onOpen: (status: boolean) => void
  walletId: string
  transactionId: string
  onDelete: (walletId: string, transactionId: string) => void
}

export const DeleteBtn: React.FC<Props> = ({
  isOpen,
  onOpen,
  walletId,
  transactionId,
  onDelete
}) => {
  const t = useTranslations()

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={'red'} onClick={() => onOpen(true)}>
          {t('common.delete')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{t('common.delete')}</DialogTitle>
          <DialogDescription>{t('transaction.confirmDelete')}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="red" onClick={() => onOpen(false)}>
              {t('common.close')}
            </Button>
          </DialogClose>
          <Button type="submit" onClick={() => onDelete(walletId, transactionId)} variant={'green'}>
            {t('common.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
