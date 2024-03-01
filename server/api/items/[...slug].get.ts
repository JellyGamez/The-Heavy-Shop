import { getById } from '~/server/utils/item'

export default defineEventHandler(async (event) => {
    return (await getById({ ids: [ event.context.params?.slug ] }))[0]
})
