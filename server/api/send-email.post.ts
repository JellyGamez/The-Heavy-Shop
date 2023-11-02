import { useCompiler } from '#vue-email'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
    const { email } = await readBody(event)
    if (!email)
    {
        throw createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        })
    }

    const template = await useCompiler('TemplateEmail.vue', {
        props: {
        url: 'https://vuemail.net/',
        }
    })


    const testAccount = await nodemailer.createTestAccount()
    console.log(testAccount)
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST || 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'alexcroitoriu2005@gmail.com',
                pass: 'cccz seqg octh sept',
            },
        })

        const options = {
            from: 'alexcroitoriu2005@gmail.com',
            to: email,
            subject: 'hello world',
            html: template,
        }

        await transporter.sendMail(options)
        return { message: 'Email sent' }
    }
    catch(error)
    {
        console.log(error)
    }

});
