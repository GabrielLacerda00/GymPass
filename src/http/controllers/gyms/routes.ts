import { FastifyInstance } from 'fastify'
import { vefiryJwt } from '@/middlewares/verify-lwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', vefiryJwt)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
