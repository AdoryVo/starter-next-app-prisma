'use client'

import { Link } from '@chakra-ui/next-js'
import { Button, Container, Heading } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

export default function HomePage() {
  return (
    <Container mt={5}>
      <Heading mb={2}>Links</Heading>
      <Link href="/users" passHref>
        <Button me={2}>
          Users
        </Button>
      </Link>

      <Button colorScheme="blue" onClick={() => signIn()}>
        Sign in
      </Button>
    </Container>
  )
}
