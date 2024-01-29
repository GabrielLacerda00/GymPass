import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { vefiryJwt } from '@/middlewares/verify-lwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticate routes */
  app.get('/profile', { onRequest: [vefiryJwt] }, profile)
}
