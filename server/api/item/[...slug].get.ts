import prisma from "~/server/utils"

export default defineEventHandler(async (event) => {
    const item = await prisma.item.findUnique({
        where: {
            id: [ event.context.params?.slug ][0]
        },
        include: {
            reviews: true
        }
    })
})
