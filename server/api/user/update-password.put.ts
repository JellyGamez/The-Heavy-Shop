import bcrypt from 'bcrypt'
import prisma, { getUserByEmail } from '~/server/utils'
import { getServerSession } from '#auth'

async function updatePassword(email: string, password: string) {
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            password: bcrypt.hashSync(password, 10)
        }
    })
}

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)

    const { password, passwordConfirmation } = await readBody(event)

    if (!password)
        throw createError({
            statusCode: 400,
            statusMessage: 'The password field is required.'
        })
    else if (!passwordConfirmation)
        throw createError({
            statusCode: 400,
            statusMessage: 'The password confirmation field is required.'
        })
    else if (password !== passwordConfirmation)
        throw createError({
            statusCode: 400,
            statusMessage: 'The passwords do not match.'
        })

    await updatePassword(session?.user?.email as string, password)

    return { 
        message: 'Password updated successfully!'
    }
})