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
                <IconsShoppingCart class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5"/>
                <h1 class="text-2xl md:text-4xl text-white">
                    Cart
                </h1>
            </div>
            <!-- <p class="text-sm md:text-base text-center">
                Organize your selected items for checkout
            </p> -->
        </div>
        <AuthPrompt v-if="!loggedIn" class="mt-6">
            <p>
                To save your cart, please log in or create an account. 
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
                    It looks like you haven't added any items to your cart yet.
                </p>
                <p class="hidden md:block">
                    Start browsing our store and find the perfect items to add to your collection.  
                </p>
            </template>
        </EmptyState>
    </div>
</template>
