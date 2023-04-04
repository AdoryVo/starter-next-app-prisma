import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import Dashboard from './(user)/dashboard'
import HomePage from './home-page'

import { getUserByEmail } from '@utils/getUser'

export default async function Page() {
  const session = await getServerSession()

  if (!session || !session.user.email) return <HomePage />

  const user = await getUserByEmail(session.user.email)

  if (!user) {
    notFound()
  }

  return <Dashboard user={user} />
}
