import { Prisma } from '@prisma/client'

// Type Variations
const userWithPosts = Prisma.validator<Prisma.UserArgs>()({ include: { posts: true } })
export type UserWithPosts = Prisma.UserGetPayload<typeof userWithPosts>

const postWithTags = Prisma.validator<Prisma.PostArgs>()({ include: { tags: true } })
export type PostWithTags = Prisma.PostGetPayload<typeof postWithTags>
