import { useServerStripe } from "#stripe/server"

export default defineEventHandler(async (event) => {
    const { amount } = await readBody(event)
    const stripe = await useServerStripe(event)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: false
            },
            payment_method_types: ['card']
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