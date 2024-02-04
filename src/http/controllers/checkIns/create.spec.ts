import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { CreateAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a check-in', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScriptGym',
        description: '',
        phone: '',
        latitude: -8.2853046,
        longitude: -35.9684502,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -8.2853046,
        longitude: -35.9684502,
      })

    expect(response.statusCode).toEqual(201)
  })
})
