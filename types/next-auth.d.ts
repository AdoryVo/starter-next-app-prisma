import { DefaultUser } from 'next-auth'

type UserId = number

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: UserId
  }

  interface Session {
    user: User & {
      id: UserId
    }
  }
}
