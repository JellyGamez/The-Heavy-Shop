import prisma, { getItemRating } from '~/server/utils'

export default defineEventHandler(async (event) => {
    let items = await prisma.item.findMany({
        include: {
            reviews: true
        }
    })

    items?.forEach((item: any, index) => {
        items[index] = { ...item, rating: getItemRating(item) }
    })

    return items
})