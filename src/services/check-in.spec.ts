import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { CheckInUserCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: checkInsInMemoryRepository
let gymsRepository: InMemoryGymsRepository
let systemUnderTest: CheckInUserCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new CheckInUserCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: '12345678',
      title: 'JavaScriptGym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in twice in the day', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      systemUnderTest.handle({
        userId: '123456',
        gymId: '12345678',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in diferentt days', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    const { checkIn } = await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
