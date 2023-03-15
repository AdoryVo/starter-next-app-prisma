import { cache } from 'react'

import { prisma } from './db'

export const getUser = cache(async (id: string | number) => {
  id = Number(id)
  if (isNaN(id)) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id } })

  return user
})
