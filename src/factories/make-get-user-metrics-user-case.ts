import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repositories'
import { GetUserMetricsUserCase } from '@/services/get-user-metrics'

export function MakeGetUserMetrcisUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const userCase = new GetUserMetricsUserCase(prismaCheckInsRepository)

  return userCase
}
