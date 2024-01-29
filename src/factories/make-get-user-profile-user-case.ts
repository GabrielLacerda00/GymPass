import { GetUserProfileUserCase } from '@/services/get-user-profile'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repositories'

export function MakeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const userCase = new GetUserProfileUserCase(prismaUserRepository)

  return userCase
}
