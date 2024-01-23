import { expect, test, describe, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryRepository } from '@/repositories/in-memory-repository/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to create a user', async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.handle({
      name: 'Xarola',
      email: 'xaxaxa@gmail.com',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.handle({
      name: 'Xarola',
      email: 'xaxaxa@gmail.com',
      password: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456789',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed)
  })
})
