import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUserCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUserCaseResponse {
  gyms: Gym[]
}
export class FetchNearbyGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async handle({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUserCaseRequest): Promise<FetchNearbyGymsUserCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
