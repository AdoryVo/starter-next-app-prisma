import { cache } from 'react'

import { prisma } from './db'

export const getUsers = cache(async () => {
  const user = await prisma.user.findMany({ include: { profile: true } })

  return user
})
