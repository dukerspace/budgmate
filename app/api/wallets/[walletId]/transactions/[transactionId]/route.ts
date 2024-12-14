import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import { CreateTransactionSchema } from '@/schema/transaction'
import { IResponseData } from '@/utils/response'
import { Transaction } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ walletId: string; transactionId: string }>
  }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }
  const { walletId, transactionId } = await params
  console.log('---', walletId, (await params).transactionId)

  const data = await prisma.transaction.findFirst({
    where: {
      id: transactionId,
      wallet: {
        id: walletId,
        userId: session.user.id
      }
    },
    include: {
      category: true
    }
  })

  const response: IResponseData<Transaction> = {
    data: data,
    success: true
  }

  return NextResponse.json(response)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ walletId: string; transactionId: string }> }
) {
  const { walletId, transactionId } = await params

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }

  const data = await req.json()
  const validation = CreateTransactionSchema.safeParse(data)

  if (!validation.success) {
    return NextResponse.json({ errors: validation.error.format() }, { status: 400 })
  }

  const check = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
      wallet: {
        id: walletId,
        userId: session.user.id
      }
    }
  })
  if (!check) {
    return NextResponse.json({ errors: 'transaction not found' }, { status: 404 })
  }

  const update = await prisma.transaction.update({
    where: {
      id: transactionId,
      wallet: { id: walletId }
    },
    data: {
      ...data
    }
  })

  const response: IResponseData<Transaction> = {
    data: update,
    success: true
  }

  return Response.json(response)
}

export async function DELETE(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ walletId: string; transactionId: string }>
  }
) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ message: 'Access denied' }, { status: 401 })
  }
  const { walletId, transactionId } = await params

  const check = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
      wallet: {
        id: walletId,
        userId: session.user.id
      }
    }
  })
  if (!check) {
    return NextResponse.json({ errors: 'transaction not found' }, { status: 404 })
  }

  await prisma.transaction.delete({
    where: {
      id: transactionId,
      wallet: {
        id: walletId,
        userId: session.user.id
      }
    }
  })

  return NextResponse.json({ message: 'Delete successfully' }, { status: 201 })
}
