import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getItems(data: any) {
    const response = await prisma.favorites.findUnique({
        where: {
            userId: data.userId
        },
        select: {
            items: true
        }
    })
    return response?.items
}

async function addItem(data: any) {
    return await prisma.favorites.update({
        where: {
            userId: data.userId
        },
        data: {
            items: { connect: { id: data.itemId } }
        },
    })
}

async function removeItem(data: any) {
    return await prisma.favorites.update({
        where: {
            userId: data.userId
        },
        data: {
            items: { disconnect: { id: data.itemId } }
        },
    })
}

export { getItems, addItem, removeItem }
