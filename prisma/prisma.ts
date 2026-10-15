import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'


if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
}

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}
  
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

//const prisma = new PrismaClient()
//export { prisma }