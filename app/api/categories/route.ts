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

  const data = await prisma.category.findMany({
    where: {
      userId: session?.user!.id
    }
  })

  const response: IResponseData<Category[]> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}
