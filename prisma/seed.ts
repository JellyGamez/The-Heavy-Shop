import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.upsert({
        where: {
            email: 'admin@theheavyshop.com',
        },
        update: {

        },
        create: {
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
                    entries: {
                        create: []
                    }
                },
            },
        },
    })

    for (let i = 1; i <= 9; i++) {
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: bcrypt.hashSync('password', 10),
                photoUrl: faker.image.avatar(),
                favorites: {
                    create: {
                        items: {
                            create: []
                        }
                    },
                },
                cart: {
                    create: {
                        entries: {
                            create: []
                        }
                    },
                },
            },
        })
    }

    for (let i = 1; i <= 50; i++) {
        const n = faker.number.int({ min: 0, max: 10 })
        const template = () => {
            return {
                rating: faker.number.int({ min: 1, max: 5 }),
                content: faker.lorem.paragraph(),
                verified: faker.datatype.boolean(),
                authorId: faker.number.int({ min: 1, max: 10 })
            }
        }
        
        let reviews = []
        for (let j = 1; j <= n; j++)
            reviews.push(template() as any)

        await prisma.item.create({
            data: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.number.float({ min: 10, max: 99, multipleOf: 0.01 }).toFixed(2)),
                photoUrl: faker.image.url(),
                reviews: {
                    create: reviews
                },
                sizes: ['S', 'M', 'L', 'XL', '2XL']
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
    