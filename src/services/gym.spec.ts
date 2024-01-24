import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { GymUserCase } from './gym'

let gymsRepository: InMemoryGymsRepository
let systemUnderTest: GymUserCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new GymUserCase(gymsRepository)
  })

  // afterEach(() => {})

  it('should be able to check in', async () => {
    const { gym } = await systemUnderTest.handle({
      title: 'JavaScriptGym',
      description: '',
      phone: '',
      latitude: -8.2853046,
      longitude: -35.9684502,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
