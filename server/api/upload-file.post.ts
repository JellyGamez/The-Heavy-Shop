import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    const { files } = await readBody(event)

    const file = files[0]
    if (!file)
        return
    
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
        throw createError({
            statusCode: 400,
            statusMessage: 'The file type is not supported.'
        })

    const path = await storeFileLocally(file, crypto.randomBytes(32).toString('hex'), '/public/storage')

    return {
        message: 'File uploaded succesfully!',
        path: `/storage/${path}`
    }
})
