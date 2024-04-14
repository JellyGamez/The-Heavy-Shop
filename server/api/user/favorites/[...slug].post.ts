import { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function addItem(data: any) {
    return await prisma.favorites.update({
        where: {
            userId: data.userId
        },
        data: {
            items: { 
                connect: { 
                    id: data.itemId 
                } 
            }
        }
    })
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail({ email: session?.user?.email })

    return await addItem({ userId: user.id, itemId: event.context.params?.slug })
})
