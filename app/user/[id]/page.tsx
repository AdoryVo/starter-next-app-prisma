import { getUser } from '@utils/getUser';
import HomePage from './home-page';

export default async function UserLayout({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await getUser(id);
  
  return <HomePage user={user} />
}