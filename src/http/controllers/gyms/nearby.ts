import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFetchNearbyGymsUseCase } from '@/factories/make-fetch-nearby-gyms-user-case'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  // Crio meu schema do usuário
  const searchGymQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = searchGymQuerySchema.parse(request.query)

  const fetchNearbyGymsUseCase = MakeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
