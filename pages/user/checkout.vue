<script setup>

useHead({
    title: 'Checkout',
    meta: [
        { name: 'checkout', content: 'Checkout' }
    ],
})

definePageMeta({
    layout: 'auth',
    middleware: 'auth'
})

const stripe = await useClientStripe()
const elements = ref()
const error = ref()

const appearance = {
    variables: {
        colorPrimary: '#FFFFFF',
        colorBackground: '#171717',
        colorText: '#FFFFFF',
        fontFamily: 'Kanit, system-ui',
        borderRadius: '16px',
        // colorTextPlaceholder: 'transparent',
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
            lineHeight: '20px'
        },
        '.Input:focus': {
            boxShadow: '0 0 0px 1.5px #C70404 inset',
            backgroundColor: '#171717',
        },
        '.Input--invalid': {
            border: '0px',
            boxShadow: '0px',
            outline: 'none',
            color: '#FFFFFF'
        },
        '.Error': {
            marginLeft: '8px',
            marginTop: '2px',
            color: '#C70404'
        },
        '.Label': {
            marginLeft: '8px',
            marginBottom: '2px',
            fontWeight: '200'
        }
    }
}

onMounted(() => {
    setTimeout(() => {
        elements.value = stripe.value.elements({
            mode: 'payment',
            amount: 100,
            currency: 'usd',
            appearance: appearance,
            fonts: [
                {
                    cssSrc: "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300;1,400;1,500&display=swap"
                }
            ]
        })
        const payment = elements.value?.create('payment', {
            layout: 'tabs',
            fields: {
                billingDetails: 'never'
            }
        })
        payment.mount('#payment')
        const address = elements.value.create('address', {
            mode: 'shipping',
            allowedCountries: [
                'RO',
                'US'
            ],
        })
        address.mount('#address')

        error.value = computed(() => elements.value.getElement('payment'))
    }, 10)
})

</script>

<template>
    <AuthCard
        title="Checkout"
    >
        <div id="payment" />
        <div id="address" />
    </AuthCard>
</template>