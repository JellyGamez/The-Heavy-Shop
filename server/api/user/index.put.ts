import prisma from '~/server/utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)

    const body = await readBody(event)
    
    await prisma.user.update({
        where: {
            email: session?.user?.email as string
        },
        data: body
    })

    return {
        message: 'Account updated successfully!'
    }
})
