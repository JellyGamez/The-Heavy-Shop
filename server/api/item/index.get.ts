import prisma from '~/server/utils'

export default defineEventHandler(async (event) => {
    return await prisma.item.findMany({
        include: {
            _count: {
                select: {
                    reviews: true
                }
            }
        }
    })
})