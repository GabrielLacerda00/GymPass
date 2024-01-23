import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repositories'
import { AuthenticateUserCase } from '@/services/authenticate'

export function MakeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUserCase(prismaUserRepository)

  return authenticateUseCase
}
