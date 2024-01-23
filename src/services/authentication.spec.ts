import { expect, describe, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { inMemoryRepository } from '@/repositories/in-memory-repository/in-memory-repository'
import { AuthenticateUserCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate a user credentials', async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryRepository()
    const systemUnderTest = new AuthenticateUserCase(usersRepository)

    await usersRepository.create({
      name: 'xarola',
      email: 'xaxa@gmail.com',
      password_hash: await hash('123456789', 6),
    })

    const { user } = await systemUnderTest.handle({
      email: 'xaxa@gmail.com',
      password: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be not able authenticate with wrong email', async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryRepository()
    const systemUnderTest = new AuthenticateUserCase(usersRepository)

    expect(() =>
      systemUnderTest.handle({
        email: 'xaxa@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able authenticate with wrong password', async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryRepository()
    const systemUnderTest = new AuthenticateUserCase(usersRepository)

    await usersRepository.create({
      name: 'xarola',
      email: 'xaxa@gmail.com',
      password_hash: await hash('123456789', 6),
    })

    expect(() =>
      systemUnderTest.handle({
        email: 'xaxa@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
