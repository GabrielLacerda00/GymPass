import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { checkInsInMemoryRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository'
import { ValidateCheckInUserCase } from './validate-check-in'

let checkInsRepository: checkInsInMemoryRepository
let systemUnderTest: ValidateCheckInUserCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    // eslint-disable-next-line new-cap
    checkInsRepository = new checkInsInMemoryRepository()
    systemUnderTest = new ValidateCheckInUserCase(checkInsRepository)

    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
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
})
