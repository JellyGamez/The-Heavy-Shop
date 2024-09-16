import bcrypt from 'bcrypt'
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
    else if (password.length < 8) {
        throw createError({
            statusCode: 400,
            statusMessage: 'The password must be at least 8 characters.'
        })
    }
    else if (password !== passwordConfirmation)
        throw createError({
            statusCode: 400,
            statusMessage: 'The passwords don\'t match.'
        })
    else if (session?.user?.email === 'test@theheavyshop.com')
        throw createError({
            statusCode: 401,
            statusMessage: 'You\'re not authorized to update the password for this account.'
        })

    await updatePassword(session?.user?.email as string, password)

    return { 
        message: 'Password updated successfully!'
    }
})
