import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function deleteReview(userId: number, reviewId: number) {
    try {
        return await prisma.review.delete({
            where: {
                id: reviewId,
                authorId: userId
            }
        })
    }
    catch(e) {
        console.log(e)
        throw createError({
            statusCode: 500,
            statusMessage: 'Either the review doesn\'t exist or you\'re not authorized to delete it.'
        })
    }
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    return await deleteReview(user.id, parseInt(event.context.params?.slug as string))
})
