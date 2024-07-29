import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    await prisma.favorites.update({
        where: {
            userId: user?.id
        },
        data: {
            items: { 
                disconnect: { 
                    id: event.context.params?.slug
                } 
            }
        }
    })

    return { 
        message: 'Item removed from favorites successfully!' 
    }
})
