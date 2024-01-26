import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-reposiroty'
import { ResourchNotExistsError } from './errors/resource-not-exists'

interface ValidateCheckInUserCaseRequest {
  checkInId: string
}

interface ValidateCheckInUserCaseResponse {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle({
    checkInId,
  }: ValidateCheckInUserCaseRequest): Promise<ValidateCheckInUserCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (checkIn === null) {
      throw new ResourchNotExistsError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
