import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-reposiroty'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourchNotExistsError } from './errors/resource-not-exists'

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUserCaseResponse {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async handle({
    userId,
    gymId,
  }: CheckInUserCaseRequest): Promise<CheckInUserCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourchNotExistsError()
    }

    // Calculate distance between gym and user

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })
    return {
      checkIn,
    }
  }
}
