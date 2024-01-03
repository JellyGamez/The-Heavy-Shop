import { getItems } from '~/server/utils/favorites'
import { getByEmail } from '~/server/utils/user'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getByEmail({ email: session?.user?.email })

    return await getItems({ userId: user.id })
})
