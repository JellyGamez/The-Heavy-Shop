import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'
import jwt, { Secret } from 'jsonwebtoken'
import prisma, { getUserByEmail } from '~/server/utils'

async function updatePasswordResetToken(email: string, passwordResetToken: string) {
    return await prisma.user.update({
        where: {
            email: email
        },
        data: {
            passwordResetToken: passwordResetToken
        }
    })
}

function generateToken() {
    return crypto.randomBytes(30).toString('hex')
}

function signToken(email: string, token: string) {
    return jwt.sign(
        {
            email,
            token
        },
        process.env.AUTH_SECRET as Secret,
        { expiresIn: '1800s' }
    )
}

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event)

    if (!email)
        throw createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        })

    await getUserByEmail(email)

    const token = generateToken()
    const signedToken = signToken(email, token)

    await updatePasswordResetToken(email, token)

    const template = (await useCompiler('PasswordReset.vue', {
        props: {
            url: `${process.env.AUTH_ORIGIN}/auth/reset-password?token=${signedToken}`
        }
    }))

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })

    await transporter.sendMail({
        from: 'The Heavy Shop',
        to: email,
        subject: 'Password reset - The Heavy Shop',
        html: template.html
    })

    return { 
        message: 'Email sent successfully!' 
    }
})
