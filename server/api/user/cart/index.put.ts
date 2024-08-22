import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { id, size, type } = getQuery(event)

    const options = {
        'increment': {
            increment: 1
        },
        'decrement': {
            decrement: 1
        }
    }[type as string]

    await prisma.cart.update({
        where: {
            userId: user?.id
        },
        data: {
            entries: { 
                update: {
                    where: {
                        itemId_size: { 
                            itemId: id, 
                            size: size 
                        }
                    },
                    data: {
                        quantity: options
                    }
                }
            }
        }
    })

    return { 
        message: 'Entry from cart updated successfully!' 
    }
})
