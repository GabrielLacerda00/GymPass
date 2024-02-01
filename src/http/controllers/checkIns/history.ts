import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFetchCheckInsHistoryUseCase } from '@/factories/make-fetch-checkIns-history-user-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  // Crio meu schema
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchCheckInsHistoryUseCase = MakeFetchCheckInsHistoryUseCase()

  const { checkIns } = await fetchCheckInsHistoryUseCase.handle({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
