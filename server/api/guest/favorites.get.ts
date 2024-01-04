import { getById } from '~/server/utils/item'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    
    let ids = query.ids ?? []
    if (!Array.isArray(ids))
        ids = Array.of(ids)

    return await getById({ ids: ids })
})
