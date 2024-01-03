import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getById(data: any) {
    return await prisma.item.findMany({
        where: {
            id: {
                in: data.ids
            }
        }
    })
}

export { getById }
