import { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function getItems(data: any) {
    return (await prisma.cart.findUnique({
        where: {
            userId: data.userId
        },
        select: {
            items: true
        }
    }))?.items
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail({ email: session?.user?.email })
    return await getItems({ userId: user.id })
})
