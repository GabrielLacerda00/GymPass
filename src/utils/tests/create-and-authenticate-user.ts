import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Gab Test',
      email: 'gabtest@gmail.com',
      password_hash: await hash('123456789', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'gabtest@gmail.com',
    password: '123456789',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
