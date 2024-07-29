// import { queryValidationRules } from "~/server/utils"

export default defineNuxtRouteMiddleware((to, from) => {
    const { display, ...displayQuery } = to.query
    if (display && !["grid", "list"].includes(display as string))
        return navigateTo({
            path: to.path,
            query: displayQuery as any
        })

    // const { sortBy, ...sortByQuery } = to.query
    // if (sortBy && !(sortBy as string in queryValidationRules()))
    //     return navigateTo({
    //         path: to.path,
    //         query: sortByQuery as any
    //     })
})
