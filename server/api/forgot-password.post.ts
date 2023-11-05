import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'
import { getByEmail } from './prisma/user';

const jwt = require('jsonwebtoken')
const crypto = require('Crypto')

const expireSpan = 3600 * 1000
const authSecret = process.env.AUTH_SECRET

function generateToken() {
    return crypto.randomBytes(30).toString('hex')
}

function generateTokenExpire() {
    return new Date(Date.now() + expireSpan)
}

function signToken(email: String, token: String) {
    return jwt.sign({
        email,
        token
    }, authSecret)
}

function verifySignedToken(token: String) {
    return jwt.verify(token, authSecret)
}

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event)
    if (!email)
        throw createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        })

    // throw error if no user with that email is found
    await getByEmail(email)

    const template = await useCompiler('PasswordReset.vue', {
        props: {
            url: `http://localhost:3000/auth/reset-password?token=${verificationToken}`,
        }
    })

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    })

    const options = {
        from: '',
        to: email,
        subject: 'Password reset - The Heavy Shop',
        html: template,
    }

    await transporter.sendMail(options)

    return 'Email sent successfully!'
});
