'use client'

import { Link } from '@chakra-ui/next-js'
import { Button, Container, Heading } from '@chakra-ui/react'

export default function Page() {
  return (
    <Container mt={5}>
      <Heading mb={2}>Links</Heading>
      <Link href="/users" passHref>
        <Button>
          Users
        </Button>
      </Link>
    </Container>
  )
}
