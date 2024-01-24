import { expect, describe, it, beforeEach } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { FetchUserCheckInsHistory } from './fecth-user-check-ins-history'

let checkInsRepository: checkInsInMemoryRepository
let systemUnderTest: FetchUserCheckInsHistory

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    systemUnderTest = new FetchUserCheckInsHistory(checkInsRepository)
  })

  // afterEach(() => {})

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      gym_id: '12345',
      user_id: '123456',
    })

    await checkInsRepository.create({
      gym_id: '123456789',
      user_id: '123456',
    })

    const { checkIns } = await systemUnderTest.handle({
      userId: '123456',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '12345' }),
      expect.objectContaining({ gym_id: '123456789' }),
    ])
  })

  it('should be able to fetch check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: '123456',
      })
    }

    const { checkIns } = await systemUnderTest.handle({
      userId: '123456',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
