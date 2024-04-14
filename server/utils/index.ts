import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

async function getUserByEmail(data: any) {
    return await prisma.user.findUniqueOrThrow({
        where: {
            email: data.email
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: 'We couldn\'t find that account.'
        })
    })
}

export { getUserByEmail }
