import { Prisma } from '@prisma/client'
import prisma from './prisma'
import bcrypt from 'bcrypt'

async function getByEmail(data: any) {
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

export { getByEmail }
