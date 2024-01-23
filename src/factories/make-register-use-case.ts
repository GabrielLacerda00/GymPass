import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repositories'
import { RegisterUserCase } from '@/services/register'

export function MakeRegisterUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUserCase(prismaUserRepository)

  return registerUseCase
}
