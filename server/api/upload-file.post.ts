import crypto from 'crypto'

function generateToken() {
    return crypto.randomBytes(32).toString('hex')
}

export default defineEventHandler(async (event) => {
    const { files } = await readBody(event)

    const file = files[0]
    
    console.log(file.type)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
        throw createError({
            statusCode: 400,
            statusMessage: 'The file type is not supported.'
        })

    const path = await storeFileLocally(file, crypto.randomBytes(32).toString('hex'), '/public/avatars')

    return {
        message: 'File uploaded succesfully!',
        path: `/avatars/${path}`
    }
})
