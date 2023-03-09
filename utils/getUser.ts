import { cache } from 'react';

export interface User {
  id: string
}

export const getUser = cache(async (id: string) => {
  // const user = await db.user.findUnique({ id });
  // const res = await fetch('/graphql', { method: 'POST', body: '...' })
  const user = { id }
  return user;
});