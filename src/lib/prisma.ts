import { env } from '@/env/env'
import { PrismaClient } from '@prisma/client'

// ORM - Object Realational Mapper
// Instancio para fazer a conexão com DB
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
