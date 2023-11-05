import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'
import { getByEmail } from './prisma/user';

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event)
    if (!email)
        throw createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        })
    
    await getByEmail(email)

    const template = await useCompiler('PasswordReset.vue', {
        props: {
            url: 'https://vuemail.net/',
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
        from: 'The Heavy Shop',
        to: email,
        subject: 'Password reset - The Heavy Shop',
        html: template,
    }

    await transporter.sendMail(options)
    
    return 'Email sent successfully!'
});
