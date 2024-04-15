import prisma, { getItemRating, formatter } from "~/server/utils"

export default defineEventHandler(async (event) => {
    try {
        const item = await prisma.item.findUniqueOrThrow({
            where: {
                id: [ event.context.params?.slug ][0]
            },
            include: {
                reviews: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        item.reviews?.forEach((review: any, index) => {
            item.reviews[index] = { ...review, createdAt: formatter(review.createdAt) }
        })

        return { ...item, rating: getItemRating(item) }
    } 
    catch(e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'We couldn\'t find that item',
        })
    }
})
