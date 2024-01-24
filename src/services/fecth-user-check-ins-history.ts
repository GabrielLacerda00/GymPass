import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-reposiroty'

interface FetchUserCheckInsHistoryUserCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUserCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistory {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle({
    userId,
    page,
  }: FetchUserCheckInsHistoryUserCaseRequest): Promise<FetchUserCheckInsHistoryUserCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
