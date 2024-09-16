import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const { rating, review, itemId } = await readBody(event)

    const existingReview = await prisma.review.findFirst({
        where: {
            itemId: itemId,
            authorId: user?.id
        }
    })

    if (!user)
        throw createError({
            statusCode: 400,
            statusMessage: 'You must be logged in to add a review.'
        })
    else if (!rating)
        throw createError({
            statusCode: 400,
            statusMessage: 'The rating field is required.'
        })
    else if (!review)
        throw createError({
            statusCode: 400,
            statusMessage: 'The review field is required.'
        })
    else if (existingReview)
        throw createError({
            statusCode: 400,
            statusMessage: 'You already added a review for this item.'
        })

    await prisma.review.create({
        data: {
            rating: rating,
            content: review?.trim(),
            itemId: itemId,
            authorId: user?.id
        }
    })

    return { 
        message: 'Review added successfully!' 
    }
})
