import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/users/register'
import { authenticate } from '@/http/controllers/users/authenticate'
import { profile } from '@/http/controllers/users/profile'
import { vefiryJwt } from '@/middlewares/verify-lwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticate routes */
  app.get('/profile', { onRequest: [vefiryJwt] }, profile)
}
