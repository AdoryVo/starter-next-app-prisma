import { getUsers } from '@utils/getUsers';
import UsersTable from './users-table';
import { notFound } from 'next/navigation'

import { Inter } from 'next/font/google';

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