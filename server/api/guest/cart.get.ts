import prisma from "~/server/utils"

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    
    let ids = query.ids ?? [] as any
    if (!Array.isArray(ids))
        ids = Array.of(ids)

    return await prisma.item.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
})
