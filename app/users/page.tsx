import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation'

import UsersTable from './users-table';

import { getUsers } from '@utils/getUsers';

const inter = Inter({ subsets: ['latin'] })

export default async function Page() {
  const users = await getUsers();

  if (!users) {
    notFound()
  }

  return (
    <main className={inter.className}>
      <UsersTable users={users} />
    </main>
  )
}