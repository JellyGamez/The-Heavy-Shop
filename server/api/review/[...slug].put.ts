import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)
    
    const { rating, review } = await readBody(event)

    if (!user)
        throw createError({
            statusCode: 400,
            statusMessage: 'You must be logged in to edit this review.'
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

    try {
        await prisma.review.update({
            where: {
                id: parseInt(event.context.params?.slug as string),
                authorId: user?.id
            },
            data: {
                rating: rating,
                content: review?.trim()
            }
        })
    }
    catch(e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Either the review doesn\'t exist or you\'re not authorized to edit it.'
        })
    }

    return { 
        message: 'Review edited successfully!' 
    }
})
