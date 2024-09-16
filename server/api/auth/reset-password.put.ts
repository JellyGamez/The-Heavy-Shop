import bcrypt from 'bcrypt'
import prisma from '~/server/utils'
import { Prisma } from '@prisma/client'
import jwt, { Secret } from 'jsonwebtoken'

async function updatePassword(email: string, passwordResetToken: string, password: string) {
    try {
        return await prisma.user.update({
            where: {
                email: email,
                passwordResetToken: passwordResetToken
            },
            data: {
                password: bcrypt.hashSync(password, 10)
            }
        })
    }
    catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError)
            if (e.code === 'P2025')
                throw createError({
                    statusCode: 500,
                    statusMessage: 'The password reset token is invalid.'
                })
    } 
}

async function updatePasswordResetToken(email: string, passwordResetToken: string | null) {
    return await prisma.user.update({
        where: {
            email: email
        },
        data: {
            passwordResetToken: passwordResetToken
        }
    })
}

function verifySignedToken(token: string) {
    return jwt.verify(token, process.env.AUTH_SECRET as Secret, function(error, decoded) {
        if (error?.name === 'TokenExpiredError') {
            throw createError({
                statusCode: 500,
                statusMessage: 'The password reset token is expired.'
            })
        }
        else if (error?.name === 'JsonWebTokenError') {
            throw createError({
                statusCode: 500,
                statusMessage: 'The password reset token is invalid.'
            })
        }

        return decoded
    })
}

export default defineEventHandler(async (event) => {
    const { password, passwordConfirmation, signedToken } = await readBody(event)
    const decodedToken = verifySignedToken(signedToken) as any

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
    else if (decodedToken.email === 'test@theheavyshop.com')
        throw createError({
            statusCode: 401,
            statusMessage: 'You\'re not authorized to reset the password for this account.'
        })

    await updatePassword(decodedToken.email, decodedToken.token, password)
    await updatePasswordResetToken(decodedToken.email, null)

    return { 
        message: 'Password reset successfully!',
        email: decodedToken.email
    }
})
