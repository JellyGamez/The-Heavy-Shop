import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from "bcrypt"

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
                statusMessage: 'The provided email isn\'t available.'
            })
    } 
}

export const update = async (data: any) => {
    // verificationToken will be unique in practice
    return await prisma.user.updateMany({
        where: {
            verificationToken: data.verificationToken
        },
        data: {
            password: bcrypt.hashSync(data.password, 10)
        }
    })
}

export const getByEmail = async (email: any) => {
    return await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    }).catch(() => {
        throw createError({
            statusCode: 400,
            statusMessage: 'No account found for the provided email.'
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