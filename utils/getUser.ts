import { cache } from 'react'

import { prisma } from './db'

export const getUser = cache(async (id: string | number) => {
  id = Number(id)
  if (isNaN(id)) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id } })

  if (user) {
    user.password = null
  }

  return user
})

export const getUserByEmail = cache(async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    user.password = null
  }

  return user
})
