import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Gab Test',
    email: 'gabtest@gmail.com',
    password: '123456789',
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
