import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { SearchGymUserCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let systemUnderTest: SearchGymUserCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new SearchGymUserCase(gymsRepository)
  })

  it('should be able to search gyms by title', async () => {
    await gymsRepository.create({
      title: 'JavaScriptGym',
      description: '',
      phone: '',
      latitude: -8.2853046,
      longitude: -35.9684502,
    })

    await gymsRepository.create({
      title: 'PythonGym',
      description: '',
      phone: '',
      latitude: -8.2853046,
      longitude: -35.9684502,
    })

    const { gyms } = await systemUnderTest.handle({
      query: 'PythonGym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'PythonGym' })])
  })

  it('should be able to search gyms by title', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScriptgym-${i}`,
        description: '',
        phone: '',
        latitude: -8.2853046,
        longitude: -35.9684502,
      })
    }

    const { gyms } = await systemUnderTest.handle({
      query: 'JavaScriptgym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScriptgym-21' }),
      expect.objectContaining({ title: 'JavaScriptgym-22' }),
    ])
  })
})
