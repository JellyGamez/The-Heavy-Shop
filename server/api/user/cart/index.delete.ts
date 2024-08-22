import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { id, size } = getQuery(event)

    await prisma.cart.update({
        where: {
            userId: user?.id
        },
        data: {
            entries: {
                delete: {
                    itemId_size: { 
                        itemId: id, 
                        size: size 
                    }
                }
            }
        }
    })

    return { 
        message: 'Entry removed from cart successfully!' 
    }
})
