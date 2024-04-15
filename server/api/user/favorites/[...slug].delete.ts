import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function removeItem(userId: number, itemId: string | undefined) {
    return await prisma.favorites.update({
        where: {
            userId: userId
        },
        data: {
            items: { 
                disconnect: { 
                    id: itemId 
                } 
            }
        }
    })
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    return await removeItem(user.id, event.context.params?.slug)
})
