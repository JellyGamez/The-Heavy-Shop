async function create(data: any) {
    return await prisma.review.create({
        data: data
    })
}

export { create }