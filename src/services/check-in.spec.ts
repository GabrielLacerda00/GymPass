import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { CheckInUserCase } from './check-in'

let checkInsRepository: checkInsInMemoryRepository
let systemUnderTest: CheckInUserCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    systemUnderTest = new CheckInUserCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in twice in the day', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
    })

    expect(() =>
      systemUnderTest.handle({
        userId: '123456',
        gymId: '12345678',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in diferentt days', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
    })

    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    const { checkIn } = await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
