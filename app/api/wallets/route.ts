import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { IResponsePaginate } from '@/utils/response'
import { Wallet } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || 10)
  const skip = (page - 1) * limit

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }

  const data = await prisma.wallet.findMany({
    where: {
      userId: session?.user!.id
    },
    skip: skip,
    take: limit
  })

  const total = await prisma.wallet.count({
    where: {
      userId: session?.user!.id
    }
  })

  const response: IResponsePaginate<Wallet[]> = {
    data: data,
    currentPage: page,
    perPage: limit,
    total: total,
    success: true
  }

  return NextResponse.json(response)
}
