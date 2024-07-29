import prisma, { getUserByEmail, getItemRating } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const items = (await prisma.favorites.findUnique({
        where: {
            userId: user?.id
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
        items[index] = { ...item, rating: getItemRating(item) }
    })

    return items
})
