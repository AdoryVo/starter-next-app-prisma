'use client'

import type{ User } from "@prisma/client"

export default function HomePage({ user }: { user: User }) {
  return (
    <>
      {JSON.stringify(user)}
    </>
  )
}