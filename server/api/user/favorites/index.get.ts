import prisma, { getUserByEmail, getItemRating } from '~/server/utils'
import { getServerSession } from '#auth'

async function getItems(userId: number) {
    const items = (await prisma.favorites.findUnique({
        where: {
            userId: userId
        },
        select: {
            items: {
                include: {
                    reviews: true,
                }
            }
        }
    }))?.items
    items?.forEach((item: any, index) => {
        items[index] = { ...item, rating: getItemRating(item.reviews) }
    })

    return items
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)
    return await getItems(user.id)
})
