import jwt, { Secret } from 'jsonwebtoken'
import { updatePassword, updatePasswordResetToken } from '~/server/utils/user'

function verifySignedToken(token: string) {
    return jwt.verify(token, process.env.AUTH_SECRET as Secret, function (error, decoded) {
        if (error?.name === 'TokenExpiredError') {
            throw createError({
                statusCode: 400,
                statusMessage: 'The token is expired.'
            })
        }
        else if (error?.name === 'JsonWebTokenError') {
            throw createError({
                statusCode: 400,
                statusMessage: 'The token is invalid.'
            })
        }

        return decoded
    })
}

export default defineEventHandler(async (event) => {
    const { password, passwordConfirmation, signedToken } = await readBody(event)

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

    const decodedToken = verifySignedToken(signedToken) as any

    await updatePassword({
        email: decodedToken.email,
        passwordResetToken: decodedToken.token,
        password: password
    })

    await updatePasswordResetToken({
        email: decodedToken.email,
        passwordResetToken: null
    })

    return { message: 'Password reset successfully!' }
})
