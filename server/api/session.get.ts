import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {

    const session = await getServerSession(event)
    if (!session)
        return { status: 'unauthenticated' }
    else
        return { email: session.user?.email, username: session.user?.name}

})