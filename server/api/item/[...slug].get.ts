import prisma, { getUserByEmail, getItemRating, dateFormatter } from "~/server/utils"
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { orderBy, sort } = getQuery(event)

    const options = {
        'Date added': {
            createdAt: sort
        },
        'Rating': {
            rating: sort
        }
    }[orderBy as string]

    if ((orderBy && !['Date added', 'Rating'].includes(orderBy as string)) || (sort && !['asc', 'desc'].includes(sort as string)))
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.'
        })

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

        item.reviews?.forEach((review: any, index) => {
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
