export default defineNuxtRouteMiddleware(async (to, from) => {
    const cart = useCart()
    const count = await cart.getCount()
    if (!count)
        return navigateTo('/user/account')
})
