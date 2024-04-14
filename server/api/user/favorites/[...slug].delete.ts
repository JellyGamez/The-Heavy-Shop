import { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function removeItem(data: any) {
    return await prisma.favorites.update({
        where: {
            userId: data.userId
        },
        data: {
            items: { 
                disconnect: { 
                    id: data.itemId 
                } 
            }
        }
    })
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail({ email: session?.user?.email })

    return await removeItem({ userId: user.id, itemId: event.context.params?.slug })
})
