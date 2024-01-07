import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'
import jwt, { Secret } from 'jsonwebtoken'
import { getByEmail, updatePasswordResetToken } from '~/server/utils/user'

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
    
    // throw error if no account with that email address is found
    await getByEmail({ email: email })

    const token = generateToken()

    await updatePasswordResetToken({
        email: email,
        passwordResetToken: token
    })

    const signedToken = signToken(email, token)

    const template = (await useCompiler('PasswordReset.vue', {
        props: {
            url: `http://localhost:3000/auth/reset-password?token=${signedToken}`
        }
    }))?.html

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })

    transporter.sendMail({
        from: 'The Heavy Shop',
        to: email,
        subject: 'Password reset - The Heavy Shop',
        html: template
    })
    
    return { message: 'Email sent successfully!' }
})
