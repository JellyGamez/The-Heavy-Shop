import { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'
import os from 'os'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)
    
    console.log(os.homedir())
    return user
})
