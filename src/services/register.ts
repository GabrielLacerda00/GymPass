import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
// Aqui defino toda a lógica de criação de um usuário

// Defino o tipo de um usuário
interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

// Função onde tenho a lógica de criação de um usuário
export async function registerUserCase({
  name,
  email,
  password,
}: RegisterUserCaseRequest) {
  // Verifico se existe algum usuário com mesmo email
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists!')
  }
  // Crio um hash para senha
  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
