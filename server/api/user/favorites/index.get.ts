import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function getItems(userId: number) {
    return (await prisma.favorites.findUnique({
        where: {
            userId: userId
        },
        select: {
            items: {
                include: {
                    _count: {
                        select: {
                            reviews: true
                        }
                    }
                }
            }
        }
    }))?.items
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)
    return await getItems(user.id)
})
