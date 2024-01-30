import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { GymUserCase } from '@/services/gym'

export function MakeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const gymUseCase = new GymUserCase(prismaGymsRepository)

  return gymUseCase
}
