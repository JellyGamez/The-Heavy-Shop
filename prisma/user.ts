import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const create = async (data: any) => {
    try {
        return await prisma.user.create({
            data: {
                ...data,
                password: bcrypt.hashSync(data.password, 10)
            }
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError)
            if (e.code === 'P2002')
                throw createError({
                statusCode: 400,
                statusMessage: 'The email isn\'t available.'
            })
    } 
}

export const updatePasswordResetToken = async (data: any) => {
    return await prisma.user.update({
        where: {
            email: data.email
        },
        data: {
            passwordResetToken: data.passwordResetToken
        }
    })
}

export const updatePassword = async (data: any) => {
    try {
        return await prisma.user.update({
            where: {
                email: data.email,
                passwordResetToken: data.passwordResetToken
            },
            data: {
                password: bcrypt.hashSync(data.password, 10)
            }
        })
    }
    catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError)
            if (e.code === 'P2025')
                throw createError({
                statusCode: 400,
                statusMessage: 'The token is invalid.'
            })
    } 

}

export const getByEmail = async (email: any) => {
    return await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: 'We couldn\'t find that account.'
        })
    })
}

export const getById = async (id: any) => {
    return await prisma.user.findUniqueOrThrow({
        where: {
            id: id
        }
    })
}
