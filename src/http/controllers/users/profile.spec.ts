import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'gabtest@gmail.com',
      }),
    )
  })
})
