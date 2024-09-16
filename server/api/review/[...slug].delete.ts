import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    try {
        await prisma.review.delete({
            where: {
                id: parseInt(event.context.params?.slug as string),
                authorId: user?.id
            }
        })
    }
    catch(e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Either the review doesn\'t exist or you\'re not authorized to delete it.'
        })
    }

    return { 
        message: 'Review deleted successfully!' 
    }
})
