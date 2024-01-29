import { FetchNearbyGymsUserCase } from '@/services/fecth-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function MakeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const userCase = new FetchNearbyGymsUserCase(prismaGymsRepository)

  return userCase
}
