import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository {
  // USerCreateInput é um tipo criado pelo prisma
  // que define os atributos do objeto data
  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
