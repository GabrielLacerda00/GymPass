import { FastifyInstance } from 'fastify'
import { vefiryJwt } from '@/middlewares/verify-lwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', vefiryJwt)

  app.post('/gyms', create)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
