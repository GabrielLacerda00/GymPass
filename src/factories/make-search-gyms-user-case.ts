import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUserCase } from '@/services/search-gyms'

export function MakeSearchGymsUseCase() {
  const prismaCheckInsRepository = new PrismaGymsRepository()
  const userCase = new SearchGymUserCase(prismaCheckInsRepository)

  return userCase
}
