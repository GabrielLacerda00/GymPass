import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchGymsUseCase } from '@/factories/make-search-gyms-user-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  // Crio meu schema
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQuerySchema.parse(request.body)

  const searchGymUseCase = MakeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.handle({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
