import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { id } = getQuery(event)

    await prisma.favorites.update({
        where: {
            userId: user?.id
        },
        data: {
            items: { 
                disconnect: { 
                    id: id as any
                } 
            }
        }
    })

    return {
        message: 'Item removed from favorites successfully!' 
    }
})
