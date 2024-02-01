import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeValidateCheckInUseCase } from '@/factories/make-validate-check-in-user-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInSchemaParams = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInSchemaParams.parse(request.params)

  const validateCheckInUserCase = MakeValidateCheckInUseCase()

  await validateCheckInUserCase.handle({ checkInId })

  return reply.status(204).send()
}
