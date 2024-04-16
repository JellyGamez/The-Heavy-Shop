import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function addItem(userId: number, itemId: string) {
    return await prisma.favorites.update({
        where: {
            userId: userId
        },
        data: {
            items: { 
                connect: { 
                    id: itemId 
                } 
            }
        }
    })
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)
    
    return await addItem(user.id, event.context.params?.slug as string)
})
