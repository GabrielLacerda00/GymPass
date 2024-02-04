import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeCheckInUserCase } from '@/factories/make-check-in-user-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInSchemaParams = z.object({
    gymId: z.string().uuid(),
  })

  // Crio meu schema
  const createCheckInSchemaBody = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInSchemaParams.parse(request.params)
  const { latitude, longitude } = createCheckInSchemaBody.parse(request.body)

  const createCheckInUseCase = MakeCheckInUserCase()

  const { checkIn } = await createCheckInUseCase.handle({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ checkIn })
}
