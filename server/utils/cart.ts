// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function getItems(data: any) {
//     return await prisma.cart.findUnique({
//         where: {
//             userId: data.user.id
//         }
//     })
// }

// async function addItem(data: any) {
//     return await prisma.cart.update({
//         where: {
//             userId: data.user.id
//         },
//         data: {
//             items: { connect: { id: data.item.id } }
//         },
//     })
// }

// async function removeItem(data: any) {
//     return await prisma.cart.update({
//         where: {
//             userId: data.user.id
//         },
//         data: {
//             items: { disconnect: { id: data.item.id } }
//         },
//     })
// }

// export { getItems, addItem, removeItem }
