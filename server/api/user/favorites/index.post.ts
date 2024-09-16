import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const query = getQuery(event)
    let ids = query.ids
    if (!Array.isArray(ids))
        ids = Array.of(ids)
    
    await prisma.favorites.update({
        where: {
            userId: user?.id
        },
        data: {
            items: { 
                connect: ids.map((id: any) => { 
                    return { 
                        id: id 
                    } 
                })
            }
        }
    })

    return { 
        message: 'Items added to favorites successfully!' 
    }
})
