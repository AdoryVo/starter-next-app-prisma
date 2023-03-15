import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react'

import SignIn from './signin'

export default async function Page() {
  const session = await getServerSession()

  if (session) redirect('/')

  const providers = await getProviders()

  return <SignIn providers={providers} />
}
