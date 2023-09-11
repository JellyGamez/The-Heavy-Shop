import { prisma } from "."
import bcrypt from "bcrypt"

export const create = (data: any) => {
    return prisma.user.create({
        data: {
            ...data,
            password: bcrypt.hashSync(data.password, 10)
        }
    })
}

export const getByEmail = async (email: any) => {
    return prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    }).catch((e) => {
        throw createError({
            statusCode: 400,
            statusMessage: 'No account with the given email was found.'
        })
    })
}

export const getById = (id: any) => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id: id
        }
    })
}