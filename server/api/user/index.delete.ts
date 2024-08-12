import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    
    await prisma.user.delete({
        where: {
            email: session?.user?.email as string
        }
    })

    return {
        message: 'Account deleted successfully!'
    }
})
