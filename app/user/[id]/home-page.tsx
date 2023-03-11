'use client'

import { Link } from '@chakra-ui/next-js'
import { Button, Container, Heading } from '@chakra-ui/react'
import type { User } from '@prisma/client'

export default function HomePage({ user }: { user: User }) {
  return (
    <Container mt={5}>
      <Link href="/" passHref>
        <Button>
          Home
        </Button>
      </Link>

      <Heading>User</Heading>
      {JSON.stringify(user)}
    </Container>
  )
}
