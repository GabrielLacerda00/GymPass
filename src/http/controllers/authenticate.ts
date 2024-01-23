import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repositories'
import { AuthenticateUserCase } from '@/services/authenticate'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Crio meu schema
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  // Valido meu schema
  const { email, password } = authenticateSchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUserCase(prismaUserRepository)

    authenticateUseCase.handle({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
