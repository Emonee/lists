import { PrismaClient } from '@prisma/client'

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if ((global as any).__db == null) (global as any).__db = new PrismaClient()
  db = (global as any).__db
}

export { db }
