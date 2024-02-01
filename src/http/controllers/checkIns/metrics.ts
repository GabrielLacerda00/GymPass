import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetUserMetrcisUseCase } from '@/factories/make-get-user-metrics-user-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const CheckInsMetricsUseCase = MakeGetUserMetrcisUseCase()

  const { userMetrics } = await CheckInsMetricsUseCase.handle({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    userMetrics,
  })
}
