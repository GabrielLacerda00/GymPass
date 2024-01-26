import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { ValidateCheckInUserCase } from './validate-check-in'
import { ResourchNotExistsError } from './errors/resource-not-exists'
import { ValidateTimeError } from './errors/validate-time-error'

let checkInsRepository: checkInsInMemoryRepository
let systemUnderTest: ValidateCheckInUserCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    systemUnderTest = new ValidateCheckInUserCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: '12345678',
      user_id: '123456',
    })

    const { checkIn } = await systemUnderTest.handle({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date)) // Verifico se tem valor null
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date)) // Valido se realmente houve a validação
  })

  it('should be able not able to validate a inexistent check-in', async () => {
    await expect(() =>
      systemUnderTest.handle({
        checkInId: '211232345456',
      }),
    ).rejects.toBeInstanceOf(ResourchNotExistsError)
  })

  it('should be able not able to validate a inexistent check-in', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: '12345678',
      user_id: '123456',
    })

    const tweentyOnMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(tweentyOnMinutesInMs)

    await expect(() =>
      systemUnderTest.handle({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(ValidateTimeError)
  })
})
