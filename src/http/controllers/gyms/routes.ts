import { FastifyInstance } from 'fastify'
import { vefiryJwt } from '@/middlewares/verify-lwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', vefiryJwt)
}
