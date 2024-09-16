export default defineEventHandler(async (event) => {
    const { sortBy, direction, ...query } = getQuery(event)
    
    let entries = query.ids ?? [] as any
    if (!Array.isArray(entries))
        entries = Array.of(entries)

    entries?.forEach((entry: any, index: any) => {
        entries[index] = JSON.parse(entry)
    })

    const items = await prisma.item.findMany({
        where: {
            id: {
                in: entries.map((entry: any) => entry.id)
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

    entries?.forEach((entry: any, index: any) => {
        const item = items.find((item: any) => item.id === entry.id)
        entries[index] = { ...entry, item: { ...item, rating: getItemRating(item)} }
    })

    if (sortBy === 'rating')
        entries.sort((a: any, b: any) => direction === 'asc' ? a.item.rating - b.item.rating : b.item.rating - a.item.rating)
    else if (sortBy === 'price')
        entries?.sort((a: any, b: any) => direction === 'asc' ? a.item.price * a.quantity - b.item.price * b.quantity : b.item.price * b.quantity - a.item.price * a.quantity)
    else if (sortBy === 'review-count')
        entries?.sort((a: any, b: any) => direction === 'asc' ? a.item.reviews?.length - b.item.reviews?.length : b.item.reviews?.length - a.item.reviews?.length)

    return entries
})
