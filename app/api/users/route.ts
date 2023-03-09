import { Prisma } from '@prisma/client'

import { prisma } from '@utils/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await prisma.user.create({
      data
    })

    return new Response('Success', { status: 201 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        return new Response('Email already exists!', { status: 409 })
      }
    }

    return new Response('Internal server error', { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json()

    await prisma.user.delete({
      where: data
    })

    return new Response('Success', { status: 201 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response('Cannot find user', { status: 404 })
    }

    return new Response('Internal server error', { status: 500 })
  }
}
