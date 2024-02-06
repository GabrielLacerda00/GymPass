import { FastifyInstance } from 'fastify'
import { vefiryJwt } from '@/middlewares/verify-lwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '@/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', vefiryJwt)

  app.get('/check-ins/metrics', metrics)
  app.get('/check-ins/history', history)
  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
