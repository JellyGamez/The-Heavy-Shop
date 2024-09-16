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
                        cartId_itemId_size: { 
                            cartId: user?.id as number,
                            itemId: id as string, 
                            size: size as string
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
