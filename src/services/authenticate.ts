import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// Aqui defino toda a lógica de autenticação

// Defino o corpo da minha requisição
interface AuthenticateUserCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserCaseResponse {
  user: User
}

export class AuthenticateUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUserCaseResponse> {
    // Verifico se existe algum user com esse email
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }
    // Verifico se as senhas batem
    const doesPasswordsMatch = await compare(password, user.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
