import { getServerSession } from '#auth'
import { put } from '@vercel/blob'

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    const user = await getUserByEmail(session?.user?.email)

    const files = await readMultipartFormData(event)

    if (files?.length) {
        const file = files[0]

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type as string))
            throw createError({
                statusCode: 400,
                statusMessage: 'The file type is not supported.'
            })

        const { url } = await put(`avatars/${user?.id}.png`, file.data, { access: 'public' })

        return {
            message: 'File uploaded succesfully!',
            path: url
        }
    }
})
