import { update } from "./prisma/user"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { password, passwordConfirmation } = body

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

    const data = {
        email,
        password
    }

    const user = await update(data)
    return user
})