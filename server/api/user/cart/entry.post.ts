import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { id, size, quantity } = getQuery(event)

    await prisma.cart.update({
        where: {
            userId: user?.id
        },
        data: {
            entries: { 
                upsert: {
                    where: {
                        itemId_size: { itemId: id, size: size }
                    },
                    create: {
                        itemId: id,
                        size: size,
                        quantity: quantity ? parseInt(quantity as string) : 1
                    },
                    update: {
                        quantity: {
                            increment: quantity ? parseInt(quantity as string) : 1
                        }
                    }
                }
            }
        }
    })

    return { 
        message: 'Entry added to cart successfully!' 
    }
})
