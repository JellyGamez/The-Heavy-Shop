import { prisma }  from '.'

export default defineEventHandler(async (event) => {
    const users = await prisma.user.findMany()
    return users
})
