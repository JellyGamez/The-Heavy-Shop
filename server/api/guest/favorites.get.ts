export default defineEventHandler(async (event) => {
    const { sortBy, direction, ...query } = getQuery(event)
    
    let ids = query.ids ?? [] as any
    if (!Array.isArray(ids))
        ids = Array.of(ids)

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

    const items = await prisma.item.findMany({
        orderBy: options as any,
        where: {
            id: {
                in: ids
            }
        },
        include: {
            reviews: {
                select: {
                    rating: true
                }
            }
        }
    })

    items?.forEach((item: any, index: any) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    if (sortBy === 'rating')
        items.sort((a: any, b: any) => direction === 'asc' ? a.rating - b.rating : b.rating - a.rating)

    return items
})
