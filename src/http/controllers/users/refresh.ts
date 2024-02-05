import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // Olha os cookies da requisição para ver se existe o refreshToken

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
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
}
