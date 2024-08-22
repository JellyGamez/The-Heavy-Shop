import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const query = getQuery(event)
    let entries = JSON.parse(query.entries as any)
    if (!Array.isArray(entries))
        entries = Array.of(entries)

    console.log(entries)
    for (const entry of entries) {
        console.log(entry)
        await prisma.cart.update({
            where: {
                userId: user?.id
            },
            data: {
                entries: { 
                    upsert: {
                        where: {
                            itemId_size: { 
                                itemId: entry.id, 
                                size: entry.size 
                            }
                        },
                        create: {
                            itemId: entry.id,
                            size: entry.size,
                            quantity: entry.quantity ? parseInt(entry.quantity as string) : 1
                        },
                        update: {
                            quantity: {
                                increment: entry.quantity ? parseInt(entry.quantity as string) : 1
                            }
                        }
                    }
                }
            }
        })
    }

    return { 
        message: 'Entries added to cart successfully!' 
    }
})
