'use client'

import type { User } from '@prisma/client'
import { useState } from 'react';

import { createUser, deleteUser } from './mutations';

import { useMutator } from '@utils/useMutator';

export default function UsersTable({ users }: { users: User[] }) {
  const { isMutating, handleMutate } = useMutator()

  const [email, setEmail] = useState('')

  function handleCreateUser() {
    handleMutate(async () => {
      await createUser(email).catch((err) => {
        console.log(err.message)
      })
    })
  }

  function handleDeleteUser(id: number) {
    handleMutate(async () => {
      await deleteUser(id).catch((err) => {
        console.log(err.message)
      })
    })
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