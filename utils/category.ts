import { ICreateCategory } from '@/types/category'
import { CategoryType } from '@/utils/constant'

export const categories: ICreateCategory[] = [
  {
    icon: 'BriefcaseBusiness',
    name: 'Business',
    type: CategoryType.INCOME,
    seq: 1
  },
  {
    icon: 'Banknote',
    name: 'Extra Income',
    type: CategoryType.INCOME,
    seq: 2
  },
  {
    icon: 'Gift',
    name: 'Gifts',
    type: CategoryType.INCOME,
    seq: 3
  },
  {
    icon: 'ShieldPlus',
    name: 'Insurance Payout',
    type: CategoryType.INCOME,
    seq: 4
  },
  {
    icon: 'Landmark',
    name: 'Loan',
    type: CategoryType.INCOME,
    seq: 5
  },
  {
    icon: 'HandCoins',
    name: 'Other',
    type: CategoryType.INCOME,
    seq: 6
  },
  {
    icon: 'Wallet',
    name: 'Salary',
    type: CategoryType.INCOME,
    seq: 7
  },
  {
    icon: 'Pill',
    name: 'Beauty',
    type: CategoryType.EXPENSE,
    seq: 8
  },
  {
    icon: 'Receipt',
    name: 'Bills & Fees',
    type: CategoryType.EXPENSE,
    seq: 9
  },
  {
    icon: 'Car',
    name: 'Car',
    type: CategoryType.EXPENSE,
    seq: 10
  },
  {
    icon: 'University',
    name: 'Education',
    type: CategoryType.EXPENSE,
    seq: 11
  },
  {
    icon: 'User',
    name: 'Family & Personal',
    type: CategoryType.EXPENSE,
    seq: 12
  },
  {
    icon: 'Utensils',
    name: 'Food & Drink',
    type: CategoryType.EXPENSE,
    seq: 13
  },
  {
    icon: 'Gift',
    name: 'Gifts',
    type: CategoryType.EXPENSE,
    seq: 14
  },
  {
    icon: 'ShoppingBasket',
    name: 'Groceries',
    type: CategoryType.EXPENSE,
    seq: 15
  },
  {
    icon: 'HeartPulse',
    name: 'Healthcare',
    type: CategoryType.EXPENSE,
    seq: 16
  },
  {
    icon: 'House',
    name: 'Home',
    type: CategoryType.EXPENSE,
    seq: 17
  },
  {
    icon: 'TicketPercent',
    name: 'Other',
    type: CategoryType.EXPENSE,
    seq: 18
  },
  {
    icon: 'ShoppingCart',
    name: 'Shopping',
    type: CategoryType.EXPENSE,
    seq: 19
  },
  {
    icon: 'Dumbbell',
    name: 'Sport & Hobbies',
    type: CategoryType.EXPENSE,
    seq: 20
  },
  {
    icon: 'Bus',
    name: 'Transport',
    type: CategoryType.EXPENSE,
    seq: 21
  },
  {
    icon: 'Plane',
    name: 'Travel',
    type: CategoryType.EXPENSE,
    seq: 22
  },
  {
    icon: 'BriefcaseBusiness',
    name: 'Work',
    type: CategoryType.EXPENSE,
    seq: 23
  }
]
