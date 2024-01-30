import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Gab Test',
      email: 'gabtest@gmail.com',
      password: '123456789',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'gabtest@gmail.com',
      password: '123456789',
    })

    const { token } = authResponse.body

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
