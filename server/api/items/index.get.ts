import { getAll } from '~/server/utils/item'

export default defineEventHandler(async (event) => {
    return await getAll()
})