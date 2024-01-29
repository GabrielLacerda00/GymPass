import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositories'
import { ValidateCheckInUserCase } from '@/services/validate-check-in'

export function MakeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const userCase = new ValidateCheckInUserCase(prismaCheckInsRepository)

  return userCase
}
