'use client'

import { Link } from '@chakra-ui/next-js'
import { Box, Button, Container, Heading, Input } from '@chakra-ui/react';
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
    <Container mt={5}>
      <Link href="/" passHref>
        <Button mb={4}>
          Home
        </Button>
      </Link>


      <Box
        backgroundColor="blackAlpha.100"
        opacity={!isMutating ? 1 : 0.7}
        p={4}
        mb={5}
      >
        <Heading>Users</Heading>
        {users.map((user) =>
          <Box key={user.id} my={2}>
            <Link href={`/user/${user.id}`} color="blue.500">
              {JSON.stringify(user)}
            </Link>
            &nbsp;|&nbsp;
            <Button colorScheme="red" size="sm" onClick={() => handleDeleteUser(user.id)}>
              Remove user
            </Button>
          </Box>
        )}
      </Box>

      <Box>
        <Input type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={2}
        />

        <Button colorScheme="blue" onClick={handleCreateUser}>
          Create user
        </Button>
      </Box>
    </Container>
  )
}