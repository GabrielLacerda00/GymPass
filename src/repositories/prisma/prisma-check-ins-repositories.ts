import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-reposiroty'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDate = dayjs(date).startOf('date') // pego o inicio do dia
    const endOfTheDate = dayjs(date).endOf('date') // pego o fim do dia

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDate.toDate(),
          lte: endOfTheDate.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // Defino quantos eu quero trazer
      skip: (page - 1) * 20, // Defino o limite/ o pulo
    })

    return checkIns
  }

  async findMetricsByUserId(userId: string): Promise<number> {
    const userMetrics = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return userMetrics
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async save(checkIn: CheckIn) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
    return updatedCheckIn
  }
}
