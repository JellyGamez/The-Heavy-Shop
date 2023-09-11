import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'elsa@prisma.io',
            username: 'Elsa Prisma',
            password: 'password'
        },
    })
}
main()