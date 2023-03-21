import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
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
        if (!credentials) {
          return null
        }

        try {
          const user = await prisma.user.upsert({
            where: { email: credentials.email },
            update: {},
            create: {
              email: credentials.email,
              password: await bcrypt.hash(credentials.password, 10),
            },
          })

          if (await bcrypt.compare(credentials.password, user.password || '')) {
            return user
          }

          throw new Error('Incorrect credentials, please try again!')
        } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              throw new Error('Email already exists!')
            }
          }
          else if (e instanceof Error) {
            throw e
          }

          throw new Error('Internal server error')
        }
      },
    }),
  ],
})

