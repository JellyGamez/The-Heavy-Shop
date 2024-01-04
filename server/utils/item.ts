import prisma from './prisma'

async function getAll() {
    return await prisma.item.findMany()
}

async function getById(data: any) {
    return await prisma.item.findMany({
        where: {
            id: {
                in: data.ids
            }
        }
    })
}

export { getAll, getById }
