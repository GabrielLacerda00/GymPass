import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInsRepository } from '../check-ins-reposiroty'
import dayjs from 'dayjs'

export class checkInsInMemoryRepository implements CheckInsRepository {
  // Aqui salvamos na memoria em vez de utilizar o prisma
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDate = dayjs(date).startOf('date') // pego o inicio do dia
    const endOfTheDate = dayjs(date).endOf('date') // pego o fim do dia

    const checkInOnSameDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const isOnTheSameDate =
        checkInDate.isBefore(startOfTheDate) &&
        checkInDate.isAfter(endOfTheDate)

      return checkin.user_id === userId && isOnTheSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

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
