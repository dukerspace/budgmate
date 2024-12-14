import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { CreateTransactionSchema } from '@/schema/transaction'
import { IResponseData } from '@/utils/response'
import { Transaction } from '@prisma/client'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ walletId: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }

  const data = await req.json()
  const validation = CreateTransactionSchema.safeParse(data)

  if (!validation.success) {
    return NextResponse.json({ errors: validation.error.format() }, { status: 400 })
  }
  const walletId = (await params).walletId

  const created = await prisma.transaction.create({
    data: {
      ...data,
      walletId: walletId
    }
  })

  const response: IResponseData<Transaction> = {
    data: created,
    success: true
  }

  return NextResponse.json(response)
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ walletId: string }> }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }
  const walletId = (await params).walletId
  const query = req.nextUrl.searchParams
  const date = query.get('date')

  const firstDate = dayjs(date, 'MM-YYYY')

  const startOfMonth = firstDate.startOf('month')
  const endOfMonth = firstDate.endOf('month')

  const data: Transaction[] = await prisma.transaction.findMany({
    where: {
      walletId: walletId,
      date: {
        gte: startOfMonth.toDate(),
        lt: endOfMonth.toDate()
      }
    },
    include: {
      category: true
    }
  })

  const response: IResponseData<Transaction[]> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}
