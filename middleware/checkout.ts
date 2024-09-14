export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.name === 'user-checkout') {
        const cart = useCart()
        const count = await cart.getCount()
        if (!count)
            return navigateTo('/')
    }
    else if (to.name === 'user-checkout-success') {
        if (from.name !== 'user-checkout')
            return navigateTo('/')
    }
})
