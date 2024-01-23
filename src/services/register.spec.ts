import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryRepository } from '@/repositories/in-memory-repository/in-memory-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

let usersRepository: UsersRepository
let systemUnderTest: RegisterUserCase

describe('Register Use Case', () => {
  beforeEach(() => {
    // eslint-disable-next-line new-cap
    usersRepository = new inMemoryRepository()
    systemUnderTest = new RegisterUserCase(usersRepository)
  })
  it('should be able to create a user', async () => {
    const { user } = await systemUnderTest.handle({
      name: 'Xarola',
      email: 'xaxaxa@gmail.com',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await systemUnderTest.handle({
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
  it('should not be able to register same email twice', async () => {
    const email = 'xaxaxa@gmail.com'

    await systemUnderTest.handle({
      name: 'Xarola',
      email,
      password: '123456789',
    })

    await expect(() =>
      systemUnderTest.handle({
        name: 'Xarola',
        email,
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
