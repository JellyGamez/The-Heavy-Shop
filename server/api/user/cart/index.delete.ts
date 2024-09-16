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
                    cartId_itemId_size: { 
                        cartId: user?.id as number,
                        itemId: id as string, 
                        size: size as string
                    }
                }
            }
        }
    })

    return { 
        message: 'Entry removed from cart successfully!' 
    }
})
