import prisma from "~/server/utils"

export default defineEventHandler(async (event) => {
    return await prisma.item.findUnique({
        where: {
            id: [ event.context.params?.slug ][0]
        }
    })
})
