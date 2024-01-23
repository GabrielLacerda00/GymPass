import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourchNotExistsError } from './errors/resource-not-exists'
// Aqui defino toda a lógica de criação de um usuário

// Defino o tipo de um usuário
interface GetUserProfileUserCaseRequest {
  userId: string
}

interface GetUserProfileUserCaseResponse {
  user: User
}

// Classe onde tenho a lógica de busca de perfis
export class GetUserProfileUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({
    userId,
  }: GetUserProfileUserCaseRequest): Promise<GetUserProfileUserCaseResponse> {
    // Verifico se existe algum usuário com mesmo id
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourchNotExistsError()
    }

    return {
      user,
    }
  }
}
