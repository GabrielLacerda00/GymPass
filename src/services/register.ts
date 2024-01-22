import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
// Aqui defino toda a lógica de criação de um usuário

// Defino o tipo de um usuário
interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID
// D - Dependency Inversion Principle - ao invés da classe instanciar uma dependencia
// ela recebe a dependencia

// Classe onde tenho a lógica de criação de um usuário
export class RegisterUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ name, email, password }: RegisterUserCaseRequest) {
    // Verifico se existe algum usuário com mesmo email
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists!')
    }
    // Crio um hash para senha
    const password_hash = await hash(password, 6)

    // const usersRepository = new PrismaUserRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
