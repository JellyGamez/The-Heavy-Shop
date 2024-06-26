import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: 'admin@theheavyshop.com',
            name: 'Admin',
            password: bcrypt.hashSync('password', 10),
            favorites: {
                create: {
                    items: {
                        create: []
                    }
                },
            },
            cart: {
                create: {
                    items: {
                        create: []
                    }
                },
            },
        },
    })

    for (let i = 1; i <= 10; i++) {
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: bcrypt.hashSync('password', 10),
                favorites: {
                    create: {
                        items: {
                            create: []
                        }
                    },
                },
                cart: {
                    create: {
                        items: {
                            create: []
                        }
                    },
                },
            },
        })
    }

    for (let i = 1; i <= 50; i++) {
        const a = faker.number.int({ min: 1, max: 5 }), b = faker.number.int({ min: 1, max: 5 })
        await prisma.item.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.number.float({ min: 10, max: 500, multipleOf: 0.01 }),
                photoUrl: faker.image.url(),
                reviews: {
                    create: [
                        {
                            rating: a,
                            content: faker.lorem.paragraph(),
                            verified: faker.datatype.boolean(),
                            authorId: faker.number.int({ min: 1, max: 10 })
                        },
                        {
                            rating: b,
                            content: faker.lorem.paragraph(),
                            verified: faker.datatype.boolean(),
                            authorId: faker.number.int({ min: 1, max: 10 })
                        },
                    ]
                }
            }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
    