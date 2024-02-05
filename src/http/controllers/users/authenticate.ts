import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { MakeAuthenticateUseCase } from '@/factories/make-authenticate-user-case'

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
    const authenticateUseCase = MakeAuthenticateUseCase()

    const { user } = await authenticateUseCase.handle({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // Caminhos que vão ter acesso a esse cookie
        secure: true, // https
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
