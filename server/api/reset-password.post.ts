import jwt, { Secret } from 'jsonwebtoken'
import { updatePassword, updateToken } from "./prisma/user"

function verifySignedToken(token: string) {
    return jwt.verify(token, process.env.AUTH_SECRET as Secret, function (error, decoded) {
        if (error?.name === 'TokenExpiredError') {
            throw createError({
                statusCode: 400,
                statusMessage: 'The provided token is expired.'
            })
        }
        else if (error?.name === 'JsonWebTokenError') {
            throw createError({
                statusCode: 400,
                statusMessage: 'The provided token is invalid.'
            })
        }

        return decoded
    })
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { password, passwordConfirmation, token } = body

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

    const decodedToken: any = verifySignedToken(token)

    await updatePassword({
        email: decodedToken.email,
        token: decodedToken.token,
        password: password
    })
    await updateToken({
        email: decodedToken.email,
        token: null
    })
    return { message: 'Password reset successfully'}
})