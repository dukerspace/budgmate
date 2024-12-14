import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { IResponseData } from '@/utils/response'
import { Category } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }

  const topCategories = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: {
      wallet: {
        userId: session?.user!.id
      }
    },
    _count: {
      categoryId: true
    },
    orderBy: {
      _count: {
        categoryId: 'desc'
      }
    },
    take: 4
  })

  const topCategoryIds = topCategories.map((tc) => tc.categoryId)

  const data = await prisma.category.findMany({
    where: {
      id: {
        in: topCategoryIds
      }
    }
  })

  const response: IResponseData<Category[]> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}
