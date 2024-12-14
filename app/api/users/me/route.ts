import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { IResponseData } from '@/utils/response'
import { User } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }

  const data = await prisma.user.findUnique({
    where: {
      id: session?.user!.id
    }
  })

  const response: IResponseData<User> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}

export async function POST() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }

  const update = {}

  const data = await prisma.user.update({
    where: {
      id: session?.user!.id
    },
    data: update
  })

  const response: IResponseData<User> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}

export async function DELETE() {
  const session = await auth()

  const wallet = await prisma.wallet.findUnique({
    where: {
      id: session?.user!.id
    }
  })

  await prisma.$transaction([
    prisma.wallet.delete({
      where: {
        id: wallet?.id
      }
    }),
    prisma.user.delete({
      where: {
        id: session?.user?.id
      }
    })
  ])
  return NextResponse.json({ message: 'Delete successfully' }, { status: 201 })
}
