import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { FetchNearbyGymsUserCase } from './fecth-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let systemUnderTest: FetchNearbyGymsUserCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new FetchNearbyGymsUserCase(gymsRepository)
  })

  it('should be able to search gyms by title', async () => {
    await gymsRepository.create({
      title: 'FarGym',
      description: '',
      phone: '',
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    await gymsRepository.create({
      title: 'NearGym',
      description: '',
      phone: '',
      latitude: -8.2768397,
      longitude: -35.9304046,
    })

    const { gyms } = await systemUnderTest.handle({
      userLatitude: -8.2853046,
      userLongitude: -35.9684502,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'NearGym' })])
  })
})
