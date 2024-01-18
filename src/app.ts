import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()

// ORM - Object Realational Mapper
// Instancio para fazer a conexão com DB
const prisma = new PrismaClient()

// Crio um user
prisma.user.create({
  data: {
    name: 'Gabriel Lacerda',
    email: 'gablacerd@gmail.com',
  },
})
