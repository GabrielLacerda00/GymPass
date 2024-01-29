import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositories'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUserCase } from '@/services/check-in'

export function MakeCheckInUserCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const userCase = new CheckInUserCase(
    prismaCheckInsRepository,
    prismaGymsRepository,
  )

  return userCase
}
