import { CheckInsRepository } from '@/repositories/check-ins-reposiroty'

interface GetUserMetricsUserCaseRequest {
  userId: string
}

interface GetUserMetricsUserCaseResponse {
  userMetrics: number
}

export class GetUserMetricsUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async handle({
    userId,
  }: GetUserMetricsUserCaseRequest): Promise<GetUserMetricsUserCaseResponse> {
    const userMetrics =
      await this.checkInsRepository.findMetricsByUserId(userId)

    return {
      userMetrics,
    }
  }
}
