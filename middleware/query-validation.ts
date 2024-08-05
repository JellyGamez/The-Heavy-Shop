export default defineNuxtRouteMiddleware((to, from) => {
    const sortByOptions = to.name === 'item-id' ? ['rating', 'date-added'] : ['price', 'review-count', 'rating']

    const { display, ...displayQuery } = to.query
    if (to.name === 'shop' && display && !['grid', 'list'].includes(display as string))
        return navigateTo({
            path: to.path,
            query: displayQuery as any
        })

    const { sortBy, direction, ...sortByQuery } = to.query
    if (
        (sortBy && !sortByOptions.includes(sortBy as string)) || 
        (direction && !['asc', 'desc'].includes(direction as string)) ||
        ((sortBy && !direction) || (!sortBy && direction))
    )
        return navigateTo({
            path: to.path,
            query: sortByQuery as any
        })
})
