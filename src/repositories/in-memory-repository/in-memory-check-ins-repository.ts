import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../check-ins-reposiroty'

export class checkInsInMemoryRepository implements CheckInsRepository {
  // Aqui salvamos na memoria em vez de utilizar o prisma
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    // Crio um checkin
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    // Salvo na minha memória
    this.items.push(checkIn)
    return checkIn
  }
}
