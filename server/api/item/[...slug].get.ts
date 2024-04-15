import prisma, { getItemRating } from "~/server/utils"

export default defineEventHandler(async (event) => {
    try {
        const item = await prisma.item.findUniqueOrThrow({
            where: {
                id: [ event.context.params?.slug ][0]
            },
            include: {
                reviews: true
            }
        })

        return { ...item, rating: getItemRating(item?.reviews) }
    } 
    catch(e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'We couldn\'t find that item',
        })
    }
})
