import prisma, { getItemRating } from "~/server/utils"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    
    let ids = query.ids ?? [] as any
    if (!Array.isArray(ids))
        ids = Array.of(ids)

    const items = await prisma.item.findMany({
        where: {
            id: {
                in: ids
            }
        },
        include: {
            reviews: true
        }
    })

    items?.forEach((item: any, index) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    return items
})
