import { PrismaClient, Item } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

async function getUserByEmail(email: string | null | undefined) {
    try {
        return await prisma.user.findUniqueOrThrow({
            where: {
                email: email as string
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
    }
    catch(e) { 
        throw createError({
            statusCode: 400,
            statusMessage: 'We couldn\'t find that account.'
        })
    }
}

function getItemRating(item: any) {
    if (item.reviews.length === 0)
        return 0
    return item.reviews.map((r: any) => r.rating).reduce((x: any, y: any) => x + y) / item.reviews.length
}

function dateFormatter(date: any) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export { getUserByEmail, getItemRating, dateFormatter }
