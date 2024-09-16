import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    
    if (session?.user?.email === 'test@theheavyshop.com') {
        throw createError({
            statusCode: 401,
            statusMessage: 'You\'re not authorized to delete this account.'
        })
    }
    
    await prisma.user.delete({
        where: {
            email: session?.user?.email as string
        }
    })

    return {
        message: 'Account deleted successfully!'
    }
})
