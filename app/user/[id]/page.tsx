import { notFound } from 'next/navigation'

import HomePage from './home-page'

import { getUser } from '@utils/getUser'

export default async function UserLayout({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUser(id)

  if (!user) {
    notFound()
  }

  return <HomePage user={user} />
}
