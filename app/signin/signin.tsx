'use client'

import { Button, Container, Divider, Input } from '@chakra-ui/react'
import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null,
}

export default function SignIn({ providers }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    signIn('credentials', { email, password })
  }

  return (
    <Container mt={5}>
      {Object.values(providers ?? {}).map((provider) =>
        <div key={provider.id}>
          {provider.id === 'credentials' ? (
            <form id="credentialsForm" onSubmit={handleSubmit}>
              <Divider my={5} />
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                mb={2}
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                mb={2}
              />
              <Button type="submit">
                Sign in with {provider.name}
              </Button>
            </form>
          ) : (
            <Button mt={2} onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          )}
        </div>
      )}
    </Container>
  )
}
