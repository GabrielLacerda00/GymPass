import { expect, test, describe, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUserCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: '1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
