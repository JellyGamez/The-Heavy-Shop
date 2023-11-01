import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session)
        return 'You are not logged in!'
    else
        return session
})