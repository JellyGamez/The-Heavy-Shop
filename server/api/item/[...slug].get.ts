import prisma, { getUserByEmail, getItemRating, dateFormatter } from "~/server/utils"
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { sortBy, direction } = getQuery(event)

    const options = {
        'rating': {
            rating: direction
        },
        'date-added': {
            createdAt: direction
        }
    }[sortBy as string]

    try {
        const item = await prisma.item.findUniqueOrThrow({
            where: {
                id: [ event.context.params?.slug ][0]
            },
            include: {
                reviews: {
                    orderBy: options as any,
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

        item.reviews?.forEach((review: any, index: any) => {
            item.reviews[index] = { ...review, createdAt: dateFormatter(review?.createdAt) }
        })

        if (item.reviews?.length !== 0 && !options && user)
            item.reviews?.unshift(
                item.reviews?.splice(
                    item.reviews?.findIndex(review => review?.authorId === user?.id), 1
                )[0]
            )

        return { ...item, rating: getItemRating(item) }
    } 
    catch(e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'We couldn\'t find that item.'
        })
    }
})
