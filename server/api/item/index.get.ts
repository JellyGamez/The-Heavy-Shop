import prisma, { getItemRating } from '~/server/utils'

export default defineEventHandler(async (event) => {
    const { page, sortBy, direction, ...query } = getQuery(event)
    
    const search = (query?.search as string ?? '').trim().replace(/[^0-9a-z\-\ ]/gi, '')

    const runtimeConfig = useRuntimeConfig()

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
        },
        where: {
            OR: [
                {
                    name: {
                        search: search.split(' ').join(' & '),
                        mode: 'insensitive'
                    }
                },
                {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        take: runtimeConfig.public.perPage,
        skip: runtimeConfig.public.perPage * ((page as number ?? 1) - 1)
    })

    const count = await prisma.item.count({
        where: {
            OR: [
                {
                    name: {
                        search: search.split(' ').join(' & '),
                        mode: 'insensitive'
                    }
                },
                {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    })

    items?.forEach((item: any, index: any) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    if (sortBy === 'rating')
        items?.sort((a: any, b: any) => direction === 'asc' ? a.rating - b.rating : b.rating - a.rating)

    return {
        items: items,
        count: count
    }
})
