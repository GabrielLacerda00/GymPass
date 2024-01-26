import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-reposiroty'
import { ResourchNotExistsError } from './errors/resource-not-exists'
import dayjs from 'dayjs'
import { ValidateTimeError } from './errors/validate-time-error'

interface ValidateCheckInUserCaseRequest {
  checkInId: string
}

interface ValidateCheckInUserCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle({
    checkInId,
  }: ValidateCheckInUserCaseRequest): Promise<ValidateCheckInUserCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourchNotExistsError()
    }

    // validate minutes after a check-in creation
    const rangeTimeInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (rangeTimeInMinutesFromCheckInCreation > 20) {
      throw new ValidateTimeError()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
