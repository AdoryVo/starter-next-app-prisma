import { getUser } from '@utils/getUser';
import HomePage from './home-page';
import { notFound } from 'next/navigation'

export default async function UserLayout({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUser(id);

  if (!user) {
    notFound()
  }
  
  return <HomePage user={user} />
}