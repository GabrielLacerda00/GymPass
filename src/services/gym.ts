import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface GymUserCaseRequest {
  title: string
  description: string | null
  phone: string
  latitude: number
  longitude: number
}

interface GymUserCaseResponse {
  gym: Gym
}
export class GymUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymUserCaseRequest): Promise<GymUserCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
