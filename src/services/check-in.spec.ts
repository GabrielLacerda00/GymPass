import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { CheckInUserCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckInsError } from './errors/max-number-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: checkInsInMemoryRepository
let gymsRepository: InMemoryGymsRepository
let systemUnderTest: CheckInUserCase

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    gymsRepository = new InMemoryGymsRepository()
    systemUnderTest = new CheckInUserCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: '12345678',
      title: 'JavaScriptGym',
      description: '',
      phone: '',
      latitude: -8.2853046,
      longitude: -35.9684502,
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
      userLatitude: -8.2853046,
      userLongitude: -35.9684502,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in twice in the day', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: -8.2853046,
      userLongitude: -35.9684502,
    })

    await expect(() =>
      systemUnderTest.handle({
        userId: '123456',
        gymId: '12345678',
        userLatitude: -8.2853046,
        userLongitude: -35.9684502,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should be able to check in twice but in diferentt days', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 8, 0, 0))

    await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: -8.2853046,
      userLongitude: -35.9684502,
    })

    vi.setSystemTime(new Date(2024, 0, 25, 8, 0, 0))

    const { checkIn } = await systemUnderTest.handle({
      userId: '123456',
      gymId: '12345678',
      userLatitude: -8.2853046,
      userLongitude: -35.9684502,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in to distant gym', async () => {
    gymsRepository.items.push({
      id: '12345',
      title: 'JavaScriptGym',
      description: '',
      phone: '',
      latitude: new Decimal(-8.2684899),
      longitude: new Decimal(-35.9354635),
    })

    await expect(() =>
      systemUnderTest.handle({
        userId: '123456',
        gymId: '12345',
        userLatitude: -8.2853046,
        userLongitude: -35.9684502,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
