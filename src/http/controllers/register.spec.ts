import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to register a user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Gabriel',
      email: 'gabrol@gmail.com',
      password: '123456789',
    })
    expect(response.statusCode).toEqual(201)
  })
})
