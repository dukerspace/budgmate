import { prisma } from '@/prisma/prisma'
import { CreateUserSchema } from '@/schema/user'
import { categories } from '@/utils/category'
import { TransactionType } from '@prisma/client'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const validation = CreateUserSchema.safeParse(data)
  if (!validation.success) {
    return NextResponse.json({ errors: validation.error.format() }, { status: 400 })
  }
  const { email, username, password } = validation.data

  const check = await prisma.user.count({
    where: {
      OR: [{ username: username }, { email: email }]
    }
  })

  if (check) {
    return NextResponse.json(
      {
        message: 'Request fail',
        error: {
          username: 'username exists',
          email: 'email is exists'
        }
      },
      { status: 500 }
    )
  }
  await prisma.$transaction(async (tx) => {
    const hashedPassword = await hash(password, 10)
    const user = await tx.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        wallets: {
          create: {
            name: 'Wallet'
          }
        }
      }
    })

    for (const category of categories) {
      await tx.category.create({
        data: {
          ...category,
          type: category.type as TransactionType,
          userId: user.id
        }
      })
    }
  })

  return NextResponse.json(
    { message: 'User registered successfully', success: true },
    { status: 201 }
  )
}
