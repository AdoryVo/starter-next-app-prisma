import { cache } from 'react';
import { prisma } from './client';

export const getUser = cache(async (id: string | number) => {
  // const res = await fetch('/graphql', { method: 'POST', body: '...' })
  
  id = Number(id)
  if (isNaN(id)) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id } })

  return user;
});