import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import dayjs from 'dayjs'
import { CalendarIcon } from 'lucide-react'

type Props = {
  open: boolean
  onOpen: (open: boolean) => void
  selectedDate: Date
  onSelect: (date: Date | undefined) => void
}

const TransactionCalendar = ({ open, onOpen, selectedDate, onSelect }: Props) => {
  return (
    <Drawer open={open} onOpenChange={onOpen}>
      <DrawerTrigger className="w-full">
        <div
          className="p-4 bg-gray-100 rounded-xl shadow-sm mt-4 mb-4"
          onClick={() => onOpen(true)}
        >
          <div className="flex justify-between">
            <span>Date: {dayjs(selectedDate).format('DD MMM YYYY')}</span>
            <CalendarIcon className="h-4 w-4" />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="inset-0  bg-gray-100">
        <DrawerHeader>
          <DrawerTitle>Select Date</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelect}
            className="rounded-md border w-full max-w-[350px] sm:max-w-none"
            classNames={{
              months: 'w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
              month: 'w-full space-y-4',
              caption: 'flex justify-center pt-1 relative items-center',
              caption_label: 'text-sm font-medium',
              nav: 'space-x-1 flex items-center',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex w-full',
              head_cell: 'text-muted-foreground rounded-md w-full font-normal text-[0.8rem]',
              row: 'flex w-full mt-2',
              cell: 'text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-9 w-full',
              day: 'h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:rounded-md',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
              day_today: 'bg-accent text-accent-foreground rounded-md',
              day_outside: 'text-muted-foreground opacity-50',
              day_disabled: 'text-muted-foreground opacity-50',
              day_hidden: 'invisible'
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default TransactionCalendar
