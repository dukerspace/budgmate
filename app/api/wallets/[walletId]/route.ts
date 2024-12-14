import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { IResponseData } from '@/utils/response'
import { Wallet } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ walletId: string }> }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }
  const { walletId } = await params

  const data = await prisma.wallet.findUnique({
    where: {
      id: walletId
    },
    include: {
      transactions: true
    }
  })

  const response: IResponseData<Wallet> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}
