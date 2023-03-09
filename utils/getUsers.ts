import { cache } from 'react';
import { prisma } from './client';

export const getUsers = cache(async () => {
  const user = await prisma.user.findMany()

  return user;
});