import { getServerSession } from 'next-auth'

import Dashboard from './(user)/dashboard'
import HomePage from './home-page'

export default async function Page() {
  const session = await getServerSession()

  if (!session) return <HomePage />

  return <Dashboard />
}
