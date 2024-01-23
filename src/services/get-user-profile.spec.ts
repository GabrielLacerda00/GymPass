import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { inMemoryRepository } from '@/repositories/in-memory-repository/in-memory-repository'
import { GetUserProfileUserCase } from './get-user-profile'
import { ResourchNotExistsError } from './errors/resource-not-exists'

let usersRepository: inMemoryRepository
let systemUnderTest: GetUserProfileUserCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    // eslint-disable-next-line new-cap
    usersRepository = new inMemoryRepository()
    systemUnderTest = new GetUserProfileUserCase(usersRepository)
  })
  it('should be able to get a user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'xarola',
      email: 'xaxa@gmail.com',
      password_hash: await hash('123456789', 6),
    })

    const { user } = await systemUnderTest.handle({
      userId: userCreated.id,
    })

    expect(user.name).toEqual('xarola')
  })

  it('should be not able to get user profile with wrong id', async () => {
    expect(() =>
      systemUnderTest.handle({
        userId: 'non-exist-id',
      }),
    ).rejects.toBeInstanceOf(ResourchNotExistsError)
  })
})
