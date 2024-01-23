import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-reposiroty'

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUserCaseResponse {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle({
    userId,
    gymId,
  }: CheckInUserCaseRequest): Promise<CheckInUserCaseResponse> {
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
