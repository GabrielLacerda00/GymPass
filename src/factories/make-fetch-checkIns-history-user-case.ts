import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositories'
import { FetchUserCheckInsHistory } from '@/services/fecth-user-check-ins-history'

export function MakeFetchCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const userCase = new FetchUserCheckInsHistory(prismaCheckInsRepository)

  return userCase
}
