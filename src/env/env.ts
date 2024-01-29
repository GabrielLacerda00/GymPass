import 'dotenv'
import { z } from 'zod'

// Construo meu schema das variaveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.coerce.string(),
  PORT: z.coerce.number().default(3333),
})
// Valido meu schema
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables')
  throw new Error('Invalid environment variables')
}

export const env = _env.data
