<script setup>

useHead({
    title: 'Cart',
    meta: [
        { name: 'description', content: 'Cart' }
    ],
})

</script>

<template>
    <div class="flex flex-col items-center sm:items-start text-white">
        <div class="flex items-center space-x-2">
            <IconsCart class="w-6 h-6 md:w-8 md:h-8 md:mt-0.5"/>
            <h1 class="text-2xl md:text-4xl text-white">
                Cart
            </h1>
        </div>
        <p class="text-sm md:text-base">
            Your chosen items are ready for checkout
        </p>
        <div class="mt-10">
            <div class="bg-gray-dark rounded-xl">
                plm
            </div>
        </div>

    </div>
</template>
