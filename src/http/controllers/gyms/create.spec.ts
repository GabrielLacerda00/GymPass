import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const gymsResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScriptGym',
        description: 'akjfnalokj',
        phone: '9999999',
        latitude: -8.2853046,
        longitude: -35.9684502,
      })

    expect(gymsResponse.statusCode).toEqual(201)
  })
})
