import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUserCase } from '@/services/register'
import { PrismaUserRepository } from '@/repositories/prisma-users-repositories'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Crio meu schema do usuário
  const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  // Valido meu schema
  const { name, email, password } = userSchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUserCase(prismaUserRepository)

    registerUseCase.handle({
      name,
      email,
      password,
    })
  } catch (error) {
    reply.status(409).send()
  }

  return reply.status(201).send()
}
