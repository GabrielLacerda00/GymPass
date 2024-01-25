import { expect, describe, it, beforeEach } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { GetUserMetricsUserCase } from './get-user-metrics'

let checkInsRepository: checkInsInMemoryRepository
let systemUnderTest: GetUserMetricsUserCase

describe('User Metrics Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    systemUnderTest = new GetUserMetricsUserCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: '12345',
      user_id: '123456',
    })

    await checkInsRepository.create({
      gym_id: '123456789',
      user_id: '123456',
    })

    const { userMetrics } = await systemUnderTest.handle({
      userId: '123456',
    })

    expect(userMetrics).toEqual(2)
  })
})
