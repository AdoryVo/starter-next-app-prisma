'use client'

import { Link } from '@chakra-ui/next-js'
import { Box, Button, Heading } from '@chakra-ui/react'
import type { User } from '@prisma/client'

import { deleteUser } from './mutations'

import { useMutation } from '@utils/useMutation'

export default function UsersTable({ users }: { users: User[] }) {
  const { isMutating, startMutation } = useMutation()

  function handleDeleteUser(id: number) {
    startMutation(async () => {
      await deleteUser(id).catch((err) => {
        console.log(err.message)
      })
    })
  }

  return (
    <Box p={4}>
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
            <pre>
              {JSON.stringify(user, null, 2)}
            </pre>
            <Button colorScheme="red" size="sm" onClick={() => handleDeleteUser(user.id)}>
              Remove user
            </Button>
          </Box>
        )}
      </Box>

      <Box>
        Actions
        <br />
        - Create user at /signin
      </Box>
    </Box>
  )
}
