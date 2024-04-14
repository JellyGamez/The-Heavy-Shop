import prisma from './prisma'

async function getRating(data: any) {
    const reviews = (await prisma.item.findUnique({
        where: {
            id: data.id
        },
        select: {
            reviews: true
        }
    }))?.reviews ?? []

    if (!reviews.length)
        return 0
    else
        return reviews.map(r => r.rating).reduce((x, y) => x + y, 0) / reviews.length
}

export { getRating }
