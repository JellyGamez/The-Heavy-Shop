import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { sortBy, direction } = getQuery(event)

    const options = {
        'price': {
            price: direction
        },
        'review-count': {
            reviews: {
                _count: direction
            }
        }
    }[sortBy as string]

    const items = (await prisma.favorites.findUnique({
        where: {
            userId: user?.id
        },
        select: {
            items: {
                orderBy: options as any,
                include: {
                    reviews: {
                        select: {
                            rating: true
                        }
                    }
                }
            }
        }
    }))?.items
    
    items?.forEach((item: any, index: any) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    if (sortBy === 'rating')
        items?.sort((a: any, b: any) => direction === 'asc' ? a.rating - b.rating : b.rating - a.rating)

    return items
})
