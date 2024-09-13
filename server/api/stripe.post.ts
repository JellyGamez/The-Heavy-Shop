import { useServerStripe } from "#stripe/server"

export default defineEventHandler(async (event) => {
    const { amount } = await readBody(event)
    const stripe = await useServerStripe(event)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'USD',
            automatic_payment_methods: { enabled: true },
        })

        return {
            message: 'Payment intent created successfully!',
            client_secret: paymentIntent.client_secret
        }
    } 
    catch(e) {
        throw createError({
            statusCode: 500,
            statusMessage: 'An error occured.'
        })
    }
})