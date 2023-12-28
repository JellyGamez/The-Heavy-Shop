import { create } from '~/server/utils/user'

export default defineEventHandler(async (event) => {
    const { name, email, password, passwordConfirmation } = await readBody(event)

    if (!name)
        throw createError({
            statusCode: 400,
            statusMessage: 'The name field is required.'
        })
    else if (!email)
        throw createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        })
    else if (!password)
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

    await create({
        name: name,
        email: email,
        password: password
    })

    return { message: 'User created successfully!' }
})
