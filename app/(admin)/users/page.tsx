import { notFound } from 'next/navigation'

import UsersTable from './users-table'

import { getUsers } from '@utils/getUsers'

export const metadata = {
  title: 'Users',
  description: 'View users in the database',
}

export default async function Page() {
  const users = await getUsers()

  if (!users) {
    notFound()
  }

  return (
    <main>
      <UsersTable users={users} />
    </main>
  )
}
