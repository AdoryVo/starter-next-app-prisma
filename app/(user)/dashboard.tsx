'use client'

import { Button, Container, Heading } from '@chakra-ui/react'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'

export default function Dashboard({ user }: { user: User }) {
  return (
    <Container>
      <Heading mb={2}>Hello, {user.name ?? user.email}!</Heading>

      <Button onClick={() => signOut()}>
        Sign out
      </Button>
    </Container>
  )
}
