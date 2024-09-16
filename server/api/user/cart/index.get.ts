import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { sortBy, direction } = getQuery(event)

    const options = {
        'review-count': {
            item: {
                reviews: {
                    _count: direction
                }
            }
        }
    }[sortBy as string] ?? { createdAt: 'asc' }

    const entries = (await prisma.cart.findUnique({
        where: {
            userId: user?.id
        },
        select: {
            entries: {
                orderBy: options as any,
                include: {
                    item: {
                        include: {
                            reviews: {
                                select: {
                                    rating: true
                                }
                            }
                        }
                    }
                }
            }
        }
    }))?.entries
    
    entries?.forEach((entry: any, index: any) => {
        entries[index].item = { ...entry.item, rating: getItemRating(entry.item) }
    })

    if (sortBy === 'rating')
        entries?.sort((a: any, b: any) => direction === 'asc' ? a.item.rating - b.item.rating : b.item.rating - a.item.rating)
    else if (sortBy === 'price')
        entries?.sort((a: any, b: any) => direction === 'asc' ? a.item.price * a.quantity - b.item.price * b.quantity : b.item.price * b.quantity - a.item.price * a.quantity)

    return entries
})
