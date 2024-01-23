import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { inMemoryRepository } from '@/repositories/in-memory-repository/in-memory-repository'
import { AuthenticateUserCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: inMemoryRepository
let systemUnderTest: AuthenticateUserCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    // eslint-disable-next-line new-cap
    usersRepository = new inMemoryRepository()
    systemUnderTest = new AuthenticateUserCase(usersRepository)
  })
  it('should be able to authenticate a user credentials', async () => {
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
    expect(() =>
      systemUnderTest.handle({
        email: 'xaxa@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able authenticate with wrong password', async () => {
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
