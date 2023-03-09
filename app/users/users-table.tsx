'use client'

import { useRouter } from 'next/navigation';
import type{ User } from "@prisma/client"
import { useState, useTransition } from 'react';
import ky from 'ky'

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const [email, setEmail] = useState('')

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  async function handleCreateUser() {
    setIsFetching(true);
    // Mutate external data source
    await ky.post('/api/users', { json: { email } }).catch((err) => {
      err.response.text().then((text: string) => console.error(text))
    });
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  async function handleDeleteUser(id: number) {
    setIsFetching(true);
    // Mutate external data source
    await ky.delete('/api/users', { json: { id } }).catch((err) => {
      err.response.text().then((text: string) => console.error(text))
    });
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ opacity : !isMutating ? 1 : 0.7, padding: '1em', backgroundColor: 'grey' }}>
        <h1>Users</h1>
        {users.map((user) =>
          <div key={user.id}>
            {JSON.stringify(user)}&nbsp;|&nbsp;
            <button onClick={() => handleDeleteUser(user.id)}>
              Remove user
            </button>
          </div>
        )}
      </div>

      <input type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={handleCreateUser}>
        Create user
      </button>
    </div>
  )
}