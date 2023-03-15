import { Prisma } from '@prisma/client'

import { prisma } from '@utils/db'
import { json } from '@utils/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const user = await prisma.user.create({
      data,
    })

    return json(user, 201)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        return json('Email already exists!', 409)
      }
    }

    return json('Internal server error', 500)
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json()

    await prisma.user.delete({
      where: data,
    })

    return json('Success', 201)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        return json('Cannot find user', 404)
      }
    }

    return json('Internal server error', 500)
  }
}
