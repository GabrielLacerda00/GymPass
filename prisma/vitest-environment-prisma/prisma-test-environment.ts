import { Environment } from 'vitest'
import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Gerar um novo Banco de dados para cada switch de testes
// Gerando uma nova URL do BD para cada execução
function generateDataBaseURL(schema: string) {
  // Verifico se existe algum valor na minha variavel de ambiente
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }
  // Transformo minha string relativa ao path do DB em uma URL
  const url = new URL(process.env.DATABASE_URL)
  // Acesso os query params(Search params) da url e seto um novo valor
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>(<unknown>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const dataBaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = dataBaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'ssr',
})
