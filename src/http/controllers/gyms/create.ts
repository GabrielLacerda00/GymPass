import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeCreateGymUseCase } from '@/factories/make-create-gym-user-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Crio meu schema do usuário
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createGymSchema.parse(request.body)

  const createGymUseCase = MakeCreateGymUseCase()

  await createGymUseCase.handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
