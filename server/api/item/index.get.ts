import prisma, { getItemRating } from '~/server/utils'

export default defineEventHandler(async (event) => {
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
    
    let items = await prisma.item.findMany({
        orderBy: options as any,
        include: {
            reviews: true
        }
    })

    items?.forEach((item: any, index) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    if (sortBy === 'rating')
        items?.sort((a: any, b: any) => direction === 'asc' ? a.rating - b.rating : b.rating - a.rating)

    return items
})
