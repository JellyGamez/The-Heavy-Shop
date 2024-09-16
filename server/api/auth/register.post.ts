import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

async function create(data: any) {
    try {
        return await prisma.user.create({
            data: {
                ...data,
                password: bcrypt.hashSync(data.password, 10),
                favorites: {
                    create: {
                        items: {
                            create: []
                        }
                    }
                },
                cart: {
                    create: {
                        entries: {
                            create: []
                        }
                    }
                }
            }
        })
    }
    catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002')
                throw createError({
                    statusCode: 500,
                    statusMessage: 'The email isn\'t available.'
                })
        }
        else {
            throw createError({
                statusCode: 500,
                statusMessage: 'An error occured.'
            })
        }
    } 
}

export default defineEventHandler(async (event) => {
    const { name, email, password, passwordConfirmation } = await readBody(event)

    if (!name)
        throw createError({
            statusCode: 400,
            statusMessage: 'The name field is required.'
        })
    else if (!email)
        throw createError({
            statusCode: 400,
            statusMessage: 'The email field is required.'
        })
    else if (!password)
        throw createError({
            statusCode: 400,
            statusMessage: 'The password field is required.'
        })
    else if (!passwordConfirmation)
        throw createError({
            statusCode: 400,
            statusMessage: 'The password confirmation field is required.'
        })
    else if (password.length < 8) {
        throw createError({
            statusCode: 400,
            statusMessage: 'The password must be at least 8 characters.'
        })
    }
    else if (password !== passwordConfirmation)
        throw createError({
            statusCode: 400,
            statusMessage: 'The passwords don\'t match.'
        })

    await create({
        name: name,
        email: email,
        password: password
    })

    return { 
        message: 'Account created successfully!' 
    }
})
