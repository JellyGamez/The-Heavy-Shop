import { create } from "./prisma/user"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, email, password, passwordConfirmation } = body

    if (!username)
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'The username field is required.'
        }))
    else if (!email)
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        }))
    else if (!password)
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'The password field is required.'
        }))
    else if (!passwordConfirmation)
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'The password confirmation field is required.'
        }))
    else if (password !== passwordConfirmation)
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'The passwords do not match.'
        }))

    const data = {
        username,
        email,
        password
    }

    const user = await create(data)
    return user
})