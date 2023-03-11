import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Create one instance of PrismaClient and re-use it across the application
export const prisma =
  globalForPrisma.prisma || new PrismaClient()

// Assign PrismaClient to a global variable in dev environments only
// to prevent hot reloading from creating new instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Simple response into JSON
export function json(body: any, status: number) {
  return NextResponse.json(body, { status })
}
