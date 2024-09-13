<script setup>

useHead({
    title: 'Checkout'
})

definePageMeta({
    layout: 'auth',
    middleware: 'auth'
})

const { data: user } = await useFetch('/api/user') 

const stripe = await useClientStripe()
const elements = ref()
const subtotal = ref()
const initialized = ref(false)
const loading = ref(false)
const errorMessage = ref()

const appearance = {
    variables: {
        colorPrimary: '#FFFFFF',
        colorBackground: '#171717',
        colorText: '#FFFFFF',
        fontFamily: 'Kanit, system-ui',
        borderRadius: '16px',
        iconColor: '#FFFFFF',
        fontSmooth: 'never',
        fontSizeSm: '14px',
        fontSizeXs: '12px',
        fontSizeBase: '14px',
        fontSizeXl: '20px',
        accordionItemSpacing: '16px',
        gridRowSpacing: '16px'
    },
    rules: {
        '.Input': {
            borderRadius: '12px',
            border: '0',
            boxShadow: '0 0 0px 1.5px #262626 inset',
            padding: '10px 14px 10px 14px',
            backgroundColor: '#262626',
            fontFamily: 'Kanit, system-ui',
            lineHeight: '20px',
        },
        '.Input:focus': {
            boxShadow: '0 0 0px 1.5px #D4171E inset',
            backgroundColor: '#171717',
        },
        '.Input--invalid': {
            border: '0px',
            boxShadow: '0px',
            outline: 'none',
            color: '#FFFFFF'
        },
        '.Error': {
            lineHeight: '0px',
            fontSize: '0px',
            marginTop: '0px'
        },
        '.Label': {
            marginLeft: '8px',
            marginBottom: '2px',
            fontWeight: '200'
        }
    }
}

onMounted(() => {
    setTimeout(async () => {
        const cart = useCart()
        const items = ref(await cart.getItems())
        subtotal.value = items.value?.map(item => item.price * item.quantity).reduce((x, y) => x + y, 0).toFixed(2)
        const { error, data } = await useFetch('/api/stripe', {
            method: 'POST',
            body: {
                amount: subtotal.value
            }
        })

        elements.value = stripe.value.elements({ 
            clientSecret: data.value.client_secret,        
            appearance: appearance,
            fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400;1,500&display=swap" }],
            locale: 'en'
         })
        const payment = elements.value.create('payment', {
            layout: 'tabs',
            fields: {
                billingDetails: 'auto'
            }
        })
        payment.mount('#payment')
        const address = elements.value.create('address', {
            mode: 'billing',
        })
        address.mount('#address')
        initialized.value = true
    }, 10)
})

async function handlePayment() {
    loading.value = true
    errorMessage.value = null

    try {
        const { error } = await stripe.value.confirmPayment({
            elements: elements.value,
            confirmParams: {
                payment_method_data: {
                    billing_details: {
                        email: user.email,
                    },
                },
            },
            redirect: 'if_required'
        })
        if (error) {
            errorMessage.value = {
                'incomplete_name'           : 'The name is incomplete.',
                'incomplete_address'        : 'The address is incomplete.',
                'invalid_postal_code'       : 'The postal code is invalid.',
                'invalid_number'            : 'The card number is invalid.',
                'incomplete_number'         : 'The card number is incomplete.',
                'invalid_expiry_year_past'  : 'The expiration date is invalid.',
                'invalid_expiry_month_past' : 'The expiration date is invalid.',
                'incomplete_cvc'            : 'The security code is incomplete.',
                'incomplete_expiry'         : 'The expiration date is incomplete.'
            }[error.code]
            // errorMessage.value = error.message
        } 
        else {
            console.log('Payment succeeded')
        }
        loading.value = false
    } 
    catch (e) {
        errorMessage.value = "An error occured."
        loading.value = false
    }
}

</script>

<template>
    <AuthCard
        title="Checkout"
    >
        <div>
            <form @submit.prevent="handlePayment">
                <div id="payment" />
                <div id="address" class="mt-4" />
                <Error class="mt-4"> {{ errorMessage }} </Error>
                <Button
                    v-if="initialized"
                    type="submit"
                    :variant="loading ? 'loading' : 'primary'"
                    class="mt-4"
                >
                    <div>
                        <span> Pay </span>
                        <span class="font-extralight">$</span>
                        <span> {{ subtotal }} </span>
                    </div>
                </Button>
            </form>
        </div>
    </AuthCard>
</template>
