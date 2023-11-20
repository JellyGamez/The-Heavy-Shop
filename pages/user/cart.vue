<script setup>

useHead({
    title: 'Cart',
    meta: [
        { name: 'description', content: 'Cart' }
    ],
})

const { status } = useAuth()

const loggedIn = computed(() => {
    return status.value === 'authenticated'
})

</script>

<template>
    <div>
        <div class="flex flex-col items-center sm:items-start text-white">
            <div class="flex items-center space-x-2">
                <IconsCart class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5"/>
                <h1 class="text-2xl md:text-4xl text-white">
                    Cart
                </h1>
            </div>
            <p class="text-sm md:text-base text-center">
                Organize your selected items for checkout
            </p>
        </div>
        <AuthPrompt v-if="!loggedIn" class="mt-6">
            <p>
                To save your shopping cart, please log in or create an account. 
            </p>
            <p class="hidden md:block">
                Your preferences will be stored for future visits. 
            </p>
        </AuthPrompt>
        <EmptyState class="mt-6">
            <template #title>
                Your cart is empty
            </template>
            <template #content>
                <p>
                    Elevate your shopping experience by exploring our premium merchandise. 
                </p>
                <p class="hidden md:block">
                    Add the finest selections to your cart and proceed to checkout for a seamless transaction.
                </p>
            </template>
        </EmptyState>
    </div>
</template>
