import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { User } from '@prisma/client'
import ky from 'ky'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { prisma } from '@utils/db'

export default NextAuth({
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const body = {
          email: credentials?.email,
          password: credentials?.password,
        }
        const user = await ky.post('http://localhost:3000/api/users', { json: body }).json<User>().catch((err) => {
          console.error(err.message)
        })

        // If no error and we have user data, return it
        if (user && user.id) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
})

