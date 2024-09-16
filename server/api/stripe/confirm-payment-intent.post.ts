import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const entries = (await prisma.cart.findUnique({
        where: {
            userId: user?.id
        },
        select: {
            entries: {
                include: {
                    item: true
                }
            }
        }
    }))?.entries

    await prisma.cart.update({
        where: {
            userId: user?.id
        },
        data: {
            entries: {
                deleteMany: {}
            }
        }
    })

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })

    const template = (await useCompiler('OrderConfirmation.vue', {
        props: {
            entries: entries
        }
    }))

    await transporter.sendMail({
        from: 'The Heavy Shop',
        to: user?.email,
        subject: 'Order confirmation - The Heavy Shop',
        html: template.html
    })

    return { 
        message: 'Email sent successfully!' 
    }
})